const express = require('express');
const axios = require('axios');
const cors = require('cors');
const FormData = require('form-data');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.post('/login', async (req, res) => {
  try {
    const form = new FormData();
    form.append('username', 'sesile2');
    form.append('password', '9cc0c90d6');

    const response = await axios.post(
      'https://cp.rfbanana.ru/gamecp_login.php',
      form,
      {
        headers: form.getHeaders(),
        withCredentials: true,
      }
    );

    res.send(response.data);
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).send('Login failed');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
