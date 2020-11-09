import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//following code parses url of dialog to extract required data including "data" parameter
const queryString = window.location.search.substring(1);
let params: any = {};
const queryStringParts = queryString.split("&");
for (let i = 0; i < queryStringParts.length; i++) {
  const pieces = queryStringParts[i].split("=");
  params[pieces[0].toLowerCase()] = pieces.length === 1 ? null : decodeURIComponent(pieces[1]);
}

//deserializing of the data parameter
const data = JSON.parse(params.data);

//rendering of application and passing parameters inside
ReactDOM.render(
  <App text={data.text}  StartDate={new Date(data.date)} EndDate={new Date(data.date) } />,
  document.getElementById('root')
);