import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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

  const products = [
    product1, 
    product2
  ];


  return (
    <>
      <div>
        <h1>My Products</h1>
        <p>{products[0].getPrice}</p>
      </div>
    </>
  )
}

export default App
