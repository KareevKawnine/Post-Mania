const path = require('path');
const methodOverride = require('method-override')
const {
    v4: uuid
} = require('uuid'); //For generating ID's
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
//To parse form data in POST request body:
app.use(express.urlencoded({
    extended: true
}))
// To parse incoming JSON in POST request body:
app.use(express.json())
// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'))
// Views folder and EJS setup:
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')








// Our fake database:
let posts = [{
        id: uuid(),
        title: 'LMAO',
        username: 'Todd',
        post: 'lol thats is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!lol that is so funny!'
    },
    {
        id: uuid(),
        title: 'Dog Is Watching',
        username: 'Skyler',
        post: 'I like to go birdwatching with my dog'
    },
]



// **********************************
// INDEX - renders multiple comments
// **********************************
app.get('/posts', (req, res) => {
    res.render('posts', {
        posts
    });
})
// **********************************
// NEW - renders a form
// **********************************
app.get('/posts/new', (req, res) => {
    res.render('posts/new', {
        posts
    });
})
// Creates a new Post & it basically depends on the name of the inputs
app.post('/posts', (req, res) => {
    const {
        title,
        username,
        post
    } = req.body;
    posts.push({
        title,
        username,
        post,
        id: uuid(),
    })
    res.redirect('/posts');
})
// SHOW - details about one particular comment
// *******************************************
app.get('/posts/:id', (req, res) => {
    const {
        id
    } = req.params;
    const post = posts.find(p => p.id === id);
    res.render('posts/show', {
        post
    })
})

//************************************** */
// EDIT - renders a form to edit a comment
// *******************************************
app.get('/posts/:id/edit', (req, res) => {
    const {
        id
    } = req.params;
    const post = posts.find(c => c.id === id);
    res.render('posts/edit', {
        post
    })
})
// UPDATE - updates a particular comment
// *******************************************
app.patch('/posts/:id', (req, res) => {
    const {
        id
    } = req.params;
    const foundPost = posts.find(c => c.id === id);

    //get new text from req.body
    const newPostUsername = req.body.username;
    const newPostTitle = req.body.title;
    const newPostPost = req.body.post;

    //update the comment with the data from req.body:
    foundPost.username = newPostUsername;
    foundPost.title = newPostTitle;
    foundPost.post = newPostPost;

    //redirect back to index (or wherever you want)
    res.redirect('/posts')
})

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
app.delete('/posts/:id', (req, res) => {
    const {
        id
    } = req.params;
    posts = posts.filter(c => c.id !== id);
    res.redirect('/posts');
})



// *******************************************

app.listen(3000, () => {
    console.log("We are ON Port 3000!!!!")
})