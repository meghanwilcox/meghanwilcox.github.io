'use strict';
(function () {

    //define the constants we will use later
    const GITHUB_API_BASEURL = 'https://api.github.com/users/';
    const DEFUALT_USERNAME = 'meghanwilcox';

    //call this function as soon as the window is loaded
    window.addEventListener('load', init);
    function init() {
        //call the getUserRepos function with the default username
        getUserRepos(DEFUALT_USERNAME);

        //add an event listener to the search button so that it can be clicked to search for another users repos
        document.getElementById('search-button').addEventListener('click', function (e) {
            e.preventDefault();
            //get the username from the input field
            const username = id('search-input').value.trim(); 
            //make sure username is not null
            if (username !== '') {
                getUserRepos(username); 
            } else { //display error message if necessary
                alert('Please enter a GitHub username.');
            }
        });

        id('input-form').addEventListener('submit', function (e) {
            // if we've gotten in here, all HTML5 validation checks have passed
            e.preventDefault();
            submitForm();
        });
    }

    //function: this function fetches data about a users github repositories from the github API and organizes them in a visually appealing way
    function getUserRepos(gitHubUsername) {
        //get the container to store the repos in 
        document.getElementById('container').innerHTML = '';

        //create the URL to fetch from
        let url = GITHUB_API_BASEURL + gitHubUsername + '/repos?sort=created';
        fetch(url)
            .then(checkStatus)
            .then((repoData) => {
                //create a title for the repos and get the container div from its id
                console.log(repoData);
                let div = id('container');
                let title = document.createElement('p');
                title.classList.add('text');
                title.innerHTML = 'GitHub Repositories for: ' + gitHubUsername;
                //append the title to the container div
                div.appendChild(title);

                //for each repository in the array of repos returned by the api, extract data and display
                for (const item of repoData) {
                    //create a div element for each repository
                    let smalldiv = document.createElement('div');
                    smalldiv.classList.add('repo-item'); 
    
                    // Create a container for title and GitHub logo
                    let titlecontainer = document.createElement('div');
                    titlecontainer.classList.add('title-container');
    
                    // Create GitHub logo image element
                    let githublogo = document.createElement('img');
                    githublogo.src = 'images/githublogo.png'; 
                    githublogo.classList.add('github-logo');
                    
                    // Append GitHub logo to the title container
                    titlecontainer.appendChild(githublogo);
    
                    //create an element for the repo name
                    let repoName = document.createElement('div');
                    const name = item['name'];
                    repoName.innerHTML = '' + name;
                    repoName.classList.add('repo-title');
                
                    //add the repo name to the title container
                    titlecontainer.appendChild(repoName);

                    // Append title container to small div
                    smalldiv.appendChild(titlecontainer);

                    //create a div to hold the d
                    let descriptionDiv = document.createElement('div');
                    const description = item['description'];
                    descriptionDiv.innerHTML = 'Description: ' + description;
                    descriptionDiv.classList.add('description-container');

                    //append the description container to the small div
                    smalldiv.appendChild(descriptionDiv);

                    
                    //create a div for the number of watchers
                    let numWatchersDiv = document.createElement('div');
                    const numWatchers = item['watchers_count'];
                    numWatchersDiv.innerHTML = 'Number of Watchers: ' + numWatchers;

                    //append the number of watchers to the small div
                    smalldiv.appendChild(numWatchersDiv);

                    //create a p element to hold the created date and updated date
                    const createDate = new Date(item['created_at']);
                    const currentDate = new Date();
                    const daysDiff = Math.floor((currentDate - createDate) / (1000 * 60 * 60 * 24));
                    let upateDate = document.createElement('p');
                    const updatedDate = new Date(item['updated_at']);
                    const daysDiff2 = Math.floor((currentDate - updatedDate) / (1000 * 60 * 60 * 24));
                    upateDate.innerHTML = 'Created: ' + daysDiff + ' days ago, Updated: ' + daysDiff2 + ' days ago';
                    //append the dates to the small div
                    smalldiv.appendChild(upateDate);

                    //create a p element to hold the language of the repo
                    let language = document.createElement('p');
                    const languageFromAPI = item['language'];
                    language.innerHTML = 'Language: ' + languageFromAPI;
                    //append the language to the small div
                    smalldiv.appendChild(language);

                    // Append small div to the main container
                    div.appendChild(smalldiv);
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }

    //helper functions
    function id(idName) {
        return document.getElementById(idName);
    }
    function checkStatus(response) {
        if (!response.ok) {
            throw Error('Error in request: ' + response.statusText);
        }
        return response.json();
    }
})();