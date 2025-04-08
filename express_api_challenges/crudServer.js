import express from 'express';

const app = express();
const port = 5000;

app.use(express.json());

let products = [
     { "id": 1, "name": "Laptop", "price": 1000 },
     { "id": 2, "name": "Phone", "price": 500 }
]

app.get('/products',(req,res)=>{
    res.status(200);
    res.json(products);
})

app.get('/products/:id', (req, res)=>{
    const product = products.find( p => p.id === parseInt(req.params.id))
    if(!product){
        res.status(404);
        res.send("user not found");
    }
    res.json(product)
})

app.post('/products',(req,res)=>{
    const newProduct = {
        id : products.length + 1 ,
        name: req.body.name,
        price: req.body.price
    }

    products.push(newProduct);
    res.status(201);
    res.json(newProduct);
})

app.put('/products/:id', (req,res)=>{
    const product = products.find( p => p.id === parseInt(req.params.id))

    if(!product){
        res.status(404);
        res.send('product not found!')
    }
    product.name = req.body.name;
    product.price = req.body.price;
    res.json(product)
})

app.delete('/products/:id', (req,res)=>{
    
    products = products.filter( p => p.id !== parseInt(req.params.id))

    res.json({message : 'product is deleted sucdessfully'});
    res.json(products)
})

app.listen(port, (req,res)=>{
    console.log(`Server active on port: ${port}`);
})