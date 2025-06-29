const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

const app = express();
app.use(express.json());
app.use(require('cors')());

const jar = new CookieJar(); // контейнер для cookie
const client = wrapper(axios.create({ jar }));

app.post('/login', async (req, res) => {
  try {
    // 1. Отримуємо сесію через GET
    const initResponse = await client.get('https://cp.rfbanana.ru/gamecp_login.php');

    // Виводимо PHPSESSID, отриману від сервера
    const cookies = await jar.getCookies('https://cp.rfbanana.ru');
    console.log('🍪 Отримані cookies:', cookies.map(c => c.cookieString()).join('; '));

    // 2. Готуємо форму логіну
    const form = new FormData();
    form.append('username', 'sesile2');
    form.append('password', '9cc0c90d6');

    // 3. POST-запит на логін
    const loginResponse = await client.post('https://cp.rfbanana.ru/gamecp_login.php', form, {
      headers: form.getHeaders(),
    });

    console.log('✅ Відповідь при логіні (статус):', loginResponse.status);
    console.log('🧾 Частина HTML:', loginResponse.data.slice(0, 300));

    res.send(loginResponse.data); // Повертаємо HTML-код клієнту

  } catch (err) {
    console.error('❌ ПОМИЛКА:', err.message);
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Body:', err.response.data?.slice(0, 200));
      res.status(err.response.status).send(err.response.data);
    } else {
      res.status(500).send('Щось пішло не так');
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер працює на порту ${PORT}`);
});
