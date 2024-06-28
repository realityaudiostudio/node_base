const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');

// let user = [{'name':'Alan JS','email':'alanjosesanto@outlook.com','phone':'8086350450','username':'an_alan_musical'},{'name':'SreeLakshmi','email':'sreesreelakshmi248@gmail.com','phone':'9496898901','username':'_sree_a_lakshmi_'}];
let user = [];
let db='';  
// let userdata = [{'name':'Alan JS','email':'alanjosesanto@outlook.com','phone':'8086350450','username':'an_alan_musical'},{'name':'SreeLakshmi','email':'sreesreelakshmi248@gmail.com','phone':'9496898901','username':'_sree_a_lakshmi_'}];

//mongo connects

async function mongoConnect() {
    let client = new MongoClient('mongodb+srv://anshif:nesRoWgW5SqAD0yF@cluster0.8dtglzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    await client.connect();
    db = client.db('test');
   ;
 }
 
 


app.use(cors());
app.use(express.json());


// app.get('/users',function(req,res){
//     res.json(user);
// })





app.get('/users',async function(req,res){
    let output = await db.collection('user').find({}).toArray();
    res.json(output);
})

app.post('/users',async function(req,res){
    let output = await db.collection('user').insertOne(req.body);
    console.log(req.body);
    user.push(output);
});

// app.post('/register',async function(req,res){
//     console.log(req.body);
//     userdata.push(req.body);
//     res.json({success:true});
// });

// app.post('/login', function(req,res){
//     console.log(req.body);
//     for(let i=0;i<userdata.length;i++)
//         {
//             if(userdata[i].userName==req.body.userName)
//                 {
//                     if(userdata[i].password==req.body.password)
//                         {
//                             return res.json(userdata[i]);
                            
//                         }
//                 }
//         }
//         return res.json("user not found!");
// })

//my own code mwone


//the working onee
app.post('/login', async function(req, res) {
    console.log('Login attempt:', req.body);
    const { userName, password } = req.body;
    try {
        let usr = await db.collection('user').findOne({ userName, password });
        if (usr) {
            console.log('Login successful:', usr);
            res.json({ success: true, usr });
        } else {
            console.log('Invalid USER or PASS');
            res.json({ success: false, message: 'Invalid USER or PASS' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.post('/login',async function(req,res){
//     console.log(req.body);
//     let output = await db.collection('user').insertOne(req.body);
    
// })

app.listen(4550,function() {
    console.log('Server is listening ... on port 4550');
    mongoConnect();
})