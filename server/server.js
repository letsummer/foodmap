import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import session from "express-session";
import "./db.js";
// import { getList, postList } from "./controllers/rootCtrl.js";
import rootRouter from "./routers/rootRouter.js";"./routers/rootRouter.js";
import placeRouter from "./routers/placeRouter.js";"./routers/placeRouter.js";

const app = express();
const port = process.env.PORT || 5000;

// app.use(session({
//     secret: "Hello!",
//     // resave: false,
//     saveUninitialized: false,
//     cookie:{
//         expires : new Date(Date.now() + 86400e3)
//     },
//     // store: MongoStore.create({mongoUrl: process.env.DB_URI}), 
//     })
// );

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", rootRouter);
app.use("/api/place", placeRouter);

app.get('*', function(req, res){
    res.send("404");
});

app.listen(port, ()=> console.log(`✅ Listening on port ${port}`));