const express = require('express');
const path = require('path');
const cors = require('cors');
const MLBStatsAPI = require('mlb-stats-api');

const app = express();
const port = 3000;

const mlbStats = new MLBStatsAPI();

const corsOptions = {
  origin: '*', // Allow requests from any origin
};

// Enable CORS middleware
app.use(cors(corsOptions));


// API's for ChatGPT manfifest
app.get('/.well-known/ai-plugin.json', (req, res) => {
  const filePath = path.join(__dirname, '.well-known/ai-plugin.json');

  console.log(filePath);


  res.sendFile(filePath, (err) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error sending the file.');
      } else {
          console.log('File sent: ai-plugin.json');
      }
  });

});

app.get('/openapi.yaml', (req, res) => {
    const filePath = path.join(__dirname, '.well-known/openapi.yaml');

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error sending the file.');
        } else {
            console.log('File sent: openapi.yaml');
        }
  });
});
  

// API's for ChatGPT
app.get('/baseball_scores', (req, res) => {
  console.log(req.query.team);
  res.json({
    status: 'success',
    data: {
      score: 9
    },
    error: null
  });
})

app.get('/test_mlb_stats', async (req, res) => {
  const response = await mlbStats.getSchedule({ params: { sportId: 1 } });
  const result = await response.json();
  console.log(result);
  res.send('successfully called test ap');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
