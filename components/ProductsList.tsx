import React from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "../interfaces/productInterface";

type Products = null | Array<IProduct>;

function ProductsList() {
  const [products, setProducts] = React.useState<Products>([]);
  const [search, setSearch] = React.useState("");
  const [value, setValue] = React.useState("");

  // FUNCTION TO RETURN ALL DATA
  React.useEffect(() => {
    async function fetchProducts() {
      const resp = await fetch("/api/products");
      const data = await resp.json();
      console.log("fetch 1", data);
      setProducts(data);
    }
    fetchProducts();
  }, []);
  console.log(products);
  console.log(
    "this is the products",
    products?.map((product) => {
      return product.category;
    })
  );

  function handleDropdownChange(e: any) {
    setValue(e.currentTarget.value);
  }
  function handleSearchBarChange(e: any) {
    setSearch(e.currentTarget.value);
  }

  const dropdownCategoryOptions = [
    { label: "Select Category", value: "" },
    { label: "Pastries", value: "Pastries" },
    { label: "Cheese", value: "Cheese" },
    { label: "Chocolate", value: "Chocolate" },
  ];

  function filterProducts() {
    return products?.filter((product: any) => {
      return (
        (search === "" ||
          product.title.toLowerCase().includes(search.toLowerCase())) &&
        (value === "" || product.category.includes(value))
      );
    });
  }
  console.log("value in drop down", value);
  return (
    <>
      <section className="hero">
        <figure className="image image is-3by1">
          <img src="../img/list-page-banner.jpg" />
        </figure>
      </section>

      <section>
        <div className="columns is-1 is-mobile is-centered pt-6">
          {/* <div className="column is-one-fifth"></div> */}
          {/* search bar */}
          <div className="column is-two-thirds">
            {" "}
            <input
              className="input is-warning is-rounded is-focused mr-2 "
              placeholder="Search Product"
              type="text"
              onChange={handleSearchBarChange}
              id="searchBar"
              name="searchBar"
            />
          </div>
          <div className="column is-one-fifth ">
            {" "}
            <div className="select is-rounded ">
              <label className="column drop select  is-info mb-4 p-0 is-full">
                <select
                  value={value}
                  onChange={handleDropdownChange}
                  className="has-background-warning has-text-dark"
                >
                  {dropdownCategoryOptions.map((option: any) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div>
          <div className="columns is-multiline">
            {filterProducts()?.map((product: any) => {
              return (
                <ProductCard
                  key={product._id}
                  {...product}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductsList;
