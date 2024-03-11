const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

mongoose.connect('mongodb://localhost:27017/drexel-marketplace')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

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
  email: {
      type: String,
      required: true,
      unique: true 
  },
  password: {
      type: String,
      required: true
  }
});

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);

app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

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

app.patch('/products/:id', async (req, res) => {
  try {
    console.log("PATCH request to /products/:id with id:", req.params.id);
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
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
// Route to register a new user
app.post('/users/register', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // If not, proceed with creating a new user
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send({ message: 'User registered!', userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error registering user', error: error });
  }
});

// Route to login a user
app.post('/users/login', async (req, res) => { // Changed endpoint to /users/login
  try {
    const user = await User.findOne({ email: req.body.email  });
    if (user ) {
      res.json({ message: 'Login successful!', userId: user._id });
    } else {
      res.status(400).json('Invalid email or password.');
    }
  } catch (error) {
    console.error(error);
    res.status(400).json('Error: ' + error);
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
