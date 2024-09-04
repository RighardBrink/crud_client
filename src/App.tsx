import './App.css';
import { useEffect, useState } from 'react';
import removeIcon from './assets/remove-icon.svg';

interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  supplier: string;
}

const Product = ({product, deleteProduct}: {product: IProduct, deleteProduct: (id: string) => void}) => (
  <tr className="tableRow">
    <td>{product._id}</td>
    <td>{product.title}</td>
    <td>{product.description}</td>
    <td>{product.price}</td>
    <td>{product.supplier}</td>
    <td>          
      <img onClick={() => {deleteProduct(product._id)}} className="removeIcon" src={removeIcon} alt="Delete Product"/>
    </td>
  </tr>
);

function ProductList() {

  const [productRecords, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function fetchData() {
      // const products = await fetchProducts();
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      setProducts(data)
      console.log(productRecords);
    }
    fetchData();
    return;
  }, [productRecords.length]);

  // async function fetchProducts() {
  //   const response = await fetch('http://localhost:3000/products');
  //   const data = await response.json();
  //   return data;
  // }

  async function deleteProduct(id: string) {
    const response = await fetch('http://localhost:3000/product/deleteProduct', {
      method: "PUT",
      body: `_id: ${id}`
    });
    const data = await response.json();

    const newProducts = productRecords.filter(product => product._id !== id);
    setProducts(newProducts);
    
    console.log(data);
    //return data;    
  }

  function productList() {
    return productRecords.map((product) => {
      return (
        <Product
          product={product}
          deleteProduct={() => deleteProduct(product._id)}
          key={product._id}
        />
      );
    });
  }

  return (
    <>
      <table className="productTable">
          <thead>
            <tr>
              <th>ObjectID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Supplier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList()}
          </tbody>          
        </table>
    </>
  );
}

function App() {
  return (
    <>
      <ProductList/>
    </>
  );  
}

export default App

//https://felixgerschau.com/react-typescript-onclick-event-type/