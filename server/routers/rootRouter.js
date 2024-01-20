import express from "express";
import { getList, postList, getConfirm, postConfirm } from "../controllers/rootCtrl.js";
import { getForm, postForm } from "../controllers/placeCtrl.js";
// import { checkAdminSession } from "../middlewares.js";

const rootRouter = express.Router();

// rootRouter.use(checkAdminSession);

rootRouter.route(`/list`).get(getList).post(postList);
rootRouter.route(`/confirm`).get(getConfirm).post(postConfirm);
rootRouter.route('/add').get(getForm).post(postForm);


export default rootRouter;