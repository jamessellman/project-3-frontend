import axios from "axios";
import React, { SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../interfaces/productInterface";

function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  console.log(productId);

  const [formData, setFormData] = React.useState<IProduct>({
    title: "",
    price: Number(""),
    image: "",
    description: "",
    category: "",
    user: "",
    unitsSold: Number(""),
    _id: "",
    reviews: [],
  });

  console.log(formData);

  React.useEffect(() => {
    async function fetchProducts() {
      const resp = await fetch(`/api/products/${productId}`);
      const productData = await resp.json();
      setFormData(productData);
    }
    fetchProducts();
  }, []);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const resp = await axios.put(`/api/products/${productId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate(`/product/${productId}`);
  }

  function handleChange(e: any) {
    const fieldName = e.currentTarget.name;
    const newFormData: any = structuredClone(formData);
    if (newFormData)
      newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
  }

  return (
    <div className="section has-background-link">
      <p className="title has-text-centered mb-5"> Edit your product here ✍️</p>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input
                className="input is-rounded"
                type="text"
                name={"title"} 
                onChange={handleChange}
                value={formData.title} 
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                className="input is-rounded"
                type="text"
                name={"price"} 
                onChange={handleChange}
                value={formData.price} 
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Image URL</label>
            <div className="control">
              <input
                className="input is-rounded"
                type="text" 
                name={"image"} 
                onChange={handleChange}
                value={formData.image} 
              />
            </div>
          </div>
          <div className="field is-rounded">
            <label className="label">Description</label>
            <div className="control">
              <input
                className="input is-rounded"
                type="text" 
                name={"description"} 
                onChange={handleChange}
                value={formData.description} 
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <input
                className="input is-rounded"
                type="text"
                name={"category"} 
                onChange={handleChange}
                value={formData.category} 
              />
            </div>
          </div>
          <button className="button is-rounded is-light mt-5">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
