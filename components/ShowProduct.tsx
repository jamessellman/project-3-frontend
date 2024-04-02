import React, { SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../interfaces/productInterface";
import Product from "./ProductCard";
import { IUser } from "../interfaces/userInterface";
import axios from "axios";
import Checkout from "./Checkout";
import { Link } from "react-router-dom";
// import {IndividualProduct} from "../components/ShowindividualCard"
import Reviews from "./Reviews";
import {baseUrl} from "../src/config"

function ShowProduct({ user }: { user: null | IUser }) {
  const [product, setProducts] = React.useState<IProduct | null>(null);
  const [purchasedProduct, setPurchasedProduct] = React.useState<string | null>(
    null
  );
  const { productId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    // console.log("An individual product Page has mounted");
  }, []);

  React.useEffect(() => {
    async function fetchProducts() {
      const resp = await fetch(`${baseUrl}/products/${productId}`);
      const productData = await resp.json();
      setProducts(productData);
    }
    fetchProducts();
  }, []);

  async function deleteProduct(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/products/` + productId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/sellerhome");
    } catch (e: any) {
      // console.log(e.response.data);
    }
  }

  function editProduct() {
    <Link to="/edit"></Link>;
  }

  function buyButton() {
    if (productId) {
      setPurchasedProduct(productId);
    }
  }

  // console.log(user);

  const [sellerName, setSellerName] = React.useState(null);

  async function fetchSeller() {
    const res = await fetch(`${baseUrl}/findSellerName/${productId}`);
    const userData = await res.json();
    // console.log(userData);
    setSellerName(userData.userName);
  }

  React.useEffect(() => {
    fetchSeller();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {/* {product && <IndividualProduct key={product._id} {...product} />} */}
        </div>
        <div className="hero is-fullheight ">
          <div className="box is-centered custom-box">
            <div className="columns is-multiline">
              <div className="column is-two-fifths">
                <figure className="image is-full-width image is-square">
                  <img src={product?.image} alt={product?.title} />
                </figure>
              </div>
              <div className="column is-one-third">
                <div className="content">
                  <h2 className="is-size-2 has-text-white ">
                    {product?.title}
                  </h2>
                  <h5 className="mt-2 mb-1 has-text-white ">Price:</h5>
                  <div className="has-text-white ">
                    £{product?.price.toFixed(2)}
                  </div>
                  <h5 className="mt-4 mb-1 has-text-white ">Description:</h5>
                  <div className="has-text-white ">{product?.description}</div>
                  {product && !user && (
                    <button
                      onClick={buyButton}
                      className="button has-background-warning-dark has-text-centered is-rounded mt-5"
                    >
                      Buy Now
                    </button>
                  )}
                  {product && user?._id === product.user && (
                    <button
                      onClick={deleteProduct}
                      className="button has-background-link has-text-centered is-rounded mt-5"
                    >
                      Delete
                    </button>
                  )}
                  {product && user?._id === product.user && (
                    <Link to={`/editproduct/${productId}`}>
                      <button className="button has-background-link-light has-text-dark has-text-centered is-rounded ml-3 mt-5">
                        Edit
                      </button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="column ">
                <p className="is-pulled-right has-text-white ">
                  Category: {product?.category}
                </p>
              </div>
            </div>
            <div className="mb-3 has-text-white ">Seller: {sellerName}</div>
            {purchasedProduct && product && <Checkout {...product} />}
          </div>
          <div className="mt-5">
            <hr />

            {product && !user && <Reviews {...product} />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShowProduct;
