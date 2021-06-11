const pkg = require('./package.json');
const version = pkg.version;
const versionSegments = version.split('.');
const majorVersion = versionSegments[0];
console.log(majorVersion);
