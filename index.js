const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000.

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// MongoDB Setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9vhsktv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const addArticleCollections = client.db('postMediaApp').collection('addArticle');

        
    }
    finally {

    }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('Post Media App  Server Running');
});

app.listen(port, () => console.log(`Post Media Server Running on port ${port}`));