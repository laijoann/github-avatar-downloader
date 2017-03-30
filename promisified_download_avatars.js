const request = require('request');
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv').config();
const rp = require('request-promise');

const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_USER || !GITHUB_TOKEN) {
  console.log('Yikes! We seem to be missing the Github user or token..');
  return;
}

const REPO_OWNER = process.argv[2];
const REPO_NAME = process.argv[3];
const requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + REPO_OWNER + '/' + REPO_NAME + '/contributors';
const options = {
  url: requestURL,
  headers: {
    'User-Agent': 'Github Avator Downloader'
  }
};

const urlList = [];

const getUrlList = (response) => {
  return new Promise((resolve, reject) => {
    try {
      let parsedResp = JSON.parse(response);
      parsedResp.forEach((elm) => {urlList.push(elm.avatar_url)});
      return resolve();
    } catch (e) {
      return reject("Failed to parse or add urls into urlList")
    }
  })
}

const dlImage = () => {
  return new Promise((resolve, reject) => {
    try {
      console.log("downloading...")
      for (contrib in urlList) {
        request.get(urlList[contrib])
        .pipe(fs.createWriteStream('./avatarGallery/' + contrib + '.jpg'))
      }
      return resolve("download complete");
    } catch (e) {
      return reject("Failed to find folder avatarGallery or download images");
    }
  })
}

rp(options)
.then((response) => {
  getUrlList(response)
  .then(
    dlImage()
    .then(console.log)
  )
  return null;
})
.catch( console.error );
