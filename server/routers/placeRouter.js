import express from "express";
import { getPlace } from "../controllers/placeCtrl.js";

const placeRouter = express.Router();

placeRouter.get(`/:id`, getPlace);
// placeRouter.route

export default placeRouter;