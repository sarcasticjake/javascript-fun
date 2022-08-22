const express = require('express');
const app = express();
const fs = require('fs');
app.listen(5555, () => console.log("listening on port http://localhost:" + 5555));
app.use(express.static('public'));
app.use(express.json());

app.post('/api', (req, res) => {
    console.log('Got a request')
    const data = req.body
    const timestamp = Date.now();
    const date = new Date(timestamp)
    data.Date = (date.getMonth()+1)+
    "/"+date.getDate()+
    "/"+date.getFullYear()+
    " "+date.getHours()+
    ":"+ String(date.getMinutes()).padStart(2, '0');

   writeNewNote(data);

    res.json({
        Status: 'Success',
        Note: data.Note,
        Date: data.Date
    })
});

app.get('/api', (req, res) => {
    const file = fs.readFileSync('database.json');
    res.json(JSON.parse(file));
});

function writeNewNote(jsonObj) {
    if (!fs.existsSync('database.json')) {
        //create new file if not exist
        fs.closeSync(fs.openSync('database.json', 'w'));
    }
    
    // read file
    const file = fs.readFileSync('database.json');
    
    //check if file is empty
    if (file.length == 0) {
        //add data to json file
        fs.writeFileSync("database.json", JSON.stringify([jsonObj]));
    } else {
        currentData = JSON.parse(file);
        
        currentData.push(jsonObj);
        
        console.log(currentData)

        fs.writeFileSync("database.json", JSON.stringify(currentData));
    }
}