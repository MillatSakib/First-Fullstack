const express = require('express')
const app = express()
const port = process.env.PORT || 3010;
const cors = require('cors')


//middleware
app.use(cors())
app.use(express.json())




//Database Connection
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://millatsakib01:zh782XtVSyC40rxZ@cluster0.lm9a1gh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const findAllUser = async (req, res, userCollection) => {

    const cursor = userCollection.find();
    const result = await cursor.toArray();
    res.send(result)

}



const setDataOnDatabase = async (req, res, userCollection) => {

    const user = req.body;

    console.log("New user", user);
    const result = await userCollection.insertOne(user);

    res.send(user)
}

const deleteUserFromDB = async (req, res, userCollection, id) => {
    console.log("Deleted the user ", id);
    const query = { _id: new ObjectId(id) }
    const result = await userCollection.deleteOne(query);
    res.send(result);
}

async function run() {
    try {
        const database = client.db("userDB");
        const userCollection = database.collection("user");

        app.get('/users', async (req, res) => {
            findAllUser(req, res, userCollection);
        })

        app.post('/user', async (req, res) => {
            setDataOnDatabase(req, res, userCollection);
        })

        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            deleteUserFromDB(req, res, userCollection, id);

        })

        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const user = await userCollection.findOne(query);
            res.send(user);

        })

        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            console.log(id, user);
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.email,
                }
            }
            const result = await userCollection.updateOne(filter, updatedUser, options)
            res.send(result)
        })
    }
    finally {
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

app.listen(port, () => {
    console.log(`Server is runnig on PORT ${port}`);
})
