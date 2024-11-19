import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const contents = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render("index.ejs");
});


app.get('/createBlogs', (req, res) =>{
    res.render("createBlogs.ejs");
});

app.listen(port, (req, res) => {
    console.log(`Server has been sucessfully established at port ${port}`);
});

app.post("/submit", (req, res) => {
    const data = {
        firstName: req.body["firstName"],
        lastName: req.body["lastName"],
        email: req.body["email"], 
        phoneNumber: req.body["phoneNumber"],
        title: req.body["title"],
        blogContent: req.body["blogContent"]
    }

    contents.push(data);

    res.redirect("/viewBlogs");
});


app.get('/viewBlogs', (req, res) => {
    res.render("viewBlogs.ejs", {contents: contents});
});

app.post(`/delete/:index`, (req, res) => {
    // extracting index from the url
    const index = req.params.index;

    if (index >= 0 && index < contents.length){
        // splice method revoes elements starting at this index
        // 1= "remove 1 element"
        contents.splice(index, 1);
    }
    res.redirect("/viewBlogs");
});


