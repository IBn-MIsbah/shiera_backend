import express from 'express';

const app = express();
const port = 3000;

app.use(express.static("./src/style"))
app.set("view engine", "pug");
app.set("views", "./src/views");

app.get('/', (req,res)=>{
    const data = {
        name: "Fatima Noor",
        age: 23,
        profession: "Software Developer",
        skills: ["Node.js", "Express", "MongoDB", "EJS"]
      }
    res.render('index', data)      
})

app.listen(port, (err)=>{
    if(err){
        throw err
    }
    console.log(`server active on port; ${port}`);
})