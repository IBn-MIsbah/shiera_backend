import express from 'express';

const app = express();
const port = 5000;

app.get('/', (req,res)=>{
    res.json({"message": "Welcome to Sheira!"})
})

app.listen(port, (req,res)=>{
    console.log(`Server active on port: ${port}`);
})