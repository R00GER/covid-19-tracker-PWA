const express = require('express');
const mongoose = require('mongoose');
const path = require("path")

const bodyParser = require('body-parser');

const cors = require("cors");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const newsFeedRoutes = require('./routes/newsFeedRoutes')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/api/newsfeed', newsFeedRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static('build'))
    app.use('*', express.static(path.join(__dirname, "build", 'index.html')))
}

const port = process.env.PORT || 8101;
const db_user = process.env.MONGO_USER
const db_password = process.env.MONGO_PASSWORD

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${db_user}:${db_password}@cluster0.pikx3.mongodb.net/covid-news?retryWrites=true&w=majority`,
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => {
    console.log("connected");
    app.listen(port, () => console.log(`Server running on port ${port}`));  
})
.catch(err => {
    console.log(`Error while connecting to database : ${err}`);
    
})