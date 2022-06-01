// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port=3030;

const server=app.listen(port,()=>{
    console.log(`Server Running on localhost: ${port}`);
});

//GET Route
const getAllData=(req,res)=>{
    res.send(projectData);
    console.log(projectData);
};
app.get('/all',getAllData);

//Post Route
const postData=(req,res)=>{
    projectData={
        date:req.body.date,
        weather:req.body.weather,
        content:req.body.content
    }
    //console.log(projectData);
    res.send(projectData);
}
app.post('/add',postData);

