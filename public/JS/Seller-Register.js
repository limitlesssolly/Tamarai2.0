const express=require('express');
const seller = express();
seller.get('/',(req,res)=>{
    res.send("welcome to tamarai");
});
seller.listen(4000,()=>{
 console.log("listining to port no 4000");
});
 