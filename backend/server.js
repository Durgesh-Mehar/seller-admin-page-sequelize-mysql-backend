const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
var cors = require('cors')


// Connect to the database
const sequelize = new Sequelize('frist_project', 'root', 'W@2915djkq#', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define the Product model
const Product = sequelize.define('Product', {
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Create Express app
const app = express();
app.use(express.json());
app.use(cors())
// Create a new product  
app.post('/products', (req, res) => {
  const {price, name } = req.body;
  console.log(price, name)
     Product.create({price, name})
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

// Fetch all products
app.get('/products', (req, res) => {
  Product.findAll()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error fetching products' });
    });
});
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      // Delete the Product
      await product.destroy();
      console.log('User deleted successfully');
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
})

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});