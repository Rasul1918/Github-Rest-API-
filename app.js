const githubForm = document.getElementById("github-form");
const githubName = document.getElementById("githubname");
const lastUsers = document.getElementById("last-users");
const clearLastUsers = document.getElementById("clear-last-users");

const github = new Github();
const ui = new UI();

const addUser = e => {
    const username = githubName.value.trim();

    if (!username) {
        ui.showMessage("Please insert a username","warning");
    } else {
        ui.clearNameInput();//Clear Name Input

        github.getUserData(username)
        .then(response => {
            if (response.user.message === "Not Found") {
                //ERROR
                ui.showMessage("User not found!","danger");
            } else {
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(response.user.login)
                ui.addUserToUI(response.user);
                ui.addUserRepoToUI(response.repo);               
            }
        })
        .catch(err => console.log(err));

    }
   
    e.preventDefault();

}

const clearLastSearches = e => {
    if(confirm("Are you sure to clear all searches?")) {
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedUsersFromUI();
    }  
}

const loadSearchedData = e => {//Sehife yuklenende searched usersin avtomatik yuklenmesi
    let users = Storage.getUsersFromStorage();
    users.forEach(elem => {
        const searchedUser = document.createElement("li");
        searchedUser.className = "list-group-item";
        searchedUser.textContent =  elem;

        lastUsers.appendChild(searchedUser);
    })
}

githubForm.addEventListener("submit", addUser);
clearLastUsers.addEventListener("click",clearLastSearches);
document.addEventListener("DOMContentLoaded", loadSearchedData);