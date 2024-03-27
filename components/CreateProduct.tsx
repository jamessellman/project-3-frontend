import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();
  // ! Our state should look like a movie now.
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
    // ! We now need to provide a TOKEN in the request. We get this from localStorage
    const token = localStorage.getItem("token");
    // ? If you do need to send the year back as a number, this is how you would do it.
    // const newFormData = structuredClone(formData)
    // newFormData.year = Number(newFormData.year)

    // ! Here we attach the token to the request to the API.
    const resp = await axios.post("/api/products", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(resp.data);
    // ! We're now going to movies
    navigate("/sellerhome");
  }

  console.log(formData);

  const isFormComplete =
    formData.title &&
    formData.price &&
    formData.image &&
    formData.description &&
    formData.category;

  return (
    <div className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"title"} // ! Updating name field to the right name
                onChange={handleChange}
                value={formData.title} // ! Updating the value to the right bit of formData
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Price</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"price"} // ! Updating name field to the right name
                onChange={handleChange}
                value={formData.price} // ! Updating the value to the right bit of formData
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Image URL</label>
            <div className="control">
              <input
                className="input"
                type="text" // ! No longer a password field
                name={"image"} // ! Updating name field to the right name
                onChange={handleChange}
                value={formData.image} // !  Updating the value to the right bit of formData
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                className="input"
                type="text" // ! No longer a password field
                name={"description"} // ! Updating name field to the right name
                onChange={handleChange}
                value={formData.description} // !  Updating the value to the right bit of formData
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <select
                className="input"
                // type="text"
                name={"category"} // ! Updating name field to the right name
                onChange={handleChange}
                value={formData.category} // ! Updating the value to the right bit of formData
              >
                <option value="">Select a cateogry</option>
                <option value="Pastries">Pastries</option>
                <option value="Cheese">Cheese</option>
                <option value="Meat">Chocolate</option>
              </select>
            </div>
          </div>
          <button className="button" type="submit" disabled={!isFormComplete}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
