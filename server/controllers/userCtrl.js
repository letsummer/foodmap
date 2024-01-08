import bcrypt from "bcrypt";
import Users from "../models/Users.js";

export const getLogin = (req, res) =>{
    return res.send("getLogin");
}

export const postLogin = (req, res) => {
    return res.send("postLogin");
}