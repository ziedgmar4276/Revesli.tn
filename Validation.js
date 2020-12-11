const Joi = require("joi");
//registation de  user  client  
const registationValidation = (data) => {
    const schema = Joi.object({
        Name: Joi.string().required(),
        Phone: Joi.string().required().max(15),
        //Phone number validation rule for Joi
        Email: Joi.string().required().email(),
        Password: Joi.string().required().min(8),
        
    });
    return schema.validate(data);
};
// login de  user client 
const loginValidation = (data) => {
    const schema = Joi.object({
        Email: Joi.string().required().email(),
        Password: Joi.string().required().min(8),
    });
    return schema.validate(data);
}
//registation de  user  admin  
const registationValidation_admin = (data) => {
    const schema = Joi.object({
       
       
        Email: Joi.string().required().email(),
        Password: Joi.string().required().min(8),
        
    });
    return schema.validate(data);
};

module.exports.registationValidation = registationValidation;
module.exports.loginValidation = loginValidation;
module.exports.registationValidation_admin = registationValidation_admin;
