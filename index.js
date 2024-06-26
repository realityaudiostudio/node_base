const express = require('express');
const app = express();

let user = [{'name':'Alan JS','email':'alanjosesanto@outlook.com','phone':'8086350450','username':'an_alan_musical'},{'name':'SreeLakshmi','email':'sreesreelakshmi248@gmail.com','phone':'9496898901','username':'_sree_a_lakshmi_'}];

app.get('/users',function(req,res){
    res.json(user);
})

app.listen(4550,function() {
    console.log('Server is listening ... on port 4550');
})