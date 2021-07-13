const express = require("express");
const apiRoute = require("./middleware/routes/api")
const path = require('path');


const app = express();

//Should be env variables, but using constants for sandbox example
const PORT = 3000;


//Setup Middleware
app.use(express.json());
app.use("/api", apiRoute);
app.use(express.static(__dirname + '/frontend/angular/dist/angular')); //Allows Angular Frontend



//Web Routes
app.get("/", (req, res) => {
    //Entry To Angular Front End
    res.sendFile(path.join(__dirname, '/frontend/angular/dist/angular/index.html'));
})

app.get('*',function (req, res) {
    //Redirect to Angular Entry In Fall Through
    res.redirect('/');
});


app.listen(3000, () => console.log("Server on port 3000"));