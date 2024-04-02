import React from "react";
import { useNavigate } from "react-router-dom";
import HomePageProductCard from "./ProductCategoryCard";
import axios from "axios";
import {baseUrl} from "../src/config"

function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);

  async function fetchCategories() {
    const resp = await axios.get(`${baseUrl}/categories`);
    setCategories(resp.data);
  }

  console.log(categories);

  React.useEffect(() => {
    console.log("The Home Page has mounted");
    fetchCategories();
  }, []);

  console.log(`These have categories been fetched: ${categories}`);

  function handleSearchClick() {
    navigate("/products");
  }

  return (
    <>
      <section className="hero is-link is-fullheight-with-navbar is-link bg-img">
        <div className="hero-body has-text-centered">
          <div className="container">
            <p className="title">GourmetVoyage</p>
            <br />
            <p className="subtitle">
              PERFECT FOR ANY OCCASION, FROM CAFÉ TO FINE DINING
            </p>
            <br />
            <button
              className="button is-light is-rounded"
              onClick={handleSearchClick}
            >
              Shop All
            </button>
          </div>
        </div>

        <div>
          <p className="title has-text-centered is-rounded">
            <strong>Shop by Category</strong>{" "}
          </p>
          <br />
        </div>
        <div className="container">
          <div className="columns is-multipline is-mobile is-centered is-two-third-tablet has-text-centered">
            {categories.map((category, index) => (
              <div key={index}>
                <HomePageProductCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
