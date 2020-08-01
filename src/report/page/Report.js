import React, { useState, useEffect } from "react";

import feedService from "../../services/feed";
import covidService from "../../services/covid";

import NewsChart from "../components/NewsChart";
import { IonPage, IonContent } from "@ionic/react";

const Report = () => {
  const [dates, setDates] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [covidData, setCovidData] = useState([]);

  useEffect(() => {
    // fecth news item dates from db
    feedService.getNewsItemsDates().then((response) => {
      setDates(dates.concat(response));
    });

    // fecth covid API
    covidService.getCases().then((response) => {
      setCovidData(covidData.concat(response));
    });
  }, []);

  // config newsdata after state updated
  useEffect(() => {
    configNewsData();
  }, [dates]);

  const configNewsData = () => {
    const shortDates = dates.map((date) => date.slice(5, 10));

    // get occurance of each value in array
    // object
    let countsObj = {};
    shortDates.forEach(
      (item) => (countsObj[item] = (countsObj[item] || 0) + 1)
    );

    // get covid data
    const covidData = configCovidData();

    // removing duplicate dates
    const uniqueDates = [...new Set(shortDates)];
    // counts objects values, returns array
    const counts = Object.values(countsObj);

    const data = [];

    // combine data to objects
    uniqueDates.forEach((item, i) => {
      // 23.7 (first record) 8 new confirmed cases and 1 death
      let obj = {
        name: item,
        news: counts[i],
        confirmed: covidData[i]
          ? covidData[i - 1]
            ? covidData[i].confirmed - covidData[i - 1].confirmed
            : 8
          : null,
        deaths: covidData[i]
          ? covidData[i - 1]
            ? covidData[i].deaths - covidData[i - 1].deaths
            : 1
          : null,
      };

      data.push(obj);
    });

    setChartData(data);
  };

  const configCovidData = () => {
    // filtering cases by date and setting data
    let filteredCovidData = covidData
      .map((item) => {
        let data;
        if (new Date(item.Date) > new Date("2020-07-23T00:00:00Z")) {
          data = {
            confirmed: item.Confirmed,
            deaths: item.Deaths,
            date: item.Date.slice(5, 10),
          };
        }
        return data;
      })
      .filter(Boolean); // filter false values

    return filteredCovidData;
  };

  return (
    <IonPage>
      <IonContent>
      <NewsChart chartData={chartData} />
      </IonContent>
    </IonPage>
  );
};

export default Report;
