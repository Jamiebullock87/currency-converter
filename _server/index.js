// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5174;
// rolled a simple back end so the api key isnt exposed to the backend
const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.json());

app.get('/api/currencies', async (req, res) => {

  try {
    const response = await fetch(`https://api.currencybeacon.com/v1/currencies?api_key=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'error fetching currencies' });
  }
});

app.post('/api/convert', async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        const url = new URL('https://api.currencybeacon.com/v1/convert');
        url.searchParams.set('api_key', apiKey ?? '');
        url.searchParams.set('from', from);
        url.searchParams.set('to', to);
        url.searchParams.set('amount', String(amount));

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        res.json(data);
    } catch (err) {
        res.status(500).json({error: 'error converting currency'});
    }
})

app.listen(PORT, () => {
  console.log(`api running on http://localhost:${PORT}`);
});
