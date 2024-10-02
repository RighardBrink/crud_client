// import { IProduct } from '../models/ProductModel';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Product() {
    const [productForm, setProductForm] = useState({
        title: "",
        description: "",
        price: 0,
        supplier: ""
    });

    const [isNewProduct, setIsNewProduct] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if (!id) {
                return;
            }
            setIsNewProduct(false);

            const response = await fetch(`http://localhost:3000/product/${id}`);
            const product = await response.json();
            setProductForm(product);
        }
        fetchData();
        return;
    }, [params.id]);

    function updateForm(value: any) {
        return setProductForm((prev) => {
            return {...prev, ...value};
        });
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const product = {...productForm};
        try {
            let response;
            if (isNewProduct) {
                response = await fetch("http://localhost:3000/product/addProduct", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(product)
                });
            }
            else {
                response = await fetch (`http://localhost:3000/product/updateProduct/${params.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(product)
                });
            }

            if (!response.ok) {
                throw new Error(`Error status: ${response.status}`);
            }
        }
        catch(error) {
            console.log("Problem occurred: ", error);
        }
        finally {
            setProductForm({
                title: "",
                description: "",
                price: 0,
                supplier: ""
            });
            navigate("/");
        }
    }

    return (
        <>
            <h1>Create/Update Product</h1>
            <form onSubmit={onSubmit}>
                <div className="productInfoGrid">
                    <h2>Product Info</h2>

                    <div className="title">
                        <label className="titleLabel">
                            Product Title
                        </label>
                        <input 
                        type="text" 
                        name="title"
                        id="title"
                        className="titleInput"
                        placeholder="Product Title"
                        value={productForm.title}
                        onChange={(event) => updateForm({title: event.target.value})}
                        />
                    </div>

                    <div className="description">
                        <label className="descriptionLabel">
                            Description
                        </label>
                        <input 
                        type="text" 
                        name="description"
                        id="description"
                        className="descriptionInput"
                        placeholder="Product Description"
                        value={productForm.description}
                        onChange={(event) => updateForm({description: event.target.value})}
                        />
                    </div>

                    <div className="price">
                        <label className="priceLabel">
                            Price
                        </label>
                        <input 
                        type="number" 
                        name="price"
                        id="price"
                        className="priceInput"
                        placeholder="Price"
                        value={productForm.price}
                        onChange={(event) => updateForm({price: event.target.value})}
                        />
                    </div>

                    <div className="supplier">
                        <label className="supplierLabel">
                            Supplier
                        </label>
                        <input 
                        type="text" 
                        name="supplier"
                        id="supplier"
                        className="supplierInput"
                        placeholder="Supplier"
                        value={productForm.supplier}
                        onChange={(event) => updateForm({supplier: event.target.value})}
                        />
                    </div>
                </div>
                <input 
                type="submit"
                value="Save Product"
                className="submitProduct"                
                />
            </form>
        </>
    );
}

