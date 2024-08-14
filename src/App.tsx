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

    get getTitle() {
      return this.title;
    }
  }

  const test = new Product("66b0ba3cb3489045ad72c93f", "Test3", "Extended test3", 200, "SupplierTest3");
  console.log(test.getTitle);

  return (
    <>
      <div>
        <p>{test.getTitle}</p>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
