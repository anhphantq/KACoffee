'use strict'

const blogModel = require('../../models/blog_model')

function create(req,res){
    if(req.session.AccountType == 'Admin'){
        const {title, content, image} = req.body
        // blogModel.findOne({'id': id}, function(err, blog){
        //     if(err){
        //         res.status(500).json(err)
        //     }
        //     else if(blog != null){
        //         res.send("blog id existed")
        //     }
            // else{
        blogModel.create({
            //id,
            title,
            content,
            image
        })
        res.send(JSON.stringify("created"))
    //         }
    //     })
    }
    else{
        res.send(JSON.stringify('Only admin and employees can create blogs'))
    }
}
function displayAll(req,res){
    blogModel.find((err,blog) => {
        if(err){
            res.status(500).json(err)
        }
        else{
            res.json(blog)
        }
    })
}
function display(req,res){
    const {title} = req.body
    if(title != null){
        blogModel.findOne({title: title}, (err, blog) => {
            if(err){
                res.status(500).json(err)
            }
            else if(blog == null){
                res.send(JSON.stringify("Not found"))
            }
            else{
                res.json(blog)
            }
        })
    }
    else{
        displayAll(req,res)
    }
}
function remove(req,res){
    if (req.session.AccountType == "Admin") {
        const {id} = req.body;
        if (id == null) {
          res.status(404).json();
        } else {
          blogModel.findOne({ _id: id }, (err, blog) => {
            if (err) {
              res.status(500).json(err);
            } else if (blog == null) {
              console.log("Not found");
              res.status(404).json();
            } else {
              blogModel.deleteOne({ _id: id }, () => {
                res.send(JSON.stringify("deleted"));
              });
            }
          });
        }
      } else {
        res.send(JSON.stringify("Only admin can create blog"));
      }
}

module.exports = (app) => {
    app.post('/blog/create', (req,res) => {
        create(req,res)
    })
    app.post('/blog/view', (req,res) => {
        display(req,res)
    })
    app.get('/blog/view', (req,res) => {
        displayAll(req,res)
    })
    app.post('/blog/delete', (req,res) =>{
        remove(req,res)
    })
}
