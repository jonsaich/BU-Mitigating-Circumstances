import config from './config';

export function getFromAPI(url, callback) {
  fetch(config.apiUrl + url, {
    credentials: 'include',
    mode: "cors"
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((responseJson) => {
      console.log(responseJson);

      callback(responseJson, null)
    })
    .catch((error) => {
      alert('We have a problem getting the response from the API ERROR: ' + error)
      callback(null, error)
    });
}

export function putToAPI(url = ``, data = {}, callback) {
  // Default options are marked with *

  var normalPost = {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    headers: {
      // "Content-Type": "application/x-www-form-urlencoded",
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }
  return fetch(config.apiUrl + url, normalPost)
    .then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    }).then(function (data) {
      callback(data);
      console.log(data);
    }).catch((error) => {
      alert('We have a problem getting the response from the API. ERROR: ' + error)
    });
}

export function postToAPI(url = ``, data = {}, fileUpload, callback) {
  // Default options are marked with *

  var imgUpload = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    credentials: 'include',
    body: (fileUpload == true ? data : JSON.stringify(data)), // body data type must match "Content-Type" header
  }

  var normalPost = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    headers: {
      "Content-Type": (fileUpload == true ? undefined : "application/json"),
      // "Content-Type": "application/x-www-form-urlencoded",
      "Content-Type": (fileUpload == true ? undefined : "application/json"),
    },
    credentials: 'include',
    body: (fileUpload == true ? data : JSON.stringify(data)), // body data type must match "Content-Type" header
  }
  return fetch(config.apiUrl + url, ((fileUpload == true ? imgUpload : normalPost)))
    .then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    }).then(function (data) {
      callback(data);
      console.log(data);
    }).catch((error) => {
      alert('We have a problem getting the response from the API. ERROR: ' + error)
    });
}
