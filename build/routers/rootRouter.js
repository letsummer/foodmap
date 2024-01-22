import express from "express";
import { getList, postList, getConfirm, postConfirm, reject } from "../controllers/rootCtrl.js";
import { getForm, postForm } from "../controllers/placeCtrl.js";
// import { checkAdminSession } from "../middlewares.js";

const rootRouter = express.Router();

// rootRouter.use(checkAdminSession);

rootRouter.route(`/list`).get(getList).post(postList);
rootRouter.route(`/confirm`).get(getConfirm).post(postConfirm).delete(reject);
rootRouter.post(`/reject`, reject);
rootRouter.route('/add').get(getForm).post(postForm);
export default rootRouter;