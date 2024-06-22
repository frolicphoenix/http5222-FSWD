const { MongoClient, ObjectId } = require("mongodb"); //import MongoClient class from mongodb driver

//DATABASE SETUP
const dbUrl = `mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/?authSource=testdb`;
//const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(dbUrl); //create a MongoDB client

//MONGODB FUNCTIONS
async function connection() {
  db = client.db("testdb"); //select "testdb" to use
  return db;
}

//Function to select all documents in the menuLinks collection.
async function getLinks() {
  db = await connection();
  let results = db.collection("menuLinks").find({}); //select all documents in menuLinks
  return await results.toArray(); //convert results to an array
}

//Function to insert one document into menuLinks collection.
async function addLink(newLinkDoc) {
  db = await connection();
  let status = await db.collection("menuLinks").insertOne(newLinkDoc);
  //you can do something with status to check if ok
  console.log("link added");
}

//Function to delete one document from menuLinks collection by _id.
async function deleteLink(id) {
  let idFilter = { _id: new ObjectId(id) };
  db = await connection();
  let result = await db.collection("menuLinks").deleteOne(idFilter);
  if (result.deletedCount == 1)
    console.log("link deleted");
}

module.exports = {
  getLinks,
  addLink,
  deleteLink
}