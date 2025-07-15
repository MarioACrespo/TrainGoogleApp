const express = require("express");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const app = express();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors());
app.use(express.json());

app.post("/verify", async (req, res) => {
  const token = req.body.credential;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log("Payload:", payload);
    res.status(200).json({ user: payload });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(400).json({ error: "Invalid token" });
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));
