const cartModel = require("../models/cart.model");
const menueModel = require("../models/menue.model");

async function getCartItems(req, res) {
  const userId = req.user.id;

          try {
                    const cart = await cartModel.findOne({ userId }).populate("items.foodItemId");

                    if (!cart) {
                              return res.status(404).json({ message: "Cart not found" });
                    }         
                    res.status(200).json({ items: cart.items });
          } catch (err) {
                    console.error(err);
                    res.status(500).json({ message: "Error fetching cart items" });
          }
}

async function addToCart(req, res) {
  const userId = req.user.id;
  const { foodItemId, quantity , partnerName } = req.body;

  try {
    let cart = await cartModel.findOne({ userId });

    // ✅ create cart if not exists
    if (!cart) {
      cart = new cartModel({
        userId,
        items: [],
      });
    }

    // ✅ NOW safe to use cart.items
    const itemIndex = cart.items.findIndex((item) =>
      item.foodItemId.equals(foodItemId)
    );

    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].partnerName = partnerName;
    } else {
      cart.items.push({ foodItemId, quantity , partnerName });
    }

    await cart.save();

    res.status(200).json({ message: "Item added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding item to cart" });
  }
}

async function removeFromCart(req, res) {
  const userId = req.user.id;
  const { foodItemId } = req.body;
          
          try {

                    const cart = await cartModel.findOne({ userId });

                    if (!cart) {
                              return res.status(404).json({ message: "Cart not found" });
                    }                   

                    cart.items = cart.items.filter(item => !item.foodItemId.equals(foodItemId));
                    await cart.save();
                    res.status(200).json({ message: "Item removed from cart" });
          } catch (err) {
                    console.error(err);
                    res.status(500).json({ message: "Error removing item from cart" });
          }
}

async function clearCart(req, res) {
  const userId = req.user.id;
          try {
                    const cart = await cartModel.findOne({ userId });           
                    if (!cart) {
                              return res.status(404).json({ message: "Cart not found" });
                    }

                    cart.items = [];
                    await cart.save();
                    res.status(200).json({ message: "Cart cleared" });
          } catch (err) {
                    console.error(err);
                    res.status(500).json({ message: "Error clearing cart" });
          }                   
}

async function decreaseQuantity(req, res) {
  const userId = req.user.id;
  const { foodItemId } = req.body;

  try {
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex((item) =>
      item.foodItemId.equals(foodItemId)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    res.status(200).json({ message: "Quantity decreased" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error decreasing quantity" });
  }
}

module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQuantity
};