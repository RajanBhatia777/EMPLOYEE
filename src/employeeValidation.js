const Joi = require('joi')

 
    const empSchema = Joi.object({

        first_name: Joi.string()
                  .min(2)
                  .max(30)
                  .required(),
        last_name: Joi.string()
                  .min(2)
                  .max(30)
                  .required()
    
    
    });

         

module.exports=empSchema;

