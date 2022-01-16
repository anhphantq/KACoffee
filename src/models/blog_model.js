const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new Schema(
    {
        title: {type: String, require: true},
        content: {type: Array,},
        image: {type: Array,},
        dateCreate: {type: Date, default: Date.now},
    },
    {
        collection: 'Blog'
    }
)

module.exports = mongoose.model('Blog', BlogSchema)