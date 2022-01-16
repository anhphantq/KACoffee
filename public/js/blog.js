function addBlog(blogInfo) {
    if (blogInfo.length < 4) {
        var ind = blogInfo.length;
    }
    else {
        var ind = 4;
    }
    for (var i = 0; i < ind; i++) {
        var title = document.querySelector(`.new-posts .recipes-title .recipes-title-${i+1}`);
        title.innerHTML = blogInfo[i].title;

        var blogLink = document.querySelectorAll(`.blog__link-${i+1}`);
        var link = 'http://localhost:3000/post?id=';
        link += String(blogInfo[i]._id);
        blogLink[0].href = link;
        blogLink[1].href = link;
        blogLink[2].href = link;
    }
}

async function getBlogInfo(category) {
    var myJSON
    const data = await fetch('/blog/view', {
        method: 'GET',
    })
        .then((data) => data.json())
        .then((data) => {
            myJSON = data
        })
        // console.log(myJSON)
        addBlog(myJSON)
}

getBlogInfo()