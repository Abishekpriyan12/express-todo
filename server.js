const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const dbConfig = require('./config/database.config');

// MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.use(bodyParser.json());
app.use(cors());

// Default route
app.get('/', (req, res) => {
    res.json({ "message": "Hello Crud Node Express" });
});

// Routes
app.use('/todos', require('./app/routes/todoRoutes'));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
