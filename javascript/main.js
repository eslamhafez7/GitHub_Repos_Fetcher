const userInput = document.getElementById("input_username"),
getButton = document.querySelector(".get_button"),
dataContainer = document.querySelector(".got");

getButton.addEventListener("click", () => {
    getRepos();
});

userInput.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        getRepos();
    }
});
const getRepos = () => {
    if(userInput.value === "") {
        Swal.fire(
            'Please add github username',
            ' ',
            'question'
        )
    }else {
        dataContainer.innerHTML = "";
        fetch(`https://api.github.com/users/${userInput.value}/repos?sort=updated&direction=desc`)
        .then((data) => data.json())
        .then((reposResponse) => {
            for(let i = 0; i < reposResponse.length; i++) {
                let reposContainer = document.createElement("div");
                let infoContainer = document.createElement("div");
                let repoName = document.createElement("span");
                let repoURL = document.createElement("a");
                let repoURLText = document.createTextNode("Visit");
                let repoStars = document.createElement("span");
                let repoStarsText = document.createTextNode(`${reposResponse[i].stargazers_count} Stars`);
                reposContainer.classList.add("repos-container");
                repoName.classList.add("repo-name");
                const repoNameText = document.createTextNode(reposResponse[i].name);
                repoName.appendChild(repoNameText);
                reposContainer.appendChild(repoName);
                infoContainer.classList.add("info");
                repoURL.appendChild(repoURLText);
                repoURL.setAttribute("href", `https://github.com/${userInput.value}/${reposResponse[i].name}`);
                repoURL.setAttribute("target", `_blank`);
                repoURL.setAttribute("class", `repo-url`);
                infoContainer.appendChild(repoURL);
                repoStars.classList.add("repo-star");
                repoStars.appendChild(repoStarsText);
                infoContainer.appendChild(repoStars);
                reposContainer.appendChild(infoContainer);
                dataContainer.appendChild(reposContainer);
            }
        })
        .catch(error => {
            console(Error(error));
        })
    }
};







/*
    chatGpt
    const getRepos = () => {
    if (userInput.value === "") {
        Swal.fire(
            'Please add github username',
            ' ',
            'question'
        );
    } else {
        dataContainer.innerHTML = "";

        let page = 1;
        let allRepos = [];

        const fetchRepos = async () => {
            const response = await fetch(`https://api.github.com/users/${userInput.value}/repos?per_page=100&page=${page}`);
            const reposResponse = await response.json();

            if (reposResponse.length > 0) {
                allRepos = allRepos.concat(reposResponse);
                page++;
                await fetchRepos(); // Fetch next page
            } else {
                if (allRepos.length === 0) {
                    swal("No Repositories", "No repositories found for the given username.", "info");
                } else {
                    // Process and display allRepos
                    for (let i = 0; i < allRepos.length; i++) {
                        const reposContainer = document.createElement("div");
                        const infoContainer = document.createElement("div");
                        const repoName = document.createElement("span");
                        const repoURL = document.createElement("a");
                        const repoURLText = document.createTextNode("Visit");
                        const repoStars = document.createElement("span");
                        const repoStarsText = document.createTextNode(`${allRepos[i].stargazers_count} Stars`);
                        reposContainer.classList.add("repos-container");
                        repoName.classList.add("repo-name");
                        const repoNameText = document.createTextNode(allRepos[i].name);
                        repoName.appendChild(repoNameText);
                        reposContainer.appendChild(repoName);

                        infoContainer.classList.add("info");
                        repoURL.appendChild(repoURLText);
                        repoURL.setAttribute("href", `https://github.com/${userInput.value}/${allRepos[i].name}`);
                        repoURL.setAttribute("target", "_blank");
                        repoURL.classList.add("repo-url");
                        infoContainer.appendChild(repoURL);
                        repoStars.classList.add("repo-star");
                        repoStars.appendChild(repoStarsText);
                        infoContainer.appendChild(repoStars);

                        reposContainer.appendChild(infoContainer);
                        dataContainer.appendChild(reposContainer);
                    }
                }
            }
        };

        fetchRepos().catch(error => {
            swal("Error", error.message, "error");
            console.error(error);
        });
    }
};

*/