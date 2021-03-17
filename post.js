process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const wpai = require('wpapi');
const fs = require('fs');
const fetch = require('node-fetch');
const axios = require('axios')
const Path = require('path')
const Dotenv = require('dotenv').config();

const password = process.env.PASSWORD;
const user = process.env.USER_NAME;
const url = process.env.URL;

var WP = new wpai({
    endpoint: url + "/wp-json",
    username: user,
    password: password
});


//download image
async function Download(img,item,ID,i) {
    const URI = img;
    const encodedURI = encodeURI(URI);
    console.log("Downloading ... " + i)
    const response = await fetch(encodedURI);
    const buffer = await response.buffer();
    await fs.writeFile("./images/"+i+"."+getExtension(img), buffer, async(err, data) => {
        if (err) return -1;
        else {
            console.log('finished downloading! image')
            await InsertArticle(item,ID,i,getExtension(img))
        }
    });
}

//get extension of the image
function getExtension(img){
    var lastChar = img.split('.').pop();
    if(lastChar.indexOf('jpeg')!=-1){
         return img.split('.').pop().substring(0,4)
    }else{
         return img.split('.').pop().substring(0,3)
    }
}

//insert Article with Image
async function InsertArticle(element,category_ID,i,extension){
    try {
     var _tags =[1, 2]
    await Post(element.articleTitle, category_ID, _tags, element.articleDescription, element.mediaName,element.articleSourceLink,i,extension)
  } catch (err) {
    console.log(err);
}
}

//data structure
const DataArticle = (title, categories, tags, description, slug,link) => ({
    'title': title,
    'categories': categories,
    'tags': tags,
    'description': description,
    'slug': slug,
    'link':link
})

// retrieve data and pass it to insert function
const Post = async(title, categories, tags, description, slug,link,i,extension) => {
    console.log("in post")
    var data = await DataArticle(title, categories, tags, description, slug,link)
    await AddallToWP(data,i,extension)
}



// all the job done by wpai in one single call function
const AddallToWP = async(data,i,extension) => {
    //path of image
    var path_img = await Path.resolve(__dirname, "./images/"+i+"."+extension)

    try {
        await WP.posts().create({
            title: data.title,
            status: 'publish',
            categories: data.categories,
            tags: data.tags,
            excerpt: data.description.substring(0,400),
            content: data.description+"<br/> <br/> <h4>by <strong style='color:red;'> "+data.slug+"</strong></h4> <br/> <br/> <a href='"+data.link+"'><button style='padding:5px;border-radius:5px;background-color:blue;color:white;width:200px'>Show more ..</button></a>",
            slug: data.title,
            meta : [data.title,data.description.substring(0,255)]
        }).then(async function(post) {
            // Create the media record & upload your image file
             await WP.media().file(path_img).create({
                title: data.title,
                post: post.id
            }).then(async function(media) {
                    // Set the new media record as the post's featured media
               await WP.posts().id(post.id).update({
                    featured_media: media.id,
                    categories: data.categories,
                }).catch(err => console.log(err))

            }).catch(err => console.log(err))
        });
    } catch (err) {
        console.log(err)
    }
}


/*
// to add a single image to wordpress
async function AddImagetoWP(url, filename) {
    path = Path.resolve(__dirname, "./images", filename + '.jpg')
    const response = await axios({
        url: url + "/wp-json/wp/v2/media",
        method: "POST",
        headers: {
            "Content-Disposition": 'attachment; filename="file.jpg"',
            "Authorization": 'Basic ' + Buffer.from(user + ':' + password).toString('base64'),
            "Content-Type": "image/jpeg",
        },
        data: fs.readFileSync(path, (err, data) => {
            if (err) {
                console.log(err);
            }
        }),
    });
    return response.data.id;
}
//add the content of the post
const AddPostContent = async() => {
    await axios(url, {
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + Buffer.from(user + ':' + password).toString('base64'),
            'Content-Type': 'application/json; charset=utf-8',
        },
        data: {
            'title': "title here hello",
            'status': "publish",
            'content': "a small conten",
            'categories': "22",
            'tags': "2,3",
            //  #'date' : date, # YYYY-MM-DDTHH:MM:SS
            'excerpt': " test description",
            //   #'password' : '12$45',
            'slug': "test slug"
        }
    })
}
*/





module.exports = { Post, Download }