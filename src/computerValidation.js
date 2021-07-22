const Joi = require('joi')

 
    const comSchema = Joi.object({

        computer_serial_number: Joi.string()
        .regex(/^\d{4}-\d{4}-\d{4}$/)
        .min(14)
        .max(20)
        .required()
                
    
    
    });

         

module.exports=comSchema;
