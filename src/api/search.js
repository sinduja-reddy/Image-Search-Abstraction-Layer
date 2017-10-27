import express from 'express';
import { SearchHistory } from './searchHistory';

export const searchApi= express.Router();

let key= process.env.API_KEY;
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/images/search';
let https = require('https');
var request = require('request');

searchApi.post('/imagesearch/query',(req,res)=>{
  let query=req.body.query,
      timestamp = Date.now();  
  let queryHistory = new SearchHistory({ query, timestamp }); 
  queryHistory.save();
  
 request({
    url:'https://'+host+path+'?q=' + encodeURIComponent(query),
    headers:{'Ocp-Apim-Subscription-Key' : key}
  },function(err,response,body){
    let  myobj= JSON.parse(body);
   let result= myobj.value.map((d)=>{
    return{
      'url':d.webSearchUrl,
      'snippet':d.name,
      'thumbnail':d.thumbnailUrl,
      'context':d.contentUrl
    }
  });
  res.json(result);
 });
});

searchApi.get('/latest/imagesearch',(req,res)=>{
   SearchHistory
    .find() 
    .select({ _id: 0, query: 1, timestamp: 1 }) 
    .sort({ timestamp: -1 }) 
    .limit(10) 
    .then(results => {  
      res.status(200).json(results);
    });
});