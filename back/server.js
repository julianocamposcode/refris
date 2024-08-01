const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const dataFilePath = path.join(__dirname, 'lavagens.json');

app.use(cors());
app.use(express.json());

// Função para ler dados do arquivo
const readData = async () => {
    try {
        const data = await fs.readJson(dataFilePath);
        return data;
    } catch (err) {
        // Se o arquivo não existir, retorna uma lista vazia
        return [];
    }
};

// Função para salvar dados no arquivo
const saveData = async (data) => {
    try {
        await fs.writeJson(dataFilePath, data);
    } catch (err) {
        console.error('Erro ao salvar dados:', err);
    }
};

// Rota para obter as lavagens
app.get('/lavagens', async (req, res) => {
    const lavagens = await readData();
    res.json(lavagens);
});

// Rota para atualizar as lavagens
app.post('/lavagens', async (req, res) => {
    const { id, status } = req.body;
    if (typeof id !== 'number' || typeof status !== 'boolean') {
        return res.status(400).json({ error: 'Dados inválidos' });
    }

    let lavagens = await readData();
    lavagens = lavagens.filter(l => l.id !== id);
    lavagens.push({ id, status });

    await saveData(lavagens);
    res.status(200).json({ success: true });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
