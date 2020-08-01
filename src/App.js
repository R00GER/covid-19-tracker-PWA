import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router";
import { useLocation } from "react-router-dom";

import { barChartOutline, newspaperOutline } from "ionicons/icons";
import {
  IonApp,
  IonContent,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";

import feedService from "./services/feed";
import parserService from "./services/parser";
import { feeds, conditions } from "./constants/constants";

import Header from "./components/Header";
import News from "./news/page/News";
import Report from "./report/page/Report";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";
import "./App.css";

const App = (props) => {
  const [newsFeed, setNewsFeed] = useState([]);

  const location = useLocation();

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
    <IonApp>
      <Header location={location.pathname}/>
      <IonContent>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/news">
              <News />
            </Route>
            <Route path="/report">
              <Report />
            </Route>
            <Route path="/" exact render={() => <Redirect to="/news" />} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom" className="tabs">
            <IonTabButton tab="news" href="/news">
              <IonIcon className="tab-icons" size="large" icon={newspaperOutline} />
              <IonLabel>News</IonLabel>
            </IonTabButton>
            <IonTabButton tab="report" href="/report">
              <IonIcon className="tab-icons" size="large" icon={barChartOutline} />
              <IonLabel>Report</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonContent>
    </IonApp>
  );
};

export default App;
