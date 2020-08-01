import React, { useState, useEffect } from "react";

import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonCard,
} from "@ionic/react";

import feedService from "../../services/feed";
import parserService from "../../services/parser";
import { feeds, conditions } from "../../constants/constants";

import NewsFeed from "../components/NewsFeed";

import "./News.css";
import "../../theme/variables.scss";

const News = (props) => {
  const [newsFeed, setNewsFeed] = useState([]);

  const updateNewsFeed = (updatedFeed) => {
    setNewsFeed(updatedFeed);
  };

  // fetch and parse RSS news feeds when component mounts
  useEffect(() => {
    const updateFeed = () => {
      feedService.getFeeds(feeds).then((responses) => {
        const ISFeed = parserService.parseFeed(responses[0]);
        const ILFeed = parserService.parseFeed(responses[1]);
        const YLEFeed = parserService.parseFeed(responses[2]);
        const HSFeed = parserService.parseFeed(responses[3]);
        const kalevaFeed = parserService.parseFeed(responses[4]);

        const allFeeds = [
          ...ISFeed,
          ...ILFeed,
          ...YLEFeed,
          ...HSFeed,
          ...kalevaFeed,
        ];

        filterFeeds(allFeeds);
      });
    };
    updateFeed();
    setInterval(updateFeed, 900000);
  }, []);

  // posting news items when newsfeed updates
  useEffect(() => {
    feedService.postNewsItems(newsFeed);
  }, [newsFeed]);

  const filterFeeds = (feeds) => {
    let filteredItems = [];

    // filter corona news
    feeds.forEach((item) => {
      const filtered = conditions.some(
        (condition) =>
          item.title.includes(condition) || item.desc.includes(condition)
      );

      if (filtered) {
        filteredItems.push(item);
      }
    });

    // filter duplicates by news item links
    const filteredUnique = [
      ...new Map(filteredItems.map((item) => [item["link"], item])).values(),
    ];

    // check local storage
    const localstorage = JSON.parse(localStorage.getItem("bookmarks"));
    const links = localstorage.map((item) => item.link);
    let newsFeedToSort;

    // filter bookmarked news from newsfeed
    const filterBookmarks = filteredUnique.filter((item) => {
      return links.some((link) => link !== item.link);
    });

    // choosing feed to continue
    filterBookmarks.length > 0
      ? (newsFeedToSort = [...filterBookmarks])
      : (newsFeedToSort = filteredUnique);

    // sorting newsfeed by date
    const sortedNewsFeed = newsFeedToSort.sort((a, b) =>
      a.date < b.date ? 1 : b.date < a.date ? -1 : 0
    );

    // set feed to state
    setNewsFeed([...sortedNewsFeed]);
  };


  return (
    <IonPage className="news-container">
      <IonContent>
        <IonGrid fixed>
          <IonCol>
            <IonRow>
              <IonCard className="card-container">
                <NewsFeed newsFeed={newsFeed} updateNewsFeed={updateNewsFeed} />
              </IonCard>
            </IonRow>
          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default News;
