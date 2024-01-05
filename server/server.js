import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "./db.js";
// import { getList, postList } from "./controllers/rootCtrl.js";
import rootRouter from "./routers/rootRouter.js";"./routers/rootRouter.js";
import placeRouter from "./routers/placeRouter.js";"./routers/placeRouter.js";

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", rootRouter);
app.use("/api/place", placeRouter);

// app.route(`/api/list`).get(getList).post(postList);

app.listen(port, ()=> console.log(`✅ Listening on port ${port}`));