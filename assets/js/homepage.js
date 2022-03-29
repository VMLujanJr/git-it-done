var getUserRepos = function (user) {
    // format the github api url
    const apiUrl = ("https://api.github.com/users/" + user + "/repos");

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

// example
// var getUserRepos = function (user) {
//     console.log("function was called!");

//     fetch("https://api.github.com/users/octocat/repos").then(function(response) {
//         console.log("got it", response)
//     });

//     fetch("https://api.github.com/users/octocat/repos").then(function(response) {
//         response.json().then(function(data) {
//             console.log(data);
//         });
//     });

//     console.log("outside");
// };

getUserRepos("vmlujanjr");