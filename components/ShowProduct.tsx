import React, { SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../interfaces/productInterface";
import Product from "./ProductCard";
import { IUser } from "../interfaces/userInterface";
import axios from "axios";
import Checkout from "./Checkout";

function ShowProduct({ user }: { user: null | IUser }) {
  const [product, setProducts] = React.useState<IProduct | null>(null);
  const [purchasedProduct, setPurchasedProduct] = React.useState<string | null>(
    null
  );
  const { productId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("An individual product Page has mounted");
  }, []);

  React.useEffect(() => {
    async function fetchProducts() {
      const resp = await fetch(`/api/products/${productId}`);
      const productData = await resp.json();
      setProducts(productData);
    }
    fetchProducts();
  }, []);

  async function deleteMovie(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("/api/products/" + productId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/products");
    } catch (e: any) {
      console.log(e.response.data);
    }
  }

  function buyButton() {
    if (productId) {
      setPurchasedProduct(productId);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {product && <Product key={product._id} {...product} />}
        </div>
        {product && user?._id === product.user && (
          <button onClick={deleteMovie} className="button is-danger">
            Delete
          </button>
        )}
        <button onClick={buyButton} className="button is-primary">
          Buy Now
        </button>
        {purchasedProduct && product && <Checkout {...product} />}
      </div>
    </section>
  );
}

export default ShowProduct;
