const Joi = require('joi');

const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(), 
    email: Joi.string().email().required(), 
    favoriteColor: Joi.string().min(3).max(15).required(), 
    birthday: Joi.string().min(6).max(30).required()
})

module.exports = {
    userSchema 
}