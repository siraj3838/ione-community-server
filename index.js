const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hq29e8f.mongodb.net/?retryWrites=true&w=majority`;
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
        // await client.connect();
        const userCollection = client.db('ioneDB').collection('users');
        const postCollection = client.db('ioneDB').collection('posts');
        const savePostCollection = client.db('ioneDB').collection('savePost');
        const messageCollection = client.db('ioneDB').collection('message');
        const reportSuccessCollection = client.db('ioneDB').collection('reportSuccess');
        const adminPostCollection = client.db('ioneDB').collection('adminPost');



        // adminPostCollection
        app.post('/adminPosts', async(req, res)=>{
            const post = req.body;
            const result = await adminPostCollection.insertOne(post);
            res.send(result);
        })
        app.get('/adminPosts', async (req, res) => {
            const filter = req.query;
            // console.log(filter);
            const query = {};
            const options = {
                sort: {
                    time: filter.sort == 'asc' ? -1 : 1
                }
            }
            const cursor = adminPostCollection.find(query, options);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.put('/adminPosts/private/:id', async (req, res) => {
            const id = req.params.id;
            const privacy = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatePrivacy = {
                $set: {
                    privacy: privacy.privacy,
                }
            }
            const result = await adminPostCollection.updateOne(filter, updatePrivacy, options);
            res.send(result);
        })
        app.put('/adminPosts/public/:id', async (req, res) => {
            const id = req.params.id;
            const privacy = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatePrivacy = {
                $set: {
                    privacy: privacy.privacy,
                }
            }
            const result = await adminPostCollection.updateOne(filter, updatePrivacy, options);
            res.send(result);
        })
        app.delete('/adminPosts/delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await adminPostCollection.deleteOne(query);
            res.send(result);
        })

        
        // reportSuccessCollection
        app.post('/reportSuccess', async(req, res)=>{
            const post = req.body;
            const result = await reportSuccessCollection.insertOne(post);
            res.send(result);
        })
        app.get('/reportSuccess', async (req, res) => {
            const filter = req.query;
            // console.log(filter);
            const query = {};
            const options = {
                sort: {
                    successTime: filter.sort == 'asc' ? -1 : 1
                }
            }
            const cursor = reportSuccessCollection.find(query, options);
            const result = await cursor.toArray();
            res.send(result);
        })

        // messageCollection
        app.post('/messages', async(req, res)=>{
            const message = req.body;
            const result = await messageCollection.insertOne(message);
            res.send(result);
        })
        app.get('/messages', async (req, res) => {
            const message = await messageCollection.find().toArray();
            res.send(message);
        })



        // savePostCollection
        app.post('/savePosts', async(req, res)=>{
            const post = req.body;
            const result = await savePostCollection.insertOne(post);
            res.send(result);
        })
        app.get('/savePosts', async (req, res) => {
            const post = await savePostCollection.find().toArray();
            res.send(post);
        })
        app.get('/savePost', async (req, res) => {
            const filter = req.query;
            // console.log(filter);
            const query = {};
            const options = {
                sort: {
                    time: filter.sort == 'asc' ? -1 : 1
                }
            }
            const cursor = savePostCollection.find(query, options);
            const result = await cursor.toArray();
            res.send(result);
        })


        // postCollection
        app.post('/userPost', async(req, res)=>{
            const post = req.body;
            const result = await postCollection.insertOne(post);
            res.send(result);
        })
        app.get('/userPosts', async (req, res) => {
            const post = await postCollection.find().toArray();
            res.send(post);
        })
        app.get('/userPost', async (req, res) => {
            const filter = req.query;
            // console.log(filter);
            const query = {};
            const options = {
                sort: {
                    time: filter.sort == 'asc' ? -1 : 1
                }
            }
            const cursor = postCollection.find(query, options);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.put('/userPost/private/:id', async (req, res) => {
            const id = req.params.id;
            const privacy = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatePrivacy = {
                $set: {
                    privacy: privacy.privacy,
                }
            }
            const result = await postCollection.updateOne(filter, updatePrivacy, options);
            res.send(result);
        })
        app.put('/userPost/public/:id', async (req, res) => {
            const id = req.params.id;
            const privacy = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatePrivacy = {
                $set: {
                    privacy: privacy.privacy,
                }
            }
            const result = await postCollection.updateOne(filter, updatePrivacy, options);
            res.send(result);
        })
        app.put('/userPost/friend/:id', async (req, res) => {
            const id = req.params.id;
            const privacy = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatePrivacy = {
                $set: {
                    privacy: privacy.privacy,
                }
            }
            const result = await postCollection.updateOne(filter, updatePrivacy, options);
            res.send(result);
        })
        app.put('/userPost/like/:id', async (req, res) => {
            const id = req.params.id;
            const stringLike = req.body;
            console.log(stringLike);
            const like = parseInt(stringLike.like);
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateLike = {
                $set: {
                    like: like + 1,
                }
            }
            const result = await postCollection.updateOne(filter, updateLike, options);
            res.send(result);
        })
        app.put('/userPost/report/:id', async (req, res) => {
            const id = req.params.id;
            const post = req.body;
            console.log(post);
            const report = post.report;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateReport = {
                $set: {
                    report: report
                }
            }
            const result = await postCollection.updateOne(filter, updateReport, options);
            res.send(result);
        })



        app.delete('/userPost/delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await postCollection.deleteOne(query);
            res.send(result);
        })


        // userCollection
        app.post('/users', async (req, res) => {
            const user = req.body;
            // unique one email one time
            const query = { email: user.email }
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exist', insertedId: null })
            }

            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        app.get('/users', async (req, res) => {
            const user = await userCollection.find().toArray();
            res.send(user);
        })
        app.get('/adminUser/:email', async(req, res)=>{
            const email = req.params.email;
            const query = {email: email};
            const user = await userCollection.findOne(query);
            let admin = false;
            if(user){
                admin = user?.roll === 'Admin';
            }
            res.send({admin});
        })

        app.put('/users/banner/:id', async (req, res) => {
            const id = req.params.id;
            const banner = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateUser = {
                $set: {
                    banner: banner,
                }
            }
            const result = await userCollection.updateOne(filter, updateUser, options);
            res.send(result);
        })
        app.put('/users/banner/update/:id', async (req, res) => {
            const id = req.params.id;
            const banner = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateUser = {
                $set: {
                    banner: banner,
                }
            }
            const result = await userCollection.updateOne(filter, updateUser, options);
            res.send(result);
        })
        app.put('/users/bio/:id', async (req, res) => {
            const id = req.params.id;
            const bio = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateUser = {
                $set: {
                    bio: bio,
                }
            }
            const result = await userCollection.updateOne(filter, updateUser, options);
            res.send(result);
        })
        app.put('/users/bio/edit/:id', async (req, res) => {
            const id = req.params.id;
            const bio = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateUser = {
                $set: {
                    bio: bio,
                }
            }
            const result = await userCollection.updateOne(filter, updateUser, options);
            res.send(result);
        })
        // facebookURL
        app.put('/users/facebook/:id', async (req, res) => {
            const id = req.params.id;
            const info = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateUser = {
                $set: {
                    facebookURL: info.facebookURL,
                    twitterURL: info.twitterURL,
                    linkedinURL: info.linkedinURL,
                }
            }
            const result = await userCollection.updateOne(filter, updateUser, options);
            res.send(result);
        })
        

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('I one community Server Running');
})
app.listen(port, () => {
    console.log(`I one community Running From ${port}`);
})
