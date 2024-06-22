const { MongoClient, ObjectId } = require("mongodb"); //get the mongodb class of objects

//create a new MongoClient
const dbURL = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(dbURL); //creates MongoClient

//MongoDB Functions
async function connection() {
    db = client.db("newdb");
    return db; //returns the database
}
//get all links form menulinks
async function getLinks() {
    db = await connection();
    let results = db.collection("menuLinks").find({});
    return await results.toArray(); //converts results to an array
}

//insert one document to menuLinks collection
async function addLink(newLink) {
    db = await connection();
    await db.collection("menuLinks").insertOne(newLink);
    console.log("link added");
}
//delete one document by _id
async function deleteLink(id) {
    db = await connection();
    const deleteIdFilter = { _id: new ObjectId(id) };
    let result = await db.collection("menuLinks").deleteOne(deleteIdFilter);
    if(result.deletedCount == 1) {
        console.log("deleted successful.")
    }
}
async function getSingleLink(id) {
    db = await connection();
    const editId = { _id: new ObjectId(id) };
    let result = await db.collection("menuLinks").findOne(editId);
    return result;
}
async function editLink(id, link) {
    db = await connection();
    let result = await db.collection("menuLinks").updateOne({ _id : new ObjectId(id) }, { $set: link });
    //console.log(result);
    return result;
}

module.exports = {
    getLinks,
    addLink,
    deleteLink,
    getSingleLink,
    editLink
};