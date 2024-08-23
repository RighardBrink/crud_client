import './App.css'
import { useEffect, useState } from 'react';

function App() {

  //BEGIN INTERFACE CODE

  interface IProduct {
    _id: string;
    title: string;
    description: string;
    price: number;
    supplier: string;
  }

  async function fetchProducts(): Promise<IProduct[]> {
    const response = await fetch('http://localhost:3000/products');
    const data = await response.json();
    return data;
  }

  function ProductsList() {
    const [productRecords, setProducts] = useState<IProduct[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
      async function fetchData() {
        try {
          const data = await fetchProducts();
          setProducts(data);
        }
        catch(error: any) {
          setError(error.message);
        }
      }
      fetchData()
    }, []);

    return (
      <div>
      <table className="productTable">
          <thead>
            <tr>
              <th>ObjectID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Supplier</th>
            </tr>
          </thead>
          <tbody>
          {productRecords.map((product) => (
          <tr className="tableRow">
            <td>{product._id}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.supplier}</td>
          </tr>
          ))}
          </tbody>          
        </table>
      </div>
    );
  }

  //END OF INTERFACE CODE

  return (
    <>
      <div>
        <ProductsList/>
      </div>
    </>
  )
}

export default App
