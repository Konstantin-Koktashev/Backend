
const dbService = require('../../services/db.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,

    remove,

    add
}

async function query() {
    const collection = await dbService.getCollection('chat')
    try {
        const chat = await collection.toArray();

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


