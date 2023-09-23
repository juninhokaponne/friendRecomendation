const express = require('express');
const routes = require('./routes/routes');
const app = express();
app.use(express.json());
require('dotenv').config();

app.use(routes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000} `);
});
