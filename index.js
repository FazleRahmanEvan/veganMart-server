const express = require('express')
const cors = require('cors');

require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express()

//MIDDLEWARE
app.use(cors({
    // credentials: true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin:'*'}));
  app.use(express.json());


  const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jbv9vmr.mongodb.net/?retryWrites=true&w=majority`;

  // console.log(uri)

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run(){

    try{

      console.log("database connected");

      const drinksCollection = client.db('vegan-mart').collection('drinks');
      const confectionaryCollection = client.db('vegan-mart').collection('confectionary');
      const comboCollection = client.db('vegan-mart').collection('combo');

      app.get('/drinks',async (req, res) => {
        const drinks = await drinksCollection.find().toArray();
        res.send(drinks);
    })


    app.get('/drinks/:_id', async (req,res)=> {
      const id = req.params._id;
      console.log(id); 
      const query ={_id: new ObjectId(id)}
      const result = await drinksCollection.findOne(query);
      console.log(result);
      res.send(result);        
    })



      app.get('/confectionary',async (req, res) => {
        const confectionary = await confectionaryCollection.find().toArray();
        res.send(confectionary);
    })


    app.get('/confectionary/:_id', async (req,res)=> {
      const id = req.params._id;
      console.log(id); 
      const query ={_id: new ObjectId(id)}
      const result = await confectionaryCollection.findOne(query);
      console.log(result);
      res.send(result);        
    })



      app.get('/combo',async (req, res) => {
        const combo = await comboCollection.find().toArray();
        res.send(combo);
    })


    app.get('/combo/:_id', async (req,res)=> {
      const id = req.params._id;
      console.log(id); 
      const query ={_id: new ObjectId(id)}
      const result = await comboCollection.findOne(query);
      console.log(result);
      res.send(result);        
    })



    }
    finally{

    }
  }

  run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello VEGAN MART')
})

app.listen(port, () => {
  console.log(`Vegan Mart listening on port ${port}`)
})