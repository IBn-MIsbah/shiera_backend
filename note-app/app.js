import 'dotenv/config'
import express from 'express'
import bodyparser from 'body-parser';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('auth/login')
})

app.listen(port, (err)=>{
    if(err){
        console.error(err)
    }
    console.log(`Server active on http//:localhost:${port}`)
})