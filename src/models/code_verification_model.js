const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const code_verification_schema = new Schema(
    {
        code: {type: String, require: true},
        email: {type: String, require: true},
        createdAt: { type: Date, expires: '2m', default: Date.now }
    },
    {
        collection: 'Code Verification'
    }
)

module.exports = mongoose.model('Code Verification', code_verification_schema);