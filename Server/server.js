const express = require("express");
const mongoose = require("mongoose");
const Register = require("./registerModel");
var request = require("request");
const { compile } = require("html-to-text");
const cors = require('cors');
const path = require("path");

const app = express();
app.use(cors());

const port = process.env.PORT || 7397;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")))


mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Jithin_88jeevan:071263%40Jj@cluster0.x0rbw.mongodb.net/myCountApp?retryWrites=true&w=majority")


app.post("/api/register", async (req, res) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); 

  const url = req.body.url;
  const domain = url.slice(8);
  try{
  const convert = compile({});
  request({ uri: url }, async function (error, response, body) {
    const htmls = [body];
    const texts = htmls.map(convert);

    var totalWords = texts.join("\n");
    var count = totalWords.split(" ").length;
    const newEntry = Register({
      url: url,
      domain: domain,
      status: "N",
      count: count,
    });
    const registerData = await newEntry.save();
    const table = await Register.find();
  res.send({ status: 200, success: true, data: {table:table,count:count} });
  });


  
}catch{
  res.send({ status: 500, success: false, data: "" })
}
});


app.put("/api/update/:id/:status",async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); 
  const id = req.params.id
  const status = req.params.status
  try{
  const filter = { _id: id };
    const update = {  status: status  };
   await Register.findOneAndUpdate(filter, update, { new: true })
    .then( (response) =>{
        res.send({status:200,success:true,data:response});
    })
  }catch{
    res.send({status:500,success:false,data:""});

  }
});

app.delete("/api/delete/:id", async(req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); 
  const id = req.params.id
 
  try{
  
  const table = await  Register.findOneAndDelete({_id:id})
    .then( (response)=> {
        res.send({status:200,success:true,data:response});
    })
  }catch{
    res.send({status:500,success:false,data:""});

  }
});

app.get("/api/table", async(req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); 
  try{
  
  const table = await  Register.find()
  res.send({status:200,success:true,data:table});
  }catch{
    res.send({status:500,success:false,data:""});

  }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log("Server " + port + " is on");
});
