require('dotenv').config();
const express = require ('express');
const connectDB=require('./config/db');

const app = express();
app.use(express.json());

app.get('./',(req,res)=>{
    res.json({message:"Todo API runnin"});
});

const PORT = process.env.PORT || 5000;

connectDB().then(()=>{
    app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
});