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

export const getEdit = async (req, res) =>{
    // console.log(`id:`, await PlaceModel.find({}));
    // console.log(`getEdit pate!!`);
    return res.send("getEdit");
}

export const postEdit = async (req, res) =>{
    const { id } = req.params;
    // console.log(`id: `, id);
    const {name, phone} = req.body;
    // console.log(id);
    try {
        await PlaceModel.findByIdAndUpdate(id, {
            // _id: id,
            name,
            // category,
            // address,
            phone,
            // coord,
            // info,
        });
        console.log(`데이터 수정 완료!`);
    } catch (error){
        return console.log(error);
    }
    return res.send("postEdit");
}

export const getForm = (req, res)=>{
    return res.send("getForm");
}

export const postForm = (req, res)=>{
    return res.send("postForm");
}