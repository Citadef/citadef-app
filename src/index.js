import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

/* CSS files */
import "./css/bootstrap.min.css"
import "./css/main.css";
import "./css/coloring.css";
/* end of CSS files */

import { create as createIPFS } from 'ipfs-core';


ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('wrapper')
);

