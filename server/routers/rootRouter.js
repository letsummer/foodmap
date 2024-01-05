import express from "express";
import { getList, getConfirm } from "../controllers/rootCtrl.js";
import { getForm, postForm } from "../controllers/placeCtrl.js";

const rootRouter = express.Router();

rootRouter.get(`/list`, getList);
rootRouter.get(`/confirm`, getConfirm);
rootRouter.route('/add').get(getForm).post(postForm);


export default rootRouter;