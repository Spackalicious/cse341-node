const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const blankMsg = (req, res) => {
    res.send("Add a route to get data!");
};

const getContacts = async (req, res, next) => {
    const result = await mongodb
        .getDb()
        .db()
        .collection('contacts')
        .find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists); 
    }); 
};

// still need to make single contact return
const getIndividual = async (req, res, next) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find({ _id: contactId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

module.exports = { 
    getContacts
    , getIndividual
    , blankMsg
};