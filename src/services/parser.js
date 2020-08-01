const parseString = require("xml2js").parseString;

const parseFeed = (data) => {
  const newsItems = [];

  // passing feed to parser
  parseString(data, (err, result) => {    
    // result
    const items = result.rss.channel[0].item;

    items.forEach((item) => {
      const newsItem = {
        title: item.title.toString(),
        desc: item.description.toString(),
        date: new Date(item.pubDate),
        link: item.link.toString(),
        img: item.enclosure ?  item.enclosure[0].$.url : null
      };
      
      newsItems.push(newsItem);
    });
  });

  return newsItems;
};

export default { parseFeed };
