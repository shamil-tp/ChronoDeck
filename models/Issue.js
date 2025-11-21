const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
    id:String,
    email:String,
    issueCategory:String,
    issue:String
});

module.exports = mongoose.model('Issue',issueSchema)