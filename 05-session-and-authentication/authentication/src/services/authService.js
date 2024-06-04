const users = {
    'dimi': {
        username: 'dimi',
        password: '123'
    }
};

function register(username, password) {

    if (users[username]) {
        throw new Error("This username is taken!")
    }

    const user = {
        username,
        password
    }

    users[username] = user;

    console.log('Created new user', username);

    return user;
}

function login(username, password) {
    const user = users[username];

    if (!user || user.password != password) {
        console.log('Incorect password for user', username);
        throw new Error("Incorect username or password!")
    }

    console.log('Logged in as', user.username);

    return user;    
}

module.exports = {
    register,
    login
}