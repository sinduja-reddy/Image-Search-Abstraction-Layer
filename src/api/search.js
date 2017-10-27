import express from 'express';

export const searchApi= express.Router();
let key= process.env.API_KEY;
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/images/search';
let https = require('https');
let body = '';


searchApi.get('/imagesearch/:query',(req,res)=>{
  let query=req.params.query;
  res.setHeader('Ocp-Apim-Subscription-Key' ,key);
      res.redirect('https://'+host+path+'?q=' + encodeURIComponent(query)); 
  });
let response_handler = function (response) {
    response.on('data', function (d) {
        body += d;
    });
    response.on('end', function () {
        console.log('\nRelevant Headers:\n');
        for (var header in response.headers)
            // header keys are lower-cased by Node.js
            if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
         body = JSON.stringify(JSON.parse(body), null, '  ');
});
    response.on('error', function (e) {
        console.log('Error: ' + e.message);
    });
};
let bing_web_search = function (search) {
  console.log('Searching the Web for: ' + search);
  let request_params = {
        method : 'GET',
        hostname : host,
        path : path + '?q=' + encodeURIComponent(search),
        headers : {
            'Ocp-Apim-Subscription-Key' : key,
        }
    };

    let req = https.request(request_params, response_handler);
    req.end();
}
searchApi.get('/api/latest/imagesearch',(req,res)=>{
  
});