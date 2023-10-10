// 1. Importar módulos y configuraciones iniciales
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');
const ProductManager = require('../classes/ProductManager');
const CartManager = require('../classes/CartManager');
const viewsRouter = require('../routes/views.router');
const { formatPrice } = require('../server/utils');
const mongoose = require('mongoose');

// Conexión a MongoDB
mongoose.connect('mongodb+srv://coderhouse:coderhouse', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(error => console.error('Error conectando a MongoDB:', error));

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 2. Crear instancias de clases y configurar middlewares
const productManager = new ProductManager();
const cartManager = new CartManager();

app.use(express.json());
app.use('/', viewsRouter);

// Configuración de Handlebars
const hbs = exphbs.create({
  helpers: {
    formatPrice
  }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// 3. Configurar rutas
// Rutas para la gestión de productos
app.get('/api/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getProducts();
    res.json(limit ? products.slice(0, limit) : products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/products/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(parseInt(req.params.pid));
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/api/products', async (req, res) => {
  try {
    await productManager.addProduct(req.body);
    res.send('Producto agregado');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.put('/api/products/:pid', async (req, res) => {
  try {
    await productManager.updateProduct(parseInt(req.params.pid), req.body);
    res.send('Producto actualizado');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete('/api/products/:pid', async (req, res) => {
  try {
    await productManager.deleteProduct(parseInt(req.params.pid));
    res.send('Producto eliminado');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Rutas para la gestión de carritos
app.post('/api/carts', async (req, res) => {
  try {
    await cartManager.createCart();
    res.send('Carrito creado');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/api/carts/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(parseInt(req.params.cid));
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).send('Carrito no encontrado');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/api/carts/:cid/product/:pid', async (req, res) => {
  try {
    await cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    res.send('Producto agregado al carrito');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 4. Configuración de Socket.io
io.on('connection', (socket) => {
  console.log('Usuario conectado');

  // Manejador de eventos para un nuevo producto
  socket.on('newProduct', async (product) => {
    try {
      await productManager.addProduct(product);
      const products = await productManager.getProducts();
      io.emit('updateProducts', products);
    } catch (error) {
      console.error('Error al agregar producto:', error.message);
    }
  });

  // Manejador de eventos para desconexión
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });

});

// 5. Iniciar el servidor
server.listen(8080, () => {
  console.log('Servidor corriendo en http://localhost:8080');
});

module.exports = app;