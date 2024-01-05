import express from "express";
import { getList, postList, getConfirm } from "../controllers/rootCtrl.js";
import { getForm, postForm } from "../controllers/placeCtrl.js";

const rootRouter = express.Router();

rootRouter.route(`/list`).get(getList).post(postList);
rootRouter.get(`/confirm`, getConfirm);
rootRouter.route('/add').get(getForm).post(postForm);


export default rootRouter;