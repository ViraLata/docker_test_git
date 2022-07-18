const express =  require('express');
const cors = require("cors");
const app = express();

var corsOptions = {
    origin: "http://localhost:4000"
  };
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use(require('./routes/index'));

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.listen(process.env.PORT||4000);

console.log('Server on port 4000');