import express from "express";
import { getList, postList, deleteList, getConfirm, postConfirm } from "../controllers/rootCtrl.js";
import { getForm, postForm } from "../controllers/placeCtrl.js";
const rootRouter = express.Router();
rootRouter.route(`/list`).get(getList).post(postList).delete(deleteList);
rootRouter.route(`/confirm`).get(getConfirm).post(postConfirm);
rootRouter.route('/add').get(getForm).post(postForm);
export default rootRouter;