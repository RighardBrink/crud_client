import './App.css'
import { useEffect, useState } from 'react';

function App() {

//BEGIN CLASS CODE

  class Product {
    ObjectID: string;
    title: string;
    description: string;
    price: number;
    supplier?: string;
    
    constructor(_objectID: string, _title: string, _description: string, _price: number, _supplier?: string) {
      this.ObjectID = _objectID;
      this.title = _title;
      this.description = _description;
      this.price = _price;
      this.supplier = _supplier;
    };

    get getObjectID() {
      return this.ObjectID;
    }

    get getTitle() {
      return this.title;
    }

    get getDescription() {
      return this.description;
    }

    get getPrice() {
      return this.price;
    }

    get getSupplier() {
      return this.supplier;
    }
  }

  const product1 = new Product("66b0ba3cb3489045ad72c93f", "Test3", "Extended test3", 200, "SupplierTest3");
  const product2 = new Product("76b0ba3cb3489045ad72c93g", "Test4", "Extended test4", 300);

  const products: Product[] = [
    product1, 
    product2
  ];

  const productList = products.map(product =>
    <tr className="tableRow">
      <td>{product.getObjectID}</td>
      <td>{product.getTitle}</td>
      <td>{product.getDescription}</td>
      <td>{product.getPrice}</td>
      <td>{product.getSupplier}</td>
    </tr>
  )

  //END OF CLASS CODE

  //BEGIN INTERFACE CODE
  //implementation from https://medium.com/@diegogauna.developer/restful-api-using-typescript-and-react-hooks-3d99bdd0cd39

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
        {productRecords.map((product) => (
          <ul>
            <li>{product._id}</li>
            <li>{product.title}</li>
            <li>{product.description}</li>
            <li>{product.price}</li>
            <li>{product.supplier}</li>
            
          </ul>
          
      ))}
      </div>
    );
  }

  //END OF INTERFACE CODE

  return (
    <>
      <div>
        <h1>Inventory List</h1>
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
            {productList}
          </tbody>          
        </table>
      </div>
      <div>
        <ProductsList/>
      </div>
    </>
  )
}

export default App
