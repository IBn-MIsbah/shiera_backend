import express, { response } from 'express';
import axios from 'axios';


const app = express();
const port = 3000;
const API_KEY = 'lrkk1P/bklOzHNzEYlQNfQ==zv7d3eGBlWCMmkab';
const api_url = 'https://api.api-ninjas.com/v1/quotes'

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async (req, res)=>{

   try{
        const response = await axios.get(api_url, {
        headers:{
          ' X-Api-Key': API_KEY
        }
    });

    const quotesData = Array.isArray(response.data) ? response.data[0] : response.data
    res.render('index', {
        quote: quotesData.quote,
        author: quotesData.author
    })
} catch(err){
    console.error(err)
}
})

app.listen(port, (err)=>{
    if(err) {throw err}
    console.log(`server active on port: ${port}`);
})