import axios from "axios";
import PlaceModel from "../models/Place.js";
import PrePlaceModel from "../models/Request.js";

export const getList = async (req, res) => {
    const list = await PlaceModel.find({});
    return res.send(list);
}

export const postList = async (req, res) => {
    const preData = await PrePlaceModel.deleteOne({_id: req.body._id});
    // console.log(`predata: `, preData);

    const id = req.body._id;
    // console.log(`id: `, id);
    const {name, category, address, phone, coord, info } = req.body;
    console.log(req.body);
    try {
        await PlaceModel.create({
            // _id: id,
            name,
            category,
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

export const getConfirm = async (req, res) => {
    const list = await PrePlaceModel.find({});
    return res.send(list);
    // return res.send("getConfirm");
}

export const postConfirm = async (req, res) => {
    const {name, category, address, phone, coord, info } = req.body;
    console.log(req.body);
    try {
        await PrePlaceModel.create({
            name,
            category,
            address,
            phone,
            coord,
            info,
        });
        console.log(`데이터 생성 완료!`);
    } catch (error){
        return console.log(error);
    }
    return res.send("postConfirm");
}