const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Customer, validate} = require('../models/customer.js');


router.get('/', async (req, res) => {
    res.send(await Customer.find());
});

router.get('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send('Invalid Mongo ID');
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('No such Customer with given id');
    res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = new Customer({
        "name": req.body.name,
        "isGold": req.body.isGold,
        "phone": req.body.phone
    });
    try {
        const result = await customer.save();
        res.send(result);
    } catch (ex) { console.log(ex.message) }
});

router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send('Invalid Mongo ID');
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }
    }, { new: true });
    if (!customer) return res.status(404).send('No such Customer with given id');
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send('Invalid Mongo ID');
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('No such Customer with given id');
    res.send(customer);
});
















module.exports = router;