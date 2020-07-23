const Maharaj = require("../models/Maharaj")


/**
 * @ROUTE /api/v1/admin/approveMaharaj/:id
 * @DESC Approve maharaj registration
 */
exports.approveMaharaj= async (req,res)=>{
    const {id} = req.params;
    const {isApproved} = req.body;
    if(!id)return res.status(400).json("Bad request")
    const maharaj = await Maharaj.findByIdAndUpdate(id,{isApproved:isApproved},{new:true})
    res.status(200).json({success:true,msg:"Maharaj aprroved successfully"})
}

/**
 * @ROUTE POST /api/v1/admin/setPrice/:id
 * @DESC  Set Base price of maharaj(default:hourly basis) 
 */
exports.setPrice= async (req,res)=>{
    const {id} = req.params;
    const maharaj = await Maharaj.findById(id);
    if(!maharaj){
        return res.status(404).json({success:false,msg:"Maharaj Not Found"})
    }
    maharaj.basePrice=req.body;
    await maharaj.save();
    res.status(200).json({success:true,msg:"Price set Sucessfully"})

}




