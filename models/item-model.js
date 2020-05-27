const db = require('../data/dbConfig.js')

module.exports = {
    getAllItems,
    findById,
    findByFilter,
    addItem,
    deleteItem,
    updateItem
}

function getAllItems(){
    return db('item')
}

async function findById(id){
    const item = await db('item as i')
                    .where({ id })
                    // .select('u.id', 'u.username', 'u.email', 'u.about', 'u.store_name')
                    .first()
    return item
}

function findByFilter(filter){
    return db('item').where(filter)
}

async function addItem(body, user_id) {
    const [id] = await db('item').insert(body, 'id'); //id = item_id
    const joinTable = await db('user_item').insert({user_id, item_id:id})

    console.log("JOIN TABLE IN ADDITEM", joinTable)

    return findById(id);
}

async function deleteItem(id){
    return db('item').where({ id }).delete()
}

async function updateItem(id, changes){
    await db('item').where({ id }).update(id, changes)

    return findById(id)
}

