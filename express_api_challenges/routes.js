import express from 'express';

const app = express();
const port  = 5000;

app.get('/product',(req,res)=>{
    res.json([
        { "id": 1, "name": "Laptop", "price": 1000 },
        { "id": 2, "name": "Phone", "price": 500 }
       ]
       )
})

app.get('/product/:id', (req,res) => {
    const items = {
        1: { "id": 1, "name": "Laptop", "price": 1000 },
        2: { "id": 2, "name": "Phone", "price": 500 }
    }
   const item = items[req.params.id]
   if(item){
       res.json(item)
   }else{
    res.status(404);
    res.send('user not found');
   }
})

app.listen(port, (req,res)=>{
    console.log(`Server active on port: ${port}`);
})