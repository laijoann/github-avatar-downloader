const request = require('request');
const https = require('https');
const fs = require('fs');

const GITHUB_USER = "laijoann";
const GITHUB_TOKEN = "aaaf82d1dabd9d63b70f5aaa365f5e13dc671b84";

let urlList = [];

callback = (error, response, body) => {
  if (error) console.error(error);
  else if (response.statusCode === 200) {
    parsedBody = JSON.parse(body);
    for (contrib in parsedBody) {
      urlList.push(parsedBody[contrib].avatar_url);
    }
    downloadImageByURL(urlList);
    //TODO: but is this abiding by async?
  }
}

getRepoContributors = (repoOwner, repoName, cb) => {
  let requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  let options = {
    url: requestURL,
    headers: {
      'User-Agent': 'Github Avator Downloader'
    }
  };
  request(options, cb);
}

getRepoContributors("jquery", "jquery", callback);

downloadImageByURL = (urlList) => {
  for (contrib in urlList) {
    request.get(urlList[contrib])
    .on('error', (err) => {
      console.error(err);
    })
    .pipe(fs.createWriteStream('./avatarGallery/' + contrib + '.jpg'))
    .on('finish', () => {
      console.log('Avatar download complete.');
    })
  }
}







