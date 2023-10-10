const socket = io.connect('http://localhost:8080');
const messageForm = document.getElementById('messageForm');
const messageList = document.getElementById('messageList');

socket.on('newMessage', (message) => {
  const messageItem = document.createElement('li');
  messageItem.textContent = `${message.user}: ${message.message}`;
  messageList.appendChild(messageItem);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = e.target.elements.user.value;
  const message = e.target.elements.message.value;
  socket.emit('sendMessage', { user, message });
});

// Conexión establecida
socket.on('connect', () => {
    console.log('Conectado al servidor');
});

// Actualizar lista de productos
socket.on('updateProducts', (products) => {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpiar la lista actual
    products.forEach(product => {
        const productItem = document.createElement('li');
        productItem.textContent = `${product.name} - ${product.price}`;
        productList.appendChild(productItem);
    });
});

// Producto agregado
socket.on('productAdded', (product) => {
    const productList = document.getElementById('productList');
    const productItem = document.createElement('li');
    productItem.textContent = `${product.name} - ${product.price}`;
    productList.appendChild(productItem);
});

// Producto eliminado
socket.on('productDeleted', (productId) => {
    const productElement = document.getElementById(`product-${productId}`);
    if (productElement) {
        productElement.remove();
    }
});

// Desconexión del servidor
socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

// Mensaje del servidor
socket.on('serverMessage', (message) => {
    console.log('Mensaje del servidor:', message);
});