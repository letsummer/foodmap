import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./db.js";
import rootRouter from "./routers/rootRouter.js";
import placeRouter from "./routers/placeRouter.js";
import userRouter from "./routers/userRouter.js";
import fileStore from "session-file-store";
import { localsMiddleware } from "./middlewares.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;
// const FileStore = fileStore(session);


app.use(cors({
    origin : `${process.env.CLIENT_URL}`,  //(Whatever your frontend url is) 
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            // maxAge: 20000,
        },
        store: MongoStore.create({mongoUrl:process.env.DB_URI}),
    })
);


// app.use("/", (req, res, next) =>{
//     console.log(`###req.session: `, req.session);
//     console.log(`###req.session.user: `, req.session.user);
//     // console.log(`###req.session.loggedIn: `, req.session);
//     console.log(`###req.sessionStore.all: `, req.sessionStore.all);
//     // console.log(`###req.sessionStore.all: `, req.sessionStore.all);

//     next();
// })

app.use("/api", rootRouter);
app.use("/api/place", placeRouter);
app.use("/api/users", userRouter);

app.get('*', function(req, res){
    res.send("404");
});

app.listen(port, ()=> console.log(`✅ Listening on port ${port}`));