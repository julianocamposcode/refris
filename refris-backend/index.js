const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/refris', { useNewUrlParser: true, useUnifiedTopology: true });

const lavagemSchema = new mongoose.Schema({
    id: Number,
    checked: Boolean
});

const Lavagem = mongoose.model('Lavagem', lavagemSchema);

app.get('/lavagens', async (req, res) => {
    const lavagens = await Lavagem.find();
    res.json(lavagens);
});

app.post('/lavagens', async (req, res) => {
    const { id, checked } = req.body;
    const lavagem = new Lavagem({ id, checked });
    await lavagem.save();
    res.json(lavagem);
});

app.put('/lavagens/:id', async (req, res) => {
    const { id } = req.params;
    const { checked } = req.body;
    const lavagem = await Lavagem.findOneAndUpdate({ id }, { checked }, { new: true });
    res.json(lavagem);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
