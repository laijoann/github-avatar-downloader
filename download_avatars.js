const request = require('request');

const GITHUB_USER = "laijoann";
const GITHUB_TOKEN = "aaaf82d1dabd9d63b70f5aaa365f5e13dc671b84"; //is this supposed to be a string or a number

let requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + "jquery" + '/' + "jquery" + '/contributors'; //replace the "jqery"s with repoOwner, and repoName getRepoContributors

let options = {
  url: requestURL,
  headers: {
    'User-Agent': 'Github Avator Downloader'
  }
};

callback = (error, response, body) => {
  if (error) console.error(error);
  console.log(response.statusCode);
}

request(options, callback);

// function getRepoContributors(repoOwner, repoName, cb) {
//   ...
// }