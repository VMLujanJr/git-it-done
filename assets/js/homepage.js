// ******************************************************************************
// Get Data from GitHub API
// ******************************************************************************
var getUserRepos = function (user) {
    // format the github api url
    const apiUrl = ("https://api.github.com/users/" + user + "/repos");


    // make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // console.log(data); // replaced by below code
                displayRepos(data, user); // once the data is gathered, send to displayRepo function
            });
        }
        else {
            alert("Error: GitHub User Not Found!");
        }
    })
    .catch(function(error) {
        // Notice this `catch()` getting chained onto the end of the `.then()`
        alert("Unable to connect to GitHub!");
    });
};

// ******************************************************************************
// Form Submit Handler: Captures User Input then Sends It to getUserRepos
// ******************************************************************************
var formSubmitHandler = function (event) { // execute upon a form submission browser event
    event.preventDefault(); // prevents page from refreshing
    console.log(event);

    // get value of form input element
    var username = nameInputEl
        .value
        .trim();
    
    // send value to getUserRepos
    if (username) {
        getUserRepos(username);
        nameInputEl.value = ""; // clear out the <input> element's value
    } else {
        alert("Please enter a GitHub username!");
    }
};

// ******************************************************************************
// Display Repos
// ******************************************************************************
var displayRepos = function (repos, searchTerm) { // accept both the array of repo data & the term we searched for as parameters
    // console.log(repos);
    // console.log(searchTerm);
    // clear old content
    repoContainerEl.textContent = ""; // clears old content
    repoSearchTermEl.textContent = searchTerm; // adds new term

    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories were found.";
        return;
    }

    // create a loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name; // returns VMLujanJr/2ndHome

        // create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to newly created container
        repoEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }    
};

// ******************************************************************************
// Variables & Arrays
// ******************************************************************************
/* Referencing Area */
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var repoSearchTermEl = document.querySelector("#repo-search-term");
var repoContainerEl = document.querySelector("#repos-container");

userFormEl.addEventListener("submit", formSubmitHandler);

//1 allow users to search for any github account
//done

//2 display the data response
// in progress

//2.1 display repo names

// [0].name
// [0][0].login
// [0].open_issues_count
//2.2 display issues





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

// getUserRepos("vmlujanjr"); // replaced this with an addEventListener