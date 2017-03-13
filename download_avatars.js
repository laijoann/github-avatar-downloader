const request = require('request');

const GITHUB_USER = "laijoann";
const GITHUB_TOKEN = "aaaf82d1dabd9d63b70f5aaa365f5e13dc671b84";

callback = (error, response, body) => {
  if (error) console.error(error);
  else if (response.statusCode === 200) {
    parsedBody = JSON.parse(body);
    for (let i = 0; i < parsedBody.length; i++) {
      console.log(parsedBody[i].avatar_url);
    }
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