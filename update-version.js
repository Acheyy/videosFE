const fs = require('fs-extra');
const path = require('path');

const versionFilePath = path.join(__dirname, 'public', 'version.json');

async function updateVersion() {
  try {
    const versionFile = await fs.readJson(versionFilePath);
    const currentVersion = versionFile.version;
    const newVersion = incrementVersion(currentVersion);

    versionFile.version = newVersion;
    await fs.writeJson(versionFilePath, versionFile, { spaces: 2 });

    console.log(`Updated version.json from ${currentVersion} to ${newVersion}`);
  } catch (error) {
    console.error('Error updating version.json:', error);
  }
}

function incrementVersion(version) {
  const versionParts = version.split('.');
  const patch = parseInt(versionParts[2], 10) + 1;
  versionParts[2] = patch;

  return versionParts.join('.');
}

updateVersion();
