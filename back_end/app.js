const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { swaggerUi, specs } = require('./swaggerConfig'); // Ensure this path matches where your Swagger configuration is

// Import your routes
const userRoutes = require('./routes/userRoutes'); // Update the path according to your project structure
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require('./routes/cartRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes')
const path = require('path');

const app = express();
// Body parser middleware
app.use(bodyParser.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect('mongodb+srv://root:root123@projectse.gqpcdqq.mongodb.net/')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use('/uploads', express.static(path.join(__dirname, 'middleware', 'uploads')));


app.use('/api/user',userRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/products", productRoutes);
app.use('/api',invoiceRoutes);



// Handle 404 - Not Found
app.use((req, res, next) => {
    res.status(404).send('Sorry, that route does not exist.');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
