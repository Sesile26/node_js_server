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
    const formData = new URLSearchParams();
    formData.append('username', 'sesile2');
    formData.append('password', '9cc0c90d6');

    const response = await axios.post('https://cp.rfbanana.ru/gamecp_login.php', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: 'PHPSESSID=...; gamecp_userdata=...', // якщо потрібно
      },
    });

    console.log('✅ ВІДПОВІДЬ ВІД rfbanana.ru');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Body:', response.data); // <-- це HTML або текст

    res.send(response.data); // передай це клієнту
  } catch (err) {
    console.error('❌ ПОМИЛКА при логіні:', err.message);
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Body:', err.response.data);
    }
    res.status(500).send('Помилка логіну');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
