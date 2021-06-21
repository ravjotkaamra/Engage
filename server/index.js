require('dotenv').config();
const express = require('express');
const Agora = require('agora-access-token');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Agora Auth Token Server'));

app.post('/api/rtctoken', (req, res) => {
  const appID = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const expirationTimeInSeconds = 3600;
  const uid = Math.floor(Math.random() * 100000);
  const role = req.body.isPublisher
    ? Agora.RtcRole.PUBLISHER
    : Agora.RtcRole.SUBSCRIBER;
  const channel = req.body.channel;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;

  const token = Agora.RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channel,
    uid,
    role,
    expirationTimestamp
  );
  res.send({ uid, token });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Agora Auth Token Server listening at Port ${PORT}`)
);
