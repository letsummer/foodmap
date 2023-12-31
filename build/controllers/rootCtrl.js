import axios from "axios";
import PlaceModel from "../models/Place.js";
import PrePlaceModel from "../models/Request.js";
export const getList = async (req, res) => {
  const list = await PlaceModel.find({});
  return res.send(list);
};
export const postList = async (req, res) => {
  const preData = await PrePlaceModel.deleteOne({
    _id: req.body._id
  });
  // console.log(`predata: `, preData);

  const id = req.body._id;
  // console.log(`id: `, id);
  const {
    name,
    category,
    address,
    phone,
    coord,
    info
  } = req.body;
  console.log(req.body);
  try {
    await PlaceModel.create({
      // _id: id,
      name,
      category,
      address,
      phone,
      coord,
      info
    });
    console.log(`지도에 데이터 추가 완료!`);
  } catch (error) {
    return console.log(error);
  }
  return res.send("postList");
};
export const deleteList = async (req, res) => {
  const preData = await PlaceModel.deleteOne({
    _id: req.body._id
  });
  return res.send("deleteList");
};
export const getConfirm = async (req, res) => {
  const list = await PrePlaceModel.find({});
  return res.send(list);
  // return res.send("getConfirm");
};
export const postConfirm = async (req, res) => {
  const {
    name,
    category,
    address,
    phone,
    coord,
    info
  } = req.body;
  console.log(req.body);
  try {
    await PrePlaceModel.create({
      name,
      category,
      address,
      phone,
      coord,
      info
    });
    console.log(`정상 요청!`);
  } catch (error) {
    return console.log(error);
  }
  return res.send("postConfirm");
};