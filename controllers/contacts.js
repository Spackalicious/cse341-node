const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { userSchema } = require('../helpers/validation_schema')

const blankMsg = (req, res) => {
    res.send("Add a route to get data!");
};

const getContacts = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists); 
    }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }    
};

const getIndividual = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }    
};

const newContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName, 
    lastName: req.body.lastName, 
    email: req.body.email, 
    favoriteColor: req.body.favoriteColor, 
    birthday: req.body.birthday
  };
  
  try {
    const validated = await userSchema.validateAsync(contact);
    const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .insertOne(validated);
    if (response.acknowledged) {
      res.status(201).json(response);
      console.log(`${contact.firstName} ${contact.lastName} successfully created.`);
    }
  } catch (error) {
    console.log(error);
    res.send(`Missing some data. \n${error}\nPlease try again.`);
  }
}

const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName, 
      lastName: req.body.lastName, 
      email: req.body.email, 
      favoriteColor: req.body.favoriteColor, 
      birthday: req.body.birthday
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
      console.log(`${contact.firstName} ${contact.lastName} successfully updated`);
    } else {
      res.status(500).json(response.error || `An error occured while trying to update ${contact.firstName} ${contact.lastName}.`);
      console.log(`An error occured while trying to update ${contact.firstName} ${contact.lastName}.`);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const delResponse = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .deleteOne({_id: contactId});
      console.log(delResponse);
      if (delResponse.deletedCount > 0 ) {
        res.status(200).send();
        console.log('Contact successfully deleted');
      } else {
        res.status(500).json(delResponse.error || 'An error occured while trying to remove the contact.');
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

module.exports = {     
    getContacts
    , getIndividual
    , newContact
    , updateContact
    , removeContact
    , blankMsg
};