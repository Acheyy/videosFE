<template>
  <div class="comment-main-wrapper">
    <div class="avatar">
      <div class="img-wrapper">
        <img :src="comment.author.avatar" />
      </div>
      <div class="line-down"></div>
    </div>
    <div class="main-comment-body">
      <div class="user-name">{{ comment.author.userName }}</div>
      <div class="time">{{ $timeAgo.format(new Date(comment.createdAt)) }}</div>
      <div class="comment-body">{{ comment.commentBody }}</div>
      <div class="actions">
        <div class="like-action">Like</div>
        <div class="dislike-action">Dislike</div>
        <div class="reply-action" @click="triggerReply">
          <IconsReply></IconsReply>
        </div>
      </div>
    </div>
  </div>
  <div class="reply-box" v-if="reply">
    <div class="extra-wrapper">
      <div class="reply-avatar">
        <img :src="accountDetails.avatar" />
      </div>
    </div>
    <div class="main-comment-input">
      <input
        v-model="formData.commentBody"
        type="textarea"
        placeholder="Write a comment..."
      />
      <div class="actions">
        <button
          @click="triggerReply"
        >
          Cancel
        </button>
        <button
          @click="submitReply"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
  <div class="replies-wrapper">
    <div class="left-wrapper"><div class="line"></div></div>
    <div class="reply-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useAccountInfo } from "~/store/accountInfo";
import { storeToRefs } from "pinia";
const accountInfoStore = useAccountInfo();
const { accountDetails } = storeToRefs(accountInfoStore);
const props = defineProps(["comment"]);
const formData = reactive({ commentBody: "" });

let reply = ref(false);

function triggerReply() {
  reply.value = !reply.value;
}

async function submitReply() {
  console.log(props.comment.videoId);
  await $fetch(`http://localhost:3030/api/comments/${props.comment.videoId}`, {
    method: "POST",
    body: {
      replyTo: props.comment._id,
      commentBody: formData.commentBody,
      author: accountDetails.value._id,
      videoId: props.comment.videoId,
    },
    onResponse(res) {
      triggerReply();
    },
  });
}
</script>

<style lang="scss" scoped>
.comment-main-wrapper {
  display: flex;
}

.avatar {
  width: 84px;
  align-items: center;
  display: flex;
  flex-direction: column;
  .line-down {
    width: 2px;
    background: #282828;
    display: flex;
    flex: auto;
  }
  .img-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
.user-name {
  color: red;
  margin-bottom: 8px;
}
.time {
  margin-bottom: 30px;
}
.comment-body {
  margin-bottom: 30px;
}
.actions {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  svg {
    width: 24px;
    fill: #ffffff;
  }

  .reply-action,
  .like-action,
  .dislike-action {
    padding: 10px;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
    cursor: pointer;
    border-radius: 50%;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
.comment-main-wrapper {
  padding-top: 8px;
}
.reply-box {
  margin: 8px 0;
  display: flex;
  .extra-wrapper {
    width: 84px;
    align-items: center;
    display: flex;
    flex-direction: column;

    .reply-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
      }
    }
  }
}
.main-comment-body {
  width: calc(100% - 84px);
}
.main-comment-input {
  width: 100%;
}
.replies-wrapper {
  display: flex;
  .left-wrapper {
    width: 84px;
    align-items: center;
    display: flex;
    flex-direction: column;
    .line {
      width: 2px;
      background: #282828;
      display: flex;
      flex: auto;
    }
  }
}
.reply-content {
  width: calc(100% - 84px);
}
</style>
