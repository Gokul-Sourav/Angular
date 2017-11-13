var express= require("express");
var app=express();
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID
var db=null;
var bodyparser=require('body-parser');

app.use(bodyparser.json());
app.use(express.static(__dirname+"/public"));

MongoClient.connect("mongodb://10.201.47.68:27017/meeting",function(err,database){
   // console.log(err);
    db = database;
   // console.log(db);
});

app.use(express.static(__dirname + "/public"));
/*app.get("/stocks",function (req,res) {
    console.log(db);
    db.collection("cart1").find({}).toArray(function(err,doc){
        console.log(err);
        res.json(doc);
    });
});*/
app.get("/products",function (req,res) {
    console.log(db);
    db.collection("cart").find({}).toArray(function(err,doc){
        console.log(err);
        res.json(doc);
    });
});

app.post('/products',function(req,res){
    console.log(req.body);
    db.collection("cart").insertOne(req.body, function(err,doc){
      res.json(doc);
    });
});

app.delete("/products/:id",function(req,res){
  //  console.log(req.params.id+"fdfsffsd");
    var id=req.params.id;
    var myquery={_id: ObjectId(id)};
    db.collection("cart").deleteOne(myquery, function(err, doc) {
        res.json(doc);
    });

})

app.get("/products/:id",function (req,res) {
    console.log(req.params.id);
    var id=req.params.id;
    db.collection("cart").findOne({_id: ObjectId(id)},function(err, doc) {
           console.log(doc);
           res.json(doc);
    });

});
app.put("/products/:id",function (req,res) {
    console.log(req.body.name);
    var id=req.params.id;
    var myquery={_id:ObjectId(id)};
    var newvalues={name:req.body.name, price:req.body.price, qty:req.body.qty};
    db.collection("cart").updateOne(myquery,newvalues,function (err,doc) {
        console.log(doc);
        res.json(doc);
    })
});



/*app.post('/stocks',function(req,res){
    console.log(req.body);
    db.collection("cart1").insertOne(req.body, function(err,doc){
      res.json(doc);
      console.log(doc);
    });
});

app.delete("/stocks/:id",function(req,res){
  //  console.log(req.params.id+"fdfsffsd");
    var id=req.params.id;
    var myquery={_id: ObjectId(id)};
    db.collection("cart1").deleteOne(myquery, function(err, doc) {
        res.json(doc);
    });

})*/
app.listen(3000);
console.log("Server working on port 3000");
