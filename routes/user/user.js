class User {
    static getUser(req, res) {
        if(!req || !res) {
            console.error("ERROR: No req/res for getUser request!");
            return;
        } else {
            console.log("Some coding should execute here!");
            return;
        }
    }

    static postUser(req, res) {
        if(!req || !res) {
            console.error("ERROR: No req/res for postUser request!");
            return;
        }
    }
}

module.exports = User;