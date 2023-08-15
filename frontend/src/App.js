import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [products, setProducts] = useState([]);

  const getdata = () => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const [data, setData] = useState({
    price: "",
    name: "",
  });

  const handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const addproduct = (e) => {
    e.preventDefault();
    console.log(data);

    axios
      .post("http://localhost:3000/products", data)
      .then((res) => {
        console.log(res);
        getdata();
      })
      .catch((err) => console.log(err));
  };
  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then((res) => {
        console.log(res);
        getdata();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div className="App">
      <h1>Add product</h1>
      <form>
        <label>Selling Price:</label>
        <input
          onChange={handlechange}
          name="price"
          type="number"
          placeholder="Product price"
        />
        <label>Product Name:</label>
        <input
          onChange={handlechange}
          name="name"
          type="text"
          placeholder="Product name"
        />
        <button onClick={addproduct}>add product</button>
      </form>
      <h1>Product List</h1>
      <tr>
        <th>price</th>
        <th>name</th>
      </tr>
      {products.length > 0
        ? products.map((e) => (
            <tr>
              <td>{e.price}</td>
              <td>{e.name}</td>

              <td>
                <button
                  onClick={() => {
                    deleteProduct(e.id);
                  }}
                >
                  Delete Product
                </button>
              </td>
            </tr>
          ))
        : "no data"}
      <h5>Total Price of All Products: Rs: {calculateTotalPrice()}</h5>
    </div>
  );
}

export default App;
