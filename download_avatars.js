//TODO FOR THE WEEKEND: for optimal UX, look into Javascript promises to insert 'All downloads completed' when all avatars have been downloaded.
const request = require('request');
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv').config();

const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_USER || !GITHUB_TOKEN) {
  console.log('Yikes! We seem to be missing the Github user or token..');
  return;
}

const REPO_OWNER = process.argv[2];
const REPO_NAME = process.argv[3];

let urlList = [];

callback = (error, response, body) => {
  if (error) console.error(error);
  else if (response.statusCode === 200) {
    parsedBody = JSON.parse(body);
    for (contrib in parsedBody) {
      urlList.push(parsedBody[contrib].avatar_url);
    }
    downloadImageByURL(urlList);
  } else {
    console.log('Oops! The repo owner/name doesn\'t seem to work..');
    return;
  }
} //collects all the avatar URLs into an array, then invokes the downloadImageByURL function

getRepoContributors = (repoOwner, repoName, cb) => {
  let requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  let options = {
    url: requestURL,
    headers: {
      'User-Agent': 'Github Avator Downloader'
    }
  };
  request(options, cb);
} //collects the url and user-agent to pass into the request method (callback() is also passed as a param)

downloadImageByURL = (urlList) => {
  if (fs.existsSync('./avatarGallery')) {
    for (contrib in urlList) {
      request.get(urlList[contrib])
      .on('error', (err) => {
        console.error(err);
      })
      .pipe(fs.createWriteStream('./avatarGallery/' + contrib + '.jpg'));
    }
  } else {
    console.log('Please create folder avatarGallery in order to store the avatars!');
    return;
  }
} //saves avatars into local folder, avatarGallery. Chain of functions end

(REPO_OWNER && REPO_NAME) ? getRepoContributors(REPO_OWNER, REPO_NAME, callback) : console.log('Please specify repo owner and name.')
//invokes getRepoContributors, and sets off the chain of functions
