const express = require('express')
const app = express()
const port = process.env.PORT || 3010;
const cors = require('cors')


//middleware
app.use(cors())
app.use(express.json())




//Database Connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://millatsakib01:zh782XtVSyC40rxZ@cluster0.lm9a1gh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



const users = [
    {
        id: 1,
        name: 'Sabana',
        email: 'sabana@gmail.com'
    },
    {
        id: 2,
        name: 'Sabnoor',
        email: 'sabnoor@gmail.com'
    },
    {
        id: 3,
        name: 'Sabila',
        email: 'sabila@gmail.com'
    }
]

app.get("/", (req, res) => {
    res.send('Users Management server is running.');
})

app.get("/users", (req, res) => {
    res.send(users)
})

app.post("/users", (req, res) => {
    console.log("post user hitted!!");

    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.send(newUser);
})

app.listen(port, () => {
    console.log(`Server is runnig on PORT ${port}`);
})
