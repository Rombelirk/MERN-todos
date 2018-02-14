var mongoose = require('mongoose');

const User = mongoose.model('User', {
    username: String, password: String, todos: [
        {
            text: String
        }
    ]

});

module.exports = User;