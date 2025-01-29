const express = require('express');
const fs = require('fs'); // ✅ Import the fs module

const app = express();
const port = 3001;

app.get('/reed', async (req, res) => {
        await fs.readFile("data.json",(err,data) => {
            if(err) throw err;
            console.log(JSON.parse(data));
        });
        console.log("AFter FILE READ");
        res.send("");
  
});

app.listen(port, () => 
    console.log(`Server started on http://localhost:${port}!`)
);
