const foodModel = require("../models/foodmodel");
const menueModel = require("../models/menue.model");
const partenerModel = require("../models/partener.model")
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");


// upload reels

async function addFooodItemsReel(req, res) {
  const { reelName, description , foodItemId,  } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Video is required" });
  }

  const menue = await menueModel.findById(foodItemId);

  if(!menue){
    return res.status(404).json({ message: "Menu item not found" });
  }



  const foodPartener = req.user.id;

  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );

  const foodItem = await foodModel.create({
    reelName,
    description,
    video: fileUploadResult.url,
    foodPartener,
    foodItemId,
  });

  res.status(201).json({
    message: "Food item created successfully",
    food: foodItem,
  });
}


// fetch all reels 

async function getAllReels(req, res){

  try{
    const reels = await foodModel.find().populate("foodPartener", "restaurantName").lean();   

    res.status(200).json({
      success: true,
      count: reels.length,
      data: reels,
    })
  }catch(err){
    console.log(err)
    res.status(500).json({  
      success: false,
      message: "Failed to fetch reels",
    });
  }
}




async function addMenuItems(req, res) {

  const { name, description, price, quantity, cusine, currency, quantityUnit } = req.body;
  const foodPartener = req.user.id;


  const existingItem = await menueModel.findOne({ name, price, foodPartener  });

  if (existingItem) {
    return res.status(400).json({ message: "Menu item with same name and price already exists" });
  }


  const menuItem = await menueModel.create({
    name,
    description,
    price,
    quantity,
    cusine,
    quantityUnit,
    currency,
    foodPartener,
    status: "live",
    image: req.file ? await storageService.uploadFile(req.file.buffer, uuid()).then(result => result.url) : "",
  });

  res.status(201).json({
    message: "Menu item created successfully",
    menu: menuItem,
  });

}

async function getPartners(req, res){
  try{
 const partners = await partenerModel
      .find({ userType: "partner" })
      .select("restaurantName location")
      .lean();
    res.status(200).json({
        success: true,
      count: partners.length,
      data: partners,
    })
  } catch (error) {
    console.error("Error fetching partners:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch partners",
    });
  }
}


async function getMenueByPartnerId(req, res){
  const { partnerId } = req.params;

  try{

    const menueItems = await menueModel.find({ foodPartener: partnerId});

    if(menueItems.length === 0){
      return res.status(404).json({
        success: false,
        message: "No menu items found for this partner",
      });
    }

    res.status(200).json({
      success: true,
      count: menueItems.length,
      data: menueItems,
    });
  
  }catch(err){
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu items",
    });
  }

}


async function getPartnerById(req, res){
  const {partnerId} = req.params;

  try{
    const partner = await partenerModel.findById(partnerId).select("restaurantName  location").lean();
  if(!partner){
    return res.status(404).json({
      success: false,
      message: "Partner not found",
    });
  }

  res.status(200).json({
    success: true,
    data: partner,
  });
  }catch(err){
    console.log(err)
    res.status(500).json({  
      success: false,
      message: "Failed to fetch partner details",
    });
  }
}



async function updateMenuItemStatus(req, res) {
  const { itemId } = req.params;
  const { status } = req.body;

  try {
    const menuItem = await menueModel.findById(itemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    menuItem.status = status;
    await menuItem.save();

    res.status(200).json({
      message: "Menu item status updated successfully",
      menu: menuItem,
    });
  } catch (error) {
    console.error("Error updating menu item status:", error);
    res.status(500).json({ message: "Failed to update menu item status" });
  } 
}

async function getItembyId(req,res){

  const {itemId} = req.params;
  try{
    const item = await menueModel.findById(itemId);

    if(!item){
      return res.status(404).json({message: "Menu item not found"})
    }
    res.status(200).json({success: true, data: item});
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({ message: "Failed to fetch menu item" });

  }
}


async function getReelCount (req, res ){

  const {partnerId} = req.params;

  try{
    const reelCount = await foodModel.countDocuments({ foodPartener: partnerId });

    res.status(200).json({
      success: true,
      data: reelCount,
    });
  } catch (error) {
    console.error("Error fetching reel count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reel count",
    });
  }
}

module.exports = {
   addFooodItemsReel,
   addMenuItems ,
   getPartners,
   getMenueByPartnerId, 
   getPartnerById,
    updateMenuItemStatus,
    getAllReels,
    getItembyId,
    getReelCount,
  
  }; 
