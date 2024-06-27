const express = require('express');
const app = express();
const cors = require('cors');

// let user = [{'name':'Alan JS','email':'alanjosesanto@outlook.com','phone':'8086350450','username':'an_alan_musical'},{'name':'SreeLakshmi','email':'sreesreelakshmi248@gmail.com','phone':'9496898901','username':'_sree_a_lakshmi_'}];
let userdata = [];
// let userdata = [{'name':'Alan JS','email':'alanjosesanto@outlook.com','phone':'8086350450','username':'an_alan_musical'},{'name':'SreeLakshmi','email':'sreesreelakshmi248@gmail.com','phone':'9496898901','username':'_sree_a_lakshmi_'}];

app.use(cors());
app.use(express.json());


// app.get('/users',function(req,res){
//     res.json(user);
// })



app.post('/userdata',function(req,res){
    console.log(req.body);
    userdata.push(req.body);
    res.json({success:true});
});

app.get('/userdata',function(req,res){
    res.json(userdata);
})

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

app.post('/login',function(req,res){
    console.log(req.body);
    const {userName,password} = req.body;
    const usr = userdata.find(u =>u.userName === userName && u.password===password);
    if (usr)
        {
            res.json({success:true,usr});
        }
        else{
            res.json({success:false,message:"Invalid USER or PASS"});
        }
});

app.listen(4550,function() {
    console.log('Server is listening ... on port 4550');
})