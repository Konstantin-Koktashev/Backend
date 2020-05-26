
const dbService = require('../../services/db.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,

    remove,
    update,
    add
}

async function query() {
    const collection = await dbService.getCollection('chat')
    try {
        const chat = await collection.find().toArray();

        return chat
    } catch (err) {
        console.log('ERROR: cannot find chat')
        throw err;
    }
}


async function remove(chatId) {
    const collection = await dbService.getCollection('chat')
    try {
        await collection.deleteOne({ "_id": ObjectId(chatId) })
    } catch (err) {
        console.log(`ERROR: cannot remove board ${chatId}`)
        throw err;
    }
}
async function update(chat) {
    const collection = await dbService.getCollection('chat')
    chat._id = ObjectId(chat._id);

    try {
        await collection.replaceOne({ "_id": chat._id }, { $set: chat })
        return chat
    } catch (err) {
        console.log(`ERROR: cannot update chat ${chat._id}`)
        throw err;
    }
}


async function add(msg) {
    const collection = await dbService.getCollection('chat')
    try {
        await collection.insertOne(msg);
        return msg;
    } catch (err) {
        console.log(`ERROR: cannot insert msg`)
        throw err;
    }
}


