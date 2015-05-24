var express = require('express');
var arr = require('./compilers');
var sandBox = require('./DockerSandbox');
var mongoStore = require('express-brute-mongo');
var mongoClient = require('mongodb').MongoClient;
var app = express.createServer();
var port = 3030;

var ExpressBrute = require('express-brute');

var store = new mongoStore(function(ready){
    mongoClient.connect('mongodb://127.0.0.1:27017/test', function(err,db){
        if(err) throw err;
        
        ready(db.collection('bruteforce-store'));
    });
});

var bruteforce = new ExpressBrute(store,{
    freeRetries: 50,
    lifetime: 3600
});

app.use(express.static(__dirname));
app.use(express.bodyParser());

app.all('*', function(req, res, next) 
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});


function random(size){
    return require('crypto').randomBytes(size).toString('hex');
}

app.post("/compile", bruteforce.prevent, function(req, res) {
    var language = req.body.language;
    var code = req.body.code;
    var stdin = req.body.stdin;
    
    var folder = "temp/" + random(10);
    var path = __dirname+"/";
    var vm_name = "virtual_machine";
    var timeout_value = 10;

   
     var sandboxType = new sandBox(timeout_value,path,folder,vm_name,arr.compilerArray[language][0],arr.compilerArray[language][1],code,arr.compilerArray[language][2],arr.compilerArray[language][3],arr.compilerArray[language][4],stdin);

     sandboxType.run(function(data,exec_time,err){
       res.send({output:data, langid: language,code:code, errors:err, time:exec_time});
     });
});

app.get("/", function(req, res){
    res.sendfile("./index.html");
});

console.log("Listening ar " +port);
app.listen(port);