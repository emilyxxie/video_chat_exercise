import "./style.css";
import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';

import { BrowserRouter as Router } from 'react-router-dom';

// const okta = new OktaSignIn({
//     baseUrl: process.env.OKTA_ORG_URL,
//     clientId: process.env.OKTA_CLIENT_ID,
//     authParams: {
//       issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
//       responseType: ["token", "id_token"],
//       display: "page"
//     }
// });

// console.log(okta);

// This line dictates for App Component to load into an HTML element with an
// ID, "root"
ReactDOM.render(<App />, document.getElementById("root"));