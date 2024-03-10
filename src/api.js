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
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
