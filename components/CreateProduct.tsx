import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    unitsSold: "",
    category: "",
  });

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    newFormData.unitsSold = "0";
    setFormData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const resp = await axios.post("/api/products", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate("/sellerhome");
  }


  const isFormComplete =
    formData.title &&
    formData.price &&
    formData.image &&
    formData.description &&
    formData.category;

  return (
    <div className="section has-background-link">
      <p className="title has-text-centered has-text-white mb-5">
        {" "}
        Create a Product ⬇️
      </p>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input
                className="input is-rounded"
                type="text"
                placeholder="Product Name"
                name={"title"} 
                onChange={handleChange}
                value={formData.title} 
              />
            </div>
          </div>
          <div className="field mt-3">
            <label className="label">Price</label>
            <div className="control">
              <input
                className="input is-rounded"
                placeholder="Product Price"
                type="text"
                name={"price"} 
                onChange={handleChange}
                value={formData.price} 
              />
            </div>
          </div>
          <div className="field mt-3">
            <label className="label">Image URL</label>
            <div className="control">
              <input
                className="input is-rounded"
                placeholder="Product image link"
                type="text" 
                name={"image"} 
                onChange={handleChange}
                value={formData.image} 
              />
            </div>
          </div>
          <div className="field mt-3">
            <label className="label">Description</label>
            <div className="control">
              <input
                className="input is-rounded"
                placeholder="Product Description"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field mt-3">
            <label className="label">Category</label>
            <div className="control">
              <select
                className="input is-rounded "
                onChange={handleChange}
              >
                <option value="">Select a category ⬇️</option>
                <option value="Pastries">Pastries</option>
                <option value="Cheese">Cheese</option>
                <option value="Chocolate">Chocolate</option>
              </select>
            </div>
          </div>
          <button
            className="button mt-5 is-rounded is-light"
            type="submit"
            disabled={!isFormComplete}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
