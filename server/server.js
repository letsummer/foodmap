import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "./db.js";
import { getPlace } from "./controllers/placeCtrl.js";

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.route(`/api/list`).get(getPlace);

app.listen(port, ()=> console.log(`✅ Listening on port ${port}`));