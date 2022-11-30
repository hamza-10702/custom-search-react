const express = require("express");
const imageRouter = require('./routes/imageRouters')

const app = express();
app.use(express.json());



const port = 5000;



// connectDB();



app.use(imageRouter)

app.listen(port, () => {
  console.log(`Connection is ${port}`);
});
