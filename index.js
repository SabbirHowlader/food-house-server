const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ptacj7j.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
   try{
        const foodCollection = client.db('foodHouse').collection('food');
        const reviewCollection = client.db('foodHouse').collection('review');

        app.get('/services', async(req, res) =>{
            const query ={}
            const cursor = foodCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await foodCollection.findOne(query);
            res.send(service);
        })

        // app.post('/checkout', async(req, res) =>{
        //     const review = req.body;
        //     const result = await reviewCollection.insertOne(review);
        //     res.send(result);
        // })
   }
   finally{

   }
}
run().catch(err => console.error(err));


app.get('/', (req, res) =>{
    res.send('food house server is running');
})

app. listen(port, () =>{
    console.log(`food house running on: ${port}`)
});