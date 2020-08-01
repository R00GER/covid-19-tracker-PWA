// import React from "react";

// import { Redirect, Route, Link } from "react-router-dom";

// import {
//   IonApp,
//   IonIcon,
//   IonLabel,
//   IonRouterOutlet,
//   // IonRouterLink,
//   IonTabBar,
//   IonTabButton,
//   IonTabs,
//   IonContent,
// } from "@ionic/react";

// import { barChartOutline, newspaperOutline } from "ionicons/icons";

// import News from "../news/page/News";
// import Report from "../report/page/Report";
// import { FeedContext } from "../App";

// const Navigation = (props) => {
//   console.log(props.newsFeed);
//   // if window width is less or equal to 990px tabs are not returned
//   if (props.windowWidth <= 990) {
//     return (
//       <IonTabs>
//         <IonRouterOutlet>
//           <FeedContext.Provider value={[props.newsFeed, props.setNewsFeed]}>
//             <Route path="/news" component={News}/>
//             <Route path="/report" component={Report} />
//             <Route path="/" exact={true} render={() => <Redirect to="/news" />} />
//           </FeedContext.Provider>
//         </IonRouterOutlet>
//         <IonTabBar slot="bottom" className="tabs">
//           <IonTabButton tab="news" href="/news">
//             <IonIcon size="large" icon={newspaperOutline} />
//             <IonLabel>News</IonLabel>
//           </IonTabButton>
//           <IonTabButton tab="report" href="/report">
//             <IonIcon size="large" icon={barChartOutline} />
//             <IonLabel>Report</IonLabel>
//           </IonTabButton>
//         </IonTabBar>
//       </IonTabs>
//     );
//   } else {
//     return (
//       <FeedContext.Provider value={[props.newsFeed, props.setNewsFeed]}>
//         <Route path="/" component={News} exact={true} />
//         <Route path="/report" component={Report} exact={true} />
//         <Route path="/" render={() => <Redirect to="/" />} exact={true} />
//       </FeedContext.Provider>
//     );
//   }
// };

// export default Navigation;
