const reader = require('readline-sync');
const mongoose = require('mongoose');
const users = require('./users.js');

const User = users.model;

mongoose.connect('mongodb://localhost:27017/blog', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let firstName = reader.question("First name: ");
let emailAddress = reader.question("E-mail Address: ");
const password = reader.question("Password: ", {
    hideEchoBack: true
});

if (firstName === "" || emailAddress === "" || password === "") {
    console.log("You need to enter a first name, email address, and password");
    process.exit();
}

User.findOne({
    emailAddress: emailAddress
}).then((user) => {
    if (user) {
        console.log("That E-mail address already exists");
        process.exit();
    }
}).then(() => {
    let user = new User({
        firstName: firstName,
        emailAddress: emailAddress,
        password: password,
        role: "admin"
    });
    user.save().then(() => {
        console.log("OK, admin user created for", firstName, "with E-mail address", emailAddress);
        process.exit();
    });
}).catch(error => {
    console.log(error);
});