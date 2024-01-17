import bcrypt from "bcrypt";
import Users from "../models/Users.js";

export const getSession = (req, res) =>{
    res.status(200).json("session information");
}

// export const getUsers = async (req, res) =>{
//     const list = await Users.find({});
//     return res.send(list);
// }

export const getJoin = (req, res) =>{
    return res.send("getJoin", );
}

export const postJoin = async (req, res) => {
    const {userId, password, username } = req.body;
    console.log(req.body);
    const isExists = await Users.exists({userId});
    // 이미 userId 가 존재하는 경우도 만들어 줘야함.
    if(isExists){
        console.log(`이미 존재하는 아이디.`);
        return res.status(400).json({error_message:"이미 존재하는 아이디입니다."});
    }
    // 아래는 else문
    try {
        await Users.create({
            username,
            userId,
            password
        });
        return console.log(`가입 완료!`);
    } catch (error){
        return console.log(`오류발견!`);
    }
    // return res.send("postJoin");
}

export const getLogin = (req, res) =>{
    return res.send("getLogin");
}

export const postLogin = async (req, res) => {
    const {userId, password} = req.body;
    // console.log(`req.body: `, req.body);

    const user = await Users.findOne({userId});
    // console.log(`user: `, user);
    if(!user){
        return res.status(400).json({error_message:"존재하지 않는 아이디입니다."})
    }

    const ok = await bcrypt.compare(password, user.password);
    // console.log(`ok: `, ok);
    if(!ok){
        return res.status(400).json({error_message:"비밀번호를 확인해주세요."})
    }

    req.session.loggedIn = true;
    req.session.user = user;

    if(user&&ok&&userId==="admin"){
        req.session.isAdmin = true;
        return res
            .status(200)
            // .setHeader('Access-Control-Allow-Origin', '*')
            .json({confirm_message:"관리자입니다."});
    }

    return res
        .status(200)
        .json({confirm_message:"환영합니다."});
}

export const successLogin = (req, res) =>{
    try {
        const data = req.session;
        console.log(`data입니다.~: `, data);
        console.log(`###end###`);
        return res.json(data);
    } catch (error) {
        res.status(403).json("User Not Found");
    }
}

export const postLogout = (req, res) => {
    req.session.destroy(()=>{
        res.status(200).json({message: "logout success"});
    });
}