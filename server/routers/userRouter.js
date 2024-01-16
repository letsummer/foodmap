import express from "express";
// import { getSession, getUsers, getJoin, postJoin, getLogin, postLogin, successLogin, postLogout } from "../controllers/userCtrl.js";
import { getSession, getJoin, postJoin, getLogin, postLogin, successLogin, postLogout } from "../controllers/userCtrl.js";

const userRouter = express.Router();


// userRouter.get('/', getUsers);
userRouter.get('/session', getSession);
userRouter.route('/join').get(getJoin).post(postJoin);
userRouter.route('/login').get(getLogin).post(postLogin);
userRouter.post('/logout', postLogout);
userRouter.get('/login/success', successLogin);

export default userRouter;
