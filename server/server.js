const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { serverCheck } = require('poll-server-check');

require('dotenv').config();

const app = express();
const PORT = 5000;

const todoRoutes = require('./routes/todoRoutes');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB not connected ',err));

app.use('/todos', todoRoutes);
serverCheck(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
