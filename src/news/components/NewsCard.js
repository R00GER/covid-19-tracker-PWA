import React from "react";

import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";

import { bookmarkOutline, bookmark } from "ionicons/icons";
// import IS from "../../assets/is.png"

const NewsCard = (props) => {
  let source;

  return (
    <React.Fragment>
      {props.newsFeed.map((item) => {
        const date = item.date.toString();
        const displayDate = date.slice(0, 24);

        if (item.link.includes("iltalehti.fi")) {
          source = "Iltalehti";
        } else if (item.link.includes("is.fi")) {
          source = "IS";
        } else if (item.link.includes("hs.fi")) {
          source = "HS";
        } else if (item.link.includes("yle.fi")) {
          source = "YLE";
        } else {
          source = "Kaleva";
        }

        return (
          <IonCard
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="newscard"
            color="primary-contrast"
            key={item.link}
          >
            <div className="layer"></div>

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonCardHeader>
                    <IonCardSubtitle>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="news-auth-info">
                          <IonText color="light">
                            <strong>{source}</strong>
                          </IonText>
                          <IonText color="light">{` ${displayDate}`}</IonText>
                        </div>
                        <IonIcon
                          className="bookmark-icon"
                          size="large"
                          onClick={() => props.bookmarkNews(item)}
                          icon={
                            props.bookmarks.some(
                              (bookmarked) => bookmarked.link === item.link
                            )
                              ? bookmark
                              : bookmarkOutline
                          }
                        />
                      </div>
                    </IonCardSubtitle>
                    <IonCardTitle
                      onClick={() => window.open(`${item.link}`, `_blank`)}
                    >
                      <IonText color="light">{item.title}</IonText>
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonCardContent>
                    <IonText className="newscard-desc" color="light">
                      {item.desc}
                    </IonText>
                  </IonCardContent>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        );
      })}
    </React.Fragment>
  );
};

export default NewsCard;
