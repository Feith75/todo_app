require('dotenv').config();
const express = require ('express');
const connectDB=require('./config/db');
const taskRoutes=require('./routes/taskRoute');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/task',taskRoutes);
 

app.get('./',(req,res)=>{
    res.json({message:"Todo API runnin"});
});


const PORT = process.env.PORT || 5000;

connectDB().then(()=>{
    app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
});