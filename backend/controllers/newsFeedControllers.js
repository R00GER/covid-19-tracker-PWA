const NewsItemModel = require("../models/NewsItemModel");
var async = require("async");

const saveNewsItems = (req, res) => {
  const feed = req.body;

  async.forEach(feed, (item, i) => {
    const newsItem = new NewsItemModel({
      title: item.title,
      desc: item.desc,
      date: item.date,
      link: item.link,
    });
    
    NewsItemModel.find({ link: item.link }, (err, docs) => {
      if (!err) {
        if (docs.length) {
          // return console.log('already in db', docs);
          return;

        } else {            
          newsItem.save((err) => {
            console.log("saved to db", newsItem.title);
          });
        }
      } else {
          console.log("error saving to db");
      }
    });
  });
};

const getNewsItems = (req, res) => {
  NewsItemModel.find({date: {$gte: new Date("2020-7-23")}}, (err, docs) => {
    if (!err) {
      const dates = docs.map((doc) => doc.date).filter(Boolean)
      res.send(dates);
    } else {
      console.log(`Error retriving from database : ${err}`);
    }
  })
}

exports.saveNewsItems = saveNewsItems;
exports.getNewsItems = getNewsItems;

