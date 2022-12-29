const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// MongoDB Setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9vhsktv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// * Verify JWT * //
function verifyJWT(req, res, next) {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Unauthorized accessToken');
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Access Forbidden' })
        }
        req.decoded = decoded;
        next();
    })
}
async function run() {
    try {
        const addArticleCollections = client.db('postMediaApp').collection('articles');
        const usersCollections = client.db('postMediaApp').collection('users');

        // Post Users Data
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await usersCollections.insertOne(user);
            res.send(result);
        })
        // user data load
        app.get('/users', async (req, res) => {
            const email = req.query.email;
            console.log(email);
            const query = {email: email};
            const users = await usersCollections.find(query).toArray();
            res.send(users);
        })
        // article post
        app.post('/articles', async (req, res) => {
            const article = req.body;
            console.log(article);
            const result = await addArticleCollections.insertOne(article);
            res.send(result);
        })
        // article get
        app.get('/articles', async (req, res) => {
            const query = {};
            const articles = await addArticleCollections.find(query).toArray();
            res.send(articles);
        })
    }
    finally {
    }
}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('Post Media App  Server Running');
});

app.listen(port, () => console.log(`Post Media Server Running on port ${port}`));