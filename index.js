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

// Serve up static assets
app.use(express.static(path.join(__dirname, './')));

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
  // const response = await mlbStats.getSchedule({ paramPath: { sportId: 1 } });
  const response = await mlbStats.getAttendance({ params: { teamId: 112 }});
  const result = await response.json();
  console.log(result);
  res.send('successfully called test ap');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
