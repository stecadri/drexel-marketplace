const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

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
  price: Number, // Changed from Float32Array to Number for Mongoose compatibility
  category: [String] // Assuming category is an array of strings
});

// Pre-save hook to hash password before saving a user
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to help validate a user's password
userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);

// Create a Product
app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
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
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
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

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Implement JWT or any session management logic here

    res.status(200).send({ message: 'Login successful' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});