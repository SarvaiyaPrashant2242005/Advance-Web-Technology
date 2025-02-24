const express = require("express");
const url = require("url");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let myUrl = url.parse(req.query.link);
  if (!myUrl.protocol || !myUrl.hostname) {
    res.json({ msg: "Invalid url" });
  } else {
    var short_code = Math.floor(Math.random() * 999999);
    var data = loadData();
    var key = Object.keys(data).find((k) => data[k] == myUrl.href);
    if (data[short_code]) {
      console.log(data[short_code]);
    } else if (key) {
      short_code = key;
    } else {
      data[short_code] = myUrl.href;
      saveData(data);
    }

    res.json({ code: short_code, url: myUrl.href });
  }
});
function loadData() {
  var data = fs.readFileSync("data.json");
  return JSON.parse(data);
}
function saveData(data) {
  fs.writeFileSync("data.json", JSON.stringify(data));
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
