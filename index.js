const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World! This is your Express server.');
});

app.get('/openapi.yaml', (req, res) => {
    const filePath = path.join(__dirname, 'openapi.yaml');

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error sending the file.');
        } else {
            console.log('File sent: openapi.yaml');
        }
  });
});
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
