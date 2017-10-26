import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

import { searchApi } from './api/search'
 
const mongodb = process.env.MLAB_URI;

mongooseInit(mongodb); 
 
export const app = express(); // Create express app
 
 
/* Mongoose initialization function */
function mongooseInit(mongodb) {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongodb);
}
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile( path.join(__dirname ,'../views','index.html'))
});
app.use('/api', searchApi);