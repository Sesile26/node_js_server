import express from "express";
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

const app = express();
app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const cookieJar = new CookieJar();
  const client = wrapper(axios.create({ jar: cookieJar, withCredentials: true }));

  try {
    const response = await client.post(
      "https://cp.rfbanana.ru/gamecp_login.php",
      new URLSearchParams({ username, password }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    res.send(response.data);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Login failed");
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
