  const foodModel = require("../models/foodmodel");

const likeCount = async (req, res)=>{

          const{foodId , userId} = req.body;

          try{
                    const foodItem = await foodModel.findById(foodId);

          if(!foodItem){
                    return res.status(404).json({ message: "Food item not found" });
          }

          // Check if user has already liked the item
          const alreadyLiked = foodItem.likes.includes(userId);

          if(alreadyLiked){

                    foodItem.likes.pull(userId);
                    foodItem.likeCounts = Math.max(foodItem.likeCounts - 1, 0);



          }else{
                    foodItem.likes.push(userId);
                    foodItem.likeCounts += 1;
          }
          await foodItem.save();
          res.json({ message: "Like count updated successfully" });
        } catch (error) {
          res.status(500).json({ message: "Error updating like count" });
        }
      }


      const getLikeCount = async (req, res) => {
        const { foodId } = req.params;

        try {
          const foodItem = await foodModel.findById(foodId);

          if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
          }

          res.json({ likeCounts: foodItem.likeCounts });
        } catch (error) {
          res.status(500).json({ message: "Error fetching like count" });
        }
      };

      module.exports = {
        likeCount,
        getLikeCount,
      };