const mongodb = require('../db/connect');

const getContacts = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists); 
    }); 
};

// const lesson2Test = (req, res) => {
//     res.send("Test 2 Complete!");
// };

module.exports = { 
    getContacts
    // , lesson2Test 
};