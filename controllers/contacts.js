const mongodb = require('../db/connect');

const getContacts = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists); 
    }); 
};

// still need to make single contact return

module.exports = { 
    getContacts
};