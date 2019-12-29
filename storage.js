class Storage {

    static getUsersFromStorage() {
        let users;
        if (!localStorage.getItem("searches")) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem("searches"));
        }
        return users;
    }

    static addSearchedUserToStorage(value) {
        let users = this.getUsersFromStorage();

        if (users.indexOf(value) === -1) {
            users.push(value);
        }
        localStorage.setItem("searches",JSON.stringify(users));

    }
    static clearAllSearchedUsersFromStorage() {
        localStorage.removeItem("searches");
    }
}