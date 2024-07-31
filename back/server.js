const express = require('express');
const cors = require('cors'); // Adicione esta linha
const app = express();
const port = 3000;

app.use(cors()); // Adicione esta linha para permitir CORS

app.use(express.json());

// Mock database
let lavagens = [];

// Rota para obter as lavagens
app.get('/lavagens', (req, res) => {
    res.json(lavagens);
});

// Rota para atualizar as lavagens
app.post('/lavagens', (req, res) => {
    const { id, status } = req.body;
    if (typeof id !== 'number' || typeof status !== 'boolean') {
        return res.status(400).json({ error: 'Dados inválidos' });
    }
    lavagens = lavagens.filter(l => l.id !== id);
    lavagens.push({ id, status });
    res.status(200).json({ success: true });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
