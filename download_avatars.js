const request = require('request');

const GITHUB_USER = "laijoann";
const GITHUB_TOKEN = "aaaf82d1dabd9d63b70f5aaa365f5e13dc671b84"; //is this supposed to be a string or a number

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  let requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';



  console.log(requestURL);
  //to validate requestURL

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

//This function will use the request library to programmatically fetch the list of contributors via HTTPS for the given repo. You may want to open up the code and instructions for the previous activity where you learned about and used request.

//Notice the last parameter in the function, cb, which provides a callback function in order to handle the asynchronous nature of results that are to be returned from getRepoContributors.

//Recall that Node-style callback functions expect their first argument to be a placeholder for any errors that may have occurred, and the subsequent argument(s) are results being passed to the callback. This is why the first argument is called err. That said, we're going to implement the "happy path" first and eventually deal with err.