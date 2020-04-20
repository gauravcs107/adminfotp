const firebase = require('firebase-admin');

// Base 64 encoded Firebase service account credentials JSON
// NOTE: This should be an environment variable.
const FIREBASE_SERVICE_ACCOUNT_CREDENTIALS = 'ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAidnpzaS1mZXAtZmxhZy1vbi10aGUtcGxheSIsCiAgInByaXZhdGVfa2V5X2lkIjogIjUxZjE1ZGUxMzRmNjc1ZGRjNDE5YTBhMzM3MDJkNDEyNmNhY2FhNzEiLAogICJwcml2YXRlX2tleSI6ICItLS0tLUJFR0lOIFBSSVZBVEUgS0VZLS0tLS1cbk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRQzFUbXpWL3pPMEcvV1Jcbk1LeUthR2xMSGhXTnJySnEyd1d3U0ZCT0UwUmMrNnJ0UkNxZUJkMmgrckpjazIrM0tJQ0ZQM3dqcU9qa0NPYWVcbjR0VHNELzQydkZGWXRIVGZuTThQRkh3bElpOFc4bERyaldheGVQcUVJQWhtRTJzTU5iRG1XeUdMMW93ZGxXSVlcblpVUHN4WG5BSnc4UUFLODZLV2JHWlVleUhKVmtwNEFsWk54WmpMTHluUVZHOVgxV1pFWWsrUEZWc3V4Sm9uUGhcbngzRFljR3ptM3FNclV2ZTYvQi9udURja21PcEpmMVFHRytoZzQxeEhZWmE0VWROcmRRSVJqTDFzbUJxM05uc1JcbkJ3MlFycldkUzFhNlRpTzBuZk9ZSEVpeGU0QkxhUExFVGg1bXV3M2JQQ1IrTVJQKzg4UzRxalAxTFJxTWJYOGNcbkl2ZStUN0h2QWdNQkFBRUNnZ0VBQm40dmdaNXBFSnNydVM1Z0QzamJ4SGZvVjdHWTdDQzUzRzFLaXZFL3NvREVcbngwaDRxajRWaU5aOGlyb3c5d001VHd4Titzenl3aS9iYW5jL0h0RVh6b2dCOWNaSXBUVnRhT0hYN0ZDRUZUTktcbldKVXd4MHhJMUhCOVBJS1hnOUZzYTJONkdSTHU0NlJVNWdEQ1pQbFJlZU1zTSt1Q1d2ZmVtVjVKS2dUQ0NOK3pcblQ2Z1VWNFh6ZFJ6cWNBcThRS1gwTGVEUjFQbytrcFdNcU44Q1FxblAzS0EwM0p3YmhLQk1zbkM4SFVGQXk2cTVcbjBHQy9IWVowSjE3aXBhU0xSSlNwdFNjcEtMbUQxOWpxVEpWbzE4WFBQVDZoOEkrbVBlWTlSNmFCckRIWFlNYkRcbldyVjNxenZwM2svWjJvT3NjdUNSako4cVlKdGFmQlJZV2J6akdicXRlUUtCZ1FEajF1UkZUa3djVFd5WG56cFRcbndqdHQ1YlM2ZGZ3VWlKTXphS1g4M1NnYjIvWXVaYnVlcWE3aGU4NXVJck8wZUdoWWVLc2VWZG1qeVRnSk5wekxcbkFXL0ZGak4rR2ZCTlo5akVkSDZwOTFwOEFmcElUdjdEWjhUMEZyalZVeFo3bFRkTWNMSWoxTFVFcXFTYWRkZ29cblpNQVR3aUo4eFB3SGo4VmlwZzRZSnpkTVZRS0JnUURMdHl3T2hsM1NvVGpFWC9ETG4zc2JQTjN1NS83aHN0M1FcbmFDYXNvS0lIUW9kdlZvNUgzTnM1aXFBWlNieHBGMGNJVFpJQTROOXZOcHJGWjU0SEYzVTZLbnZLVENXQkJ0dDJcbkYrM0lYV0FjNmZsVzd1WmJxTDdvMUdzTStzQ3dPRTQybFBjRCs4TmhNR2VIS0NQTis1cTRrOWtWLythUTBCQTdcbk5pTXVEcXFKTXdLQmdHcFB0eXZ2b093RDVJdkxMSGd3eFhJK0lOcHdlek5KbHdZQjZwSFcwQVJQMnN0RGhRdy9cbnVPNVZ5cmp4VUZFQmJnNzZIejZFYUkxWU11RjVyaWU3ZjkvQ3dEd3k5a0hvRnVsMFFqWWt5UC9jSEdEcEcwOHFcbmVHZzh3Zm9vVHZGVGF2NHNCN05ZYVM3SVFRNGh0cjhDWSszVVJDdGI3dzNJTkI0WHhiUFhlS0lSQW9HQVlvaUhcbm04THNFSndBakNObm9lWFNzcnIvRWJaTzl6WC95ZlVHZDhyK2RBcCszYUI5RTA5RkRoRDZIU0VvSzZDaHIrZHRcbkxsV1dYUUdKWE9BZ2RJZXBJT2c1bGdDOHh5cmM3Y0xuTlZuTXlrOTFWZEladzgzY0FWdjFKNE1Gdm5hTmhpTUpcblUzanI2TTl6MDlEYmVKOHhHQVFUSld2d1JxME1uTWN6dnV4REdqY0NnWUVBbHJJb2QvNU9SQ1owcVdkTmJwYzdcbnA4TzdBVkZlTm9KWG83T1R5ZkNSRmVuN2crY25DcnArdW9pdDVTSm5qOGZDSkpuRFJub2ZzaUQwYzdVK2lhYTRcblBzZVJZaWVwWERmRmMwcmE1Wk15bUdBMUV1YTU5VE1sYWlXc3JUc2lMc1g2QkozbzI1THMxWWwyR0hIZnl4VFlcbjc1VXBtRGVONkFWcGVaakl5ZzJQZ1Y0PVxuLS0tLS1FTkQgUFJJVkFURSBLRVktLS0tLVxuIiwKICAiY2xpZW50X2VtYWlsIjogImZpcmViYXNlLWFkbWluc2RrLW93d3NiQHZ6c2ktZmVwLWZsYWctb24tdGhlLXBsYXkuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLAogICJjbGllbnRfaWQiOiAiMTE1NDc4MDcyMzc4NzI0NjI2OTM4IiwKICAiYXV0aF91cmkiOiAiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgiLAogICJ0b2tlbl91cmkiOiAiaHR0cHM6Ly9vYXV0aDIuZ29vZ2xlYXBpcy5jb20vdG9rZW4iLAogICJhdXRoX3Byb3ZpZGVyX3g1MDlfY2VydF91cmwiOiAiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL2NlcnRzIiwKICAiY2xpZW50X3g1MDlfY2VydF91cmwiOiAiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vcm9ib3QvdjEvbWV0YWRhdGEveDUwOS9maXJlYmFzZS1hZG1pbnNkay1vd3dzYiU0MHZ6c2ktZmVwLWZsYWctb24tdGhlLXBsYXkuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iCn0K';

if (FIREBASE_SERVICE_ACCOUNT_CREDENTIALS) {
  const credentials = FIREBASE_SERVICE_ACCOUNT_CREDENTIALS
    ? JSON.parse(Buffer.from(FIREBASE_SERVICE_ACCOUNT_CREDENTIALS, 'base64').toString('utf8'))
    : {};
  firebase.initializeApp({ credential: firebase.credential.cert(credentials) });
} else {
  console.error('No Firebase credentials');
}

async function sendPushNotification(message) {
  try {
    const response = await firebase.messaging().send({
      ...message,
      topic: 'flag-on-the-play',
    });
    console.log('Sent push notification:', response);
  } catch (e) {
    console.error('Failed to send push notification:', e);
    throw e;
  }
}

async function sendThrowFlagNotification(foul) {
  await sendPushNotification({
    notification: {
      title: 'A call has been made!',
      body: 'The referee has made a call. Throw your flag now!',
    },
    data: {
      event: foul,
    },
    android: {
      notification: {
        sound: 'default',
      },
    },
    apns: {
      payload: {
        aps: {
          sound: 'default',
        },
      },
    },
  });
}

module.exports = {
  sendThrowFlagNotification,sendPushNotification
};
