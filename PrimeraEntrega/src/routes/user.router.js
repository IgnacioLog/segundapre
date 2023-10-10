const express = require('express');
const router = express.Router();
const User = require('../dao/models/user');
const Product = require('../dao/models/Product');
const Cart = require('../dao/models/Cart');
const Message = require('../dao/models/Message');
const Order = require('../dao/models/Order');
const Review = require('../dao/models/Review');
const Category = require('../dao/models/Category');
const Payment = require('../dao/models/Payment');


// CREATE
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// READ
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// UPDATE
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// DELETE
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;


// CRUD para Product
router.route('/products')
  .get(async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.send(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

router.route('/products/:id')
  .get(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).send('Producto no encontrado');
      res.send(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) return res.status(404).send('Producto no encontrado');
      res.send(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).send('Producto no encontrado');
      res.send(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// CRUD para Cart
router.route('/carts')
  .get(async (req, res) => {
    try {
      const carts = await Cart.find();
      res.json(carts);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    try {
      const cart = new Cart(req.body);
      await cart.save();
      res.send(cart);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

router.route('/carts/:id')
  .get(async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      if (!cart) return res.status(404).send('Carrito no encontrado');
      res.send(cart);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    try {
      const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!cart) return res.status(404).send('Carrito no encontrado');
      res.send(cart);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    try {
      const cart = await Cart.findByIdAndDelete(req.params.id);
      if (!cart) return res.status(404).send('Carrito no encontrado');
      res.send(cart);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// CRUD para Message
router.route('/messages')
  .get(async (req, res) => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    try {
      const message = new Message(req.body);
      await message.save();
      res.send(message);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

router.route('/messages/:id')
  .get(async (req, res) => {
    try {
      const message = await Message.findById(req.params.id);
      if (!message) return res.status(404).send('Mensaje no encontrado');
      res.send(message);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .delete(async (req, res) => {
    try {
      const message = await Message.findByIdAndDelete(req.params.id);
      if (!message) return res.status(404).send('Mensaje no encontrado');
      res.send(message);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// CRUD para Order
router.route('/orders')
  .get(async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    try {
      const order = new Order(req.body);
      await order.save();
      res.send(order);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

router.route('/orders/:id')
  .get(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).send('Orden no encontrada');
      res.send(order);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!order) return res.status(404).send('Orden no encontrada');
      res.send(order);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) return res.status(404).send('Orden no encontrada');
      res.send(order);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// CRUD para Review
router.route('/reviews')
  .get(async (req, res) => {
    try {
      const reviews = await Review.find();
      res.json(reviews);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    try {
      const review = new Review(req.body);
      await review.save();
      res.send(review);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

router.route('/reviews/:id')
  .get(async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) return res.status(404).send('Reseña no encontrada');
      res.send(review);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!review) return res.status(404).send('Reseña no encontrada');
      res.send(review);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) return res.status(404).send('Reseña no encontrada');
      res.send(review);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// CRUD para Category
router.route('/categories')
  .get(async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.send(category);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

router.route('/categories/:id')
  .get(async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).send('Categoría no encontrada');
      res.send(category);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!category) return res.status(404).send('Categoría no encontrada');
      res.send(category);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) return res.status(404).send('Categoría no encontrada');
      res.send(category);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// CRUD para Payment
router.route('/payments')
  .get(async (req, res) => {
    try {
      const payments = await Payment.find();
      res.json(payments);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .post(async (req, res) => {
    try {
      const payment = new Payment(req.body);
      await payment.save();
      res.send(payment);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

router.route('/payments/:id')
  .get(async (req, res) => {
    try {
      const payment = await Payment.findById(req.params.id);
      if (!payment) return res.status(404).send('Pago no encontrado');
      res.send(payment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    try {
      const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!payment) return res.status(404).send('Pago no encontrado');
      res.send(payment);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .delete(async (req, res) => {
    try {
      const payment = await Payment.findByIdAndDelete(req.params.id);
      if (!payment) return res.status(404).send('Pago no encontrado');
      res.send(payment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


module.exports = router;

