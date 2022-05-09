const Joi = require('joi');


const userSchema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
    password: Joi.string().min(8).required(),
    repeat_password: Joi.ref('password')
})
    .with('password', 'repeat_password');


//    const addSchema = Joi.object().keys({ address: [{
//         hNum: Joi.string().required(),
//         area: Joi.string().required(),
//         pinCode: Joi.number().min(6).max(6).required(),
//         state: Joi.string().min(3).max(15).required(),
//       }],
//     })

 module.exports = userSchema