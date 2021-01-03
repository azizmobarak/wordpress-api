const wpai = require('wpapi');
const fs = require('fs');
const fetch = require('node-fetch');
const axios = require('axios')
const Path = require('path')
const Dotenv = require('dotenv').config();

const password = process.env.PASSWORD
const user = 'admin'
const url = process.env.URL;

var WP = new wpai({
    endpoint: url + "/wp-json",
    username: user,
    password: password
});



const Post = async(title, categories, tags, description, slug, img_name) => {

    var data = await DataArticle(title, categories, tags, description, slug)
    await AddallToWP(data, img_name)

}

//download image
async function Download(img, name) {
    console.log("Downloading ... " + name)
    const response = await fetch(img);
    const buffer = await response.buffer();
    await fs.writeFile('./images/' + name + ".jpg", buffer, async(err, data) => {
        if (err) return -1;
        else {
            console.log('finished downloading! ' + name)
            return name;
        }
    });
    return name;
}

//data
const DataArticle = (title, categories, tags, description, slug) => ({
    'title': title,
    'categories': categories,
    'tags': tags,
    'description': description,
    'slug': slug
})


// all the job done by wpai in one single call function
const AddallToWP = async(data, img_name) => {
    console.log('img_name ', img_name)
    var path_img = await Path.resolve(__dirname, "./images", img_name + `.jpg`)
    console.log('category', data.categories)

    try {
        await WP.posts().create({
            title: data.title,
            content: data.content,
            status: 'publish',
            categories: data.categories,
            tags: data.tags,
            excerpt: data.description,
            content: data.description,
            slug: "by " + data.slug
        }).then(async function(post) {
            // Create the media record & upload your image file
             await WP.media().file(path_img).create({
                title: data.title,
                post: post.id
            }).then(async function(media) {
                console.log("media",media.id)
                console.log("post",post.id)
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