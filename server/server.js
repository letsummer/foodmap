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


// app.use((req, res, next) => {
//     res.setHeader(
//       "Access-Control-Allow-Origin",
//       "https://foodmap-hdef.onrender.com"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     res.setHeader("Access-Control-Allow-Private-Network", true);
//     //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//     res.setHeader("Access-Control-Max-Age", 7200);
  
//     next();
//   });
// app.use(cors());
app.use(cors({
    origin : true,  //(Whatever your frontend url is) 
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
            // domain: `${process.env.SERVER_URL}`,
            // httpOnly: false,
            // sameSite: "none",
            // secure: true,
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