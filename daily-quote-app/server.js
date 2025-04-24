import express, { response } from 'express';


const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

const quotesList = [
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Every day is a second chance.", author: "Oprah Winfrey" },
    { text: "You can't stop the waves, but you can learn to surf", author: "Winston Churchill" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "Talk is cheap. Show me the code", author: " Linus Torvalds" },
    
  ];

app.get('/', async (req, res)=>{

    const index = Math.floor(Math.random() * quotesList.length)
    res.render('index', {quote: quotesList[index]})
})

app.listen(port, (err)=>{
    if(err) {throw err}
    console.log(`server active on port: ${port}`);
})

export default app;