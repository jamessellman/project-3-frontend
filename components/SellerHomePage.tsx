import { useEffect, useState } from "react";
import { IProduct } from "../interfaces/productInterface";
import SellerProductCard from "./SellerProductCard";
import { useNavigate } from "react-router-dom";
import {baseUrl} from "../src/config"

type Products = null | Array<IProduct>;

function SellerHome({ user }: any) {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalUnitsSold, setTotalUnitsSold] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      if (!user || !user._id) return; // Check if user and user._id are present
      console.log(user);
      const response = await fetch(`${baseUrl}/getProducts/${user._id}`);
      const data = await response.json();
      setProducts(data);

      let total = 0;
      for (const product of data) {
        total += Number(product.unitsSold);
      }
      setTotalUnitsSold(total);
    }

    fetchProducts();
  }, [user]);
  console.log(products);

  function handleSearchClick() {
    navigate("/create");
  }

  return (
    <>
      <section className="hero is-link is-fullheight-with-navbar">
        <div className="hero-body has-text-centered">
          <div className="container">
            {/* get the user name displayed */}
            <p className="title">
              Welcome{" "}
              {user
                ? user.userName.charAt(0).toUpperCase() + user.userName.slice(1)
                : ""}{" "}
              🎉
            </p>
            <br />
            <p className="subtitle">
              You have sold a total of{" "}
              <em>
                <strong> {totalUnitsSold} </strong>
              </em>
              units
            </p>
            <br />
            <button
              className="button is-light is-rounded"
              onClick={handleSearchClick}
            >
              Add A New Product
            </button>
          </div>
        </div>
        <div>
          <p className="title has-text-centered is-rounded">
            <strong>All Your Products</strong>{" "}
          </p>
          <br />
        </div>
        <div className="container">
          <div className="columns is-multipline is-mobile is-centered is-two-third-tablet has-text-centered">
            {products.length ? (
              products.map((product: any) => (
                <SellerProductCard
                  key={product._id}
                  {...product}
                />
              ))
            ) : (
              <p> Add your first product by clicking the button above! 🎉</p> 
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default SellerHome;
