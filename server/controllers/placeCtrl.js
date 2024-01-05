import PlaceModel from "../models/Place.js";

export const getPlace = async (req, res)=>{
    const { id } = req.params;
    const placedata = await PlaceModel.findOne({_id:id})
    if(!placedata)
        return res.status(404).send("404");
    else
        return res.status(200).send(placedata);
}

export const postPlace = (req, res)=>{
    return res.send("postPlace");
}

export const getForm = (req, res)=>{
    return res.send("getForm");
}

export const postForm = (req, res)=>{
    return res.send("postForm");
}