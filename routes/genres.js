const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Genre, validate} = require('../models/genre.js');

router.get('/', async (req, res) => {
    res.send(await Genre.find());
});

router.get('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send('Invalid Mongo ID');
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('No such genre with given id');
    res.send(genre);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = new Genre({
        "name": req.body.name
    });
    try {
        const result = await genre.save();
        res.send(result);
    } catch (ex) { console.log(ex.message) }
});
router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send('Invalid Mongo ID');
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name } }, { new: true });
    if (!genre) return res.status(404).send('No such genre with given id');
    res.send(genre);
});
router.delete('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send('Invalid Mongo ID');
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('No such genre with given id');
    res.send(genre);
});

module.exports = router;