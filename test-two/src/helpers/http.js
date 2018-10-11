import fetch from "node-fetch";

export const get = async url => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "request"
    }
  });

  const json = await response.json();

  if (response.status === 200) {

    return json;
  } else {
    throw Error(json.Message);
  }


};
