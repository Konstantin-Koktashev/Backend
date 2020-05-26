
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
        const chat = await collection.toArray();

        return chat
    } catch (err) {
        console.log('ERROR: cannot find chat')
        throw err;
    }
}


async function update(roomObj) {
    const collection = await dbService.getCollection('chat')
    roomObj._id = ObjectId(roomObj._id);

    try {
        await collection.replaceOne({"_id":roomObj._id}, {$set : roomObj})
        return roomObj
    } catch (err) {
        console.log(`ERROR: cannot update roomObj ${roomObj._id}`)
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



async function add(roomObj) {
    const collection = await dbService.getCollection('chat')
    try {
        await collection.insertOne(roomObj);
        return roomObj;
    } catch (err) {
        console.log(`ERROR: cannot insert msg`)
        throw err;
    }
}


