const request = require('request');
const https = require('https');
const fs = require('fs');

const GITHUB_USER = "laijoann";
const GITHUB_TOKEN = "aaaf82d1dabd9d63b70f5aaa365f5e13dc671b84";
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
  for (contrib in urlList) {
    request.get(urlList[contrib])
    .on('error', (err) => {
      console.error(err);
    })
    .pipe(fs.createWriteStream('./avatarGallery/' + contrib + '.jpg'))
  }
} //saves avatars into local folder, avatarGallery. Chain of functions end

(REPO_OWNER && REPO_NAME) ? getRepoContributors(REPO_OWNER, REPO_NAME, callback) : console.log("Please specify repo owner and name.")
//invokes getRepoContributors, and sets off the chain of functions