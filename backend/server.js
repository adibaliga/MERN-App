const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Subscriber = require('./model')


mongoose.connect("mongodb://localhost/todos",{ useUnifiedTopology: true,useNewUrlParser: true });
const db=mongoose.connection
db.on('error',(error)=>console.log(error));
db.once('open',()=>console.log('connected to Database todo'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



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
    // Subscriber.findById(id, (err, todo) => {
    //   res.json(todo);
    // });
    Subscriber.find({text:id}, (err, todo) => {
        res.json(todo);
      });
  });


app.post('/:text', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // req.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const subscribers=new Subscriber({
        // text:req.body.text,
        text:req.params.text,
        // name:req.body.name
    })
    try{
        const newsub= await subscribers.save()
        res.status(201).json(newsub)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

app.post('/update/:id/:text', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // console.log("hi")
    // res.send(res.subscriber.text)
    // res.json(res.subscriber)
    let sub=await Subscriber.findById(req.params.id)
    if(req.params.text != null){
        sub.text=req.params.text
    }
    // sub.text=req.params.text
    // if(req.body.name != null){
    //     res.subscriber.name=req.body.name
    // }
    try {
        const updatedSubscriber = await sub.save()
        res.json(updatedSubscriber)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})


// async function getSubscriber(req,res,next){
//     let subscriber
//     try{
//         subscriber=await Subscriber.findById(req.params.id)
//         if(subscriber==null){
//             return res.status(404).json({message:"no text found"})
//         }
//     }catch(err){
//         return res.status(500).json({message:err.message})
//     }
//     res.subscriber= subscriber
//     next()
// }

const PORT = 4000;

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
  