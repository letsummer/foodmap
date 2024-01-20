import express from "express";
import { getPlace, getEdit, postEdit, getDelete, postDelete } from "../controllers/placeCtrl.js";

const placeRouter = express.Router();

placeRouter.get(`/:id`, getPlace);
placeRouter.route(`/:id/edit`).get(getEdit).post(postEdit);
placeRouter.route(`/:id/delete`).get(getDelete).post(postDelete);
// placeRouter.route

export default placeRouter;