const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const cors = require('cors'); 
// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200' 
}));
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/drexel-marketplace', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  photo: String,
  seller: String,
  price: Number, 
  quantity: Number,
  total: Number,
  category: [String] 
});

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);

// Create a Product
app.post('/products', async (req, res) => {
  try {
    // Check if the request body is an array
    if (Array.isArray(req.body)) {
      // Use MongoDB's insertMany() for bulk insertion
      const products = await Product.insertMany(req.body);
      res.status(201).send(products);
    } else {
      // Handle a single product insertion
      const product = new Product(req.body);
      await product.save();
      res.status(201).send(product);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


// Get all Products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single Product by id
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a Product
app.patch('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error updating product",
      error: error.message
    });
  }
});


// Delete a Product
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email, password: req.body.password })
        .then(user => {
            if (user) {
                res.json('Login successful!');
            } else {
                res.status(400).json('Invalid email or password.');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
