import axios from "axios";
import PlaceModel from "../models/Place.js";
export const getList = async (req, res) => {
    const list = await PlaceModel.find({});
    return res.send(list);
}

export const postList = async (req, res) => {
    const {name, address, phone, coord, info } = req.body;
    console.log(req.body);
    try {
        await PlaceModel.create({
            name,
            address,
            phone,
            coord,
            info,
        });
        console.log(`데이터 생성 완료!`);
    } catch (error){
        return console.log(error);
    }
    return res.send("postList");
}

export const getConfirm = (req, res) => {
    return res.send("getConfirm");
}