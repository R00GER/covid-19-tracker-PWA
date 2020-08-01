import React, { useState, useEffect, useContext } from "react";


import BookmarkedNewsCard from "./BookmarkedNewsCard";
import NewsCard from "./NewsCard";

const NewsFeed = (props) => {
  const [bookmarks, setBookmarks] = useState([]);

  // getting bookmarks from local storage when component mounts
  useEffect(() => {
    const existingBookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    if (existingBookmarks) {
      // formatting existing bookmarks dates for sorting
      existingBookmarks.forEach((item) => (item.date = new Date(item.date)));
      setBookmarks(existingBookmarks);
    }
  }, []);

  // updating local storage when bookmarks updates
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const bookmarkNews = (item) => {
    // check if item is bookmarked
    let links, bookmarked;

    if (bookmarks) {
      links = bookmarks.map((bookmark) => bookmark.link);
      bookmarked = links.includes(item.link);
    }

    if (!bookmarked) {
      // add to bookmarks
      const filter = props.newsFeed.filter(
        (newsFeedItem) => newsFeedItem.link !== item.link
      );
      const sortedNewsFeed = filter.sort((a, b) =>
        a.date < b.date ? 1 : b.date < a.date ? -1 : 0
      );

      props.updateNewsFeed([...sortedNewsFeed])

      setBookmarks([item, ...bookmarks]);
    } else {
      // remove from bookmarks
      const filterBookmark = bookmarks.filter(
        (bookmarks) => bookmarks.link !== item.link
      );

      setBookmarks([...filterBookmark]);

      const newsFeedToSort = [...props.newsFeed, item];
      const sortedNewsFeed = newsFeedToSort.sort((a, b) =>
        a.date < b.date ? 1 : b.date < a.date ? -1 : 0
      );
  
      props.updateNewsFeed([...sortedNewsFeed])
    }
  };

  return (
    <React.Fragment>
      <BookmarkedNewsCard
        newsFeed={props.newsFeed}
        bookmarks={bookmarks}
        bookmarkNews={bookmarkNews}
      />
      <NewsCard
        newsFeed={props.newsFeed}
        bookmarks={bookmarks}
        bookmarkNews={bookmarkNews}
      />
    </React.Fragment>
  );
};

export default NewsFeed;
