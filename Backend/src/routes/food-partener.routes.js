const express = require("express");
const foodController = require("../controllers/food.controller");
const likeController = require("../controllers/like.controller");
const { imageUpload, videoUpload } = require("../middlewares/multer");
const {auth, isPartner, isowner} = require("../middlewares/auth");

const router = express.Router();


// adding reel
router.post(
  "/addfooditemreel/:partnerId",
  auth,
  isPartner,
  isowner,
  videoUpload.single("video"),
  foodController.addFooodItemsReel
);


// fetch all reels 

router.get("/reels", foodController.getAllReels)


// adding menue item for partner

router.post(
  "/addmenueitem/:partnerId",
  auth,
  isPartner,
  isowner,
  imageUpload.single("image"),
  foodController.addMenuItems
);



// get all partners 

router.get("/partners",   foodController.getPartners)


// getting partner details based on the partner id
router.get("/partner/:partnerId", foodController.getPartnerById);


// getting menue item based on the partner id 

router.get("/menue/:partnerId", foodController.getMenueByPartnerId)


// updating the menue item status
router.patch("/menueitem/:partnerId/status/:itemId", auth,
  foodController.updateMenuItemStatus)



  // get like count for a food item
  router.get("/likes",  likeController.getLikeCount)

  // update like count for a food item
  router.post("/likes",  likeController.likeCount)

  


  // get food item by id
  router.get("/fooditem/:itemId", foodController.getItembyId)

  // get reel count for a partner
  router.get("/reelcount/:partnerId", foodController.getReelCount)

module.exports = router;