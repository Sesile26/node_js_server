import express from 'express';
import axios from 'axios';
import FormData from 'form-data';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

app.post('/login', async (req, res) => {
  try {
    const initResponse = await client.get('https://cp.rfbanana.ru/gamecp_login.php');

    const cookies = await jar.getCookies('https://cp.rfbanana.ru');
    console.log('🍪 Cookies:', cookies.map(c => c.cookieString()).join('; '));

    const form = new FormData();
    form.append('username', 'sesile2');
    form.append('password', '9cc0c90d6');

    const loginResponse = await client.post('https://cp.rfbanana.ru/gamecp_login.php', form, {
      headers: form.getHeaders(),
    });

    res.send(loginResponse.data);

  } catch (err) {
    console.error(err);
    res.status(500).send('Login failed');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
