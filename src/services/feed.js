import axios from "axios";

const url = "/api/newsfeed";
// const url = "http://localhost:8101/api/newsfeed";


const getFeeds = (feeds) => {
  const ISReq = axios.get(feeds.IS);
  const ILReq = axios.get(feeds.IL);
  const YLEReq = axios.get(feeds.YLE);
  const HSReq = axios.get(feeds.HS);
  const kalevaReq = axios.get(feeds.kaleva);

  return axios
    .all([ISReq, ILReq, YLEReq, HSReq, kalevaReq])
    .then(
      axios.spread((...responses) => {
        console.log(...responses);
        const ISRes = responses[0].data;
        const ILRes = responses[1].data;
        const YLERes = responses[2].data;
        const HSRes = responses[3].data;
        const kalevaRes = responses[4].data;

        return [ISRes, ILRes, YLERes, HSRes, kalevaRes];
      })
    )
    .catch((errors) => {
      console.log(`Errors retriving feeds : ${errors}` );
      
    });
};

const postNewsItems = (feed) => {  
  const request = axios.post(url, feed);
  return request.then((response) => response.data)
  .catch((err) => {
    console.log("error posting feed", err);
  })
  
};

const getNewsItemsDates = () => {
  const request = axios.get(url);
  return request.then((response) => response.data)
  .catch((err) => {
    console.log("error getting dates", err);
  })
}

export default { getFeeds, postNewsItems, getNewsItemsDates };
