const { Customer, validateCustomer} = require('../models/customer');
const express = require('express'); 
// const morgan = require('morgan');
const router = express.Router();


router.get('/', async function(req, res){
    const customers = await Customer.find().sort('name');
    res.send(customers);
    });

router.post('/', async function(req, res){
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.phone,
    });

    customer  = await customer.save();
    res.send(customer);
}); 

router.put('/:id', async function(req, res){
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate( req.params.id,
        {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.phone,  
        }, 
        {new: true});

    if(!customer) return res.status(404).send('The customer with the given ID cannot be found');

    res.send(Customer);
});

router.delete('/:id', async function(req, res){
    const customer = await Customer.findByIdAndRemove(req.params.id)

    if (!customer) return res.status(404).send('The customer with the given ID cannot be found');
    
    res.send(customer);
});


module.exports = router;