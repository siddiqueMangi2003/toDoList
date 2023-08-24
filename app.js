const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

let items = ["Buy Food",
    "Cook Food"
    ,"Eat Food"];

let workItems = [];

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req,res){

var today = new Date();

var options = { weekday: 'long', day: 'numeric', month: 'long' };

var day = today.toLocaleDateString("en-US", options);


res.render("list", {
    listTitle: day, newListItems: items
    
    });

});

app.post("/", function(req, res){
   console.log(req.body);
    let item = req.body.newItem;
    if (req.body.list === "Work"){

        workItems.push(item);
        res.redirect("/work");
    }
    
    else{
        items.push(item);

        res.redirect("/");
     
    }
   
}); 

app.get("/work", function(req, res){


    res.render("list", {listTitle: "Work List", newListItems: workItems});
});
   



app.listen(3000, function(){

    console.log("Server is started on port 3000");


})