const express = require('express');
const router = express.Router();
const Lavagem = require('../models/Lavagem');

router.get('/', async (req, res) => {
    const lavagens = await Lavagem.find();
    res.json(lavagens);
});

router.post('/', async (req, res) => {
    const { id, checked } = req.body;
    const lavagem = new Lavagem({ id, checked });
    await lavagem.save();
    res.json(lavagem);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { checked } = req.body;
    const lavagem = await Lavagem.findOneAndUpdate({ id }, { checked }, { new: true });
    res.json(lavagem);
});

module.exports = router;
