const { valid } = require('joi');
const Joi = require('joi')

 
    const validn = Joi.object({


        first_name: Joi.string()
                  .min(2)
                  .max(30)
                  .required(),
        last_name: Joi.string()
                  .min(2)
                  .max(30)
                  .required(),
        email_id: joi.string()
                  .email()
                  .required(),

                  
    
    
    });

         

module.exports=valid;

