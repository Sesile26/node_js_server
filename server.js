const express = require('express');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  try {
    const form = new FormData();
    form.append('username', 'sesile2');
    form.append('password', '9cc0c90d6');

    const response = await axios.post('https://cp.rfbanana.ru/gamecp_login.php', form, {
      headers: {
        ...form.getHeaders(),
        Cookie: 'PHPSESSID=a4d73f74d2afd03263b5701e7b8ec9d0; gamecp_userdata=sesile2%7Cce8d59f2c0824f8cfc0d0506ac973a0394.231.189.11050dff86fa1b12576126812b915a1d514105277b6',
        'User-Agent': 'PostmanRuntime/7.44.1',
        Accept: '*/*',
      },
      maxRedirects: 0, // щоб бачити, куди редіректить (не обов’язково)
      validateStatus: null // щоб axios не кидав помилку при 302
    });

    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Body Start:', response.data);

    res.send(response.data);
  } catch (err) {
    console.error('❌ ПОМИЛКА при запиті:', err.message);
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Body:', err.response.data);
      res.status(err.response.status).send(err.response.data);
    } else {
      res.status(500).send('Щось пішло не так');
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер слухає порт ${PORT}`);
});
