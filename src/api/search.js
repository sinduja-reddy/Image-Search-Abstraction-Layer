import express from 'express';

export const searchApi= express.Router();
let key= process.env.API_KEY;
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/images/search';

searchApi.get('/imagesearch/:query',(req,res)=>{
  let query=req.params.query;
  
  });

searchApi.get('/api/latest/imagesearch',(req,res)=>{
  
});