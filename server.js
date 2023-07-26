//imports
const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const app = express();

//middleware
app.use(cors())
app.use(bodyparser.json())

//api
app.get('/numbers',(req,res)=>{
const api = req.query.url;
const arr = Object.values(api);
let numbers = [];

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.numbers;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};

const func = async (arr) => {
  try {
    const promises = arr.map(fetchData);
    const results = await Promise.all(promises);
    numbers = results.flat();

    numbers = [...new Set(numbers)].sort((a, b) => a - b);
    console.log(numbers);
    res.status(200).json(numbers);
  } catch (err) {
    console.error("Error processing data:", err);
    res.status(404).json(err)
  }
};

func(arr);


})

//listening
app.listen(3000,()=>console.log("Number Management Server started..."))
