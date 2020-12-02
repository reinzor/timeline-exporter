#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const DIST_DIR = path.join(__dirname, '../dist');
const DIST_ZIP_DIR = path.join(__dirname, '../dist-zip'); 
const CHANGELOG = path.join(__dirname, '../CHANGELOG.rst'); 
const DIST_CHANGELOG = path.join(__dirname, '../dist/CHANGELOG.rst'); 

const extractExtensionData = () => {
  const extPackageJson = require('../package.json');

  return {
    name: extPackageJson.name,
    version: extPackageJson.version
  }
};

const makeDestZipDirIfNotExists = () => {
  if(!fs.existsSync(DIST_ZIP_DIR)) {
    fs.mkdirSync(DIST_ZIP_DIR);
  }
}

const buildZip = (src, dist, zipFilename) => {
  console.info(`Building ${zipFilename}...`);

  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(path.join(dist, zipFilename));
  
  return new Promise((resolve, reject) => {
    archive
      .directory(src, false)
      .on('error', err => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
};

const main = () => {
  const {name, version} = extractExtensionData();
  const zipFilename = `${name}-v${version}.zip`;
  
  makeDestZipDirIfNotExists();

  fs.copyFile(CHANGELOG, DIST_CHANGELOG, (err) => {})

  buildZip(DIST_DIR, DIST_ZIP_DIR, zipFilename)
    .then(() => console.info('OK'))
    .catch(console.err); 
};

main();
