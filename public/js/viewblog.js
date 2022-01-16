var id_URL = window.location.search;
var id = id_URL.slice(4, id_URL.length);



function addBlog(blogInfo) {
    for (var i = 0; i < blogInfo.length; i++) {
        if (id == String(blogInfo[i]._id)) {
            var activeBreadcrumb = document.querySelector('.active');
            var blogTitles = document.querySelectorAll('.title-blog');
            activeBreadcrumb.innerHTML = blogInfo[i].title;
            for (var j = 0; j < 2; j++) {
                blogTitles[j].innerHTML = blogInfo[i].title;
            }
            for (var j = 0; j < 2; j++) {
                var blogContent = document.querySelector(`.content-${j+1}`);
                blogContent.innerHTML = blogInfo[i].content[j];
            }
        }
    }
}


async function getBlogInfo(category) {
    var myJSON;
    const data = await fetch('/blog/view',{
        method: 'GET',
    })
        .then((data) => data.json())
        .then((data) => {
            myJSON = data
        })
    addBlog(myJSON);
}
getBlogInfo();

