class UI {
    constructor() {
        this.profileDiv = document.getElementById("profile");
        this.repoDiv = document.getElementById("repos");
        this.cardBody = document.querySelector(".card-body");
        this.lastUsers = document.getElementById("last-users");
        this.nameInput = document.getElementById("githubname");
    }

    clearNameInput() {
        this.nameInput.value = "";
    }

    addUserToUI(value) {
        this.profileDiv.innerHTML = `
        <div class="card card-body mb-3">
                    <div class="row">
                      <div class="col-md-4">
                        <a href="${value.html_url}" target = "_blank">
                         <img class="img-fluid mb-2" src="${value.avatar_url}"> </a>
                         <hr>
                         <div id="fullName"><strong>${value.name}</strong></div>
                         <hr>
                         <div id="bio">${value.bio}</div>
                        </div>
                      <div class="col-md-8">
                            <button class="btn btn-secondary">
                                Follower  <span class="badge badge-light">${value.followers}</span>
                            </button>
                            <button class="btn btn-info">
                                Following  <span class="badge badge-light">${value.following}</span>
                              </button>
                            <button class="btn btn-danger">
                                Repos  <span class="badge badge-light">${value.public_repos}</span>
                            </button>
                            <hr>
                            <li class="list-group">
                                <li class="list-group-item borderzero">
                                    <img src="images/company.png" width="30px"> <span id="company">${value.company}</span>
                                    
                                </li>
                                <li class="list-group-item borderzero">
                                    <img src="images/location.png" width="30px"> <span id = "location">${value.location}</a>
                                    
                                </li>
                                <li class="list-group-item borderzero">
                                    <img src="images/mail.png" width="30px"> <span id="email">${value.email}</span>
                                    
                                </li>
                                
                            </div>
                               
                            
                      </div>
                </div>
        `
    }

    addUserRepoToUI(value) {
        this.repoDiv.innerHTML = "";

        value.forEach(elem => {
            this.repoDiv.innerHTML += `
            <div class="mb-2 card-body">
                    <div class="row">
                        <div class="col-md-2">
                        <span></span> 
                        <a href="${elem.html_url}" target = "_blank" id = "repoName">${elem.name}</a>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-secondary">
                                Stars  <span class="badge badge-light" id="repoStar">${elem.stargazers_count}</span>
                            </button>

                            <button class="btn btn-info">
                                Forks  <span class="badge badge-light" id ="repoFork">${elem.forks_count}</span>
                            </button>
                    
                        </div>
                </div>

                </div>
            `
        })
    }

    addSearchedUserToUI(value) {
        let users = Storage.getUsersFromStorage();

        if (users.indexOf(value) === -1) {
            const searchedUser = document.createElement("li");
            searchedUser.className = "list-group-item";
            searchedUser.textContent =  value;

            this.lastUsers.appendChild(searchedUser);
        }
        
    }

    clearAllSearchedUsersFromUI() {
        while(this.lastUsers.firstElementChild) {
            this.lastUsers.firstElementChild.remove();
        }
    }

    showMessage(message,type) {
        const errDiv = document.createElement("div");
        errDiv.role = "alert";
        errDiv.className = `alert alert-${type}`;
        errDiv.textContent = message;
        this.cardBody.appendChild(errDiv);

        setTimeout(() => {
            errDiv.remove();
        },2000)
    } 
}