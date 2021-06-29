const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Subscriber = require('./model')


mongoose.connect("mongodb://localhost/todos",{ useUnifiedTopology: true,useNewUrlParser: true });
const db=mongoose.connection
db.on('error',(error)=>console.log(error));
db.once('open',()=>console.log('connected to DB'));

app.use(express.json());

// const subscribersRouter = require('./rest/subscribers')
// app.use('/subscribers', subscribersRouter)


app.get('/', async (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.send("Hello Server")
    // const subscribers = await Subscriber.find()
    //     res.json(subscribers)
    //     console.log(subscribers)
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
        // res.send(subscribers.text)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

app.post('/delete/:id', async (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    let sub=await Subscriber.findById(req.params.id)
    if(sub==null){
        return res.status(404).json({message:"no text found"})
    }else{
        await sub.remove()
        res.json({message:"deleted text"})
        // console.log("deleted")
    }
})

app.get("/:id", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const id = req.params.id;
    Subscriber.findById(id, (err, todo) => {
      res.json(todo);
    });
  });


app.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const subscribers=new Subscriber({
        text:req.body.text,
        // name:req.body.name
    })
    try{
        const newsub= await subscribers.save()
        res.status(201).json(newsub)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

const PORT = 4000;

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
  