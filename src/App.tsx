import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductsList";
import UserSignup from "../components/Signup";
import Login from "../components/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateProduct from "../components/CreateProduct";
import ShowProduct from "../components/ShowProduct";
import SellerHome from "../components/SellerHomePage";

function App() {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    const token = localStorage.getItem("token");
    const resp = await axios.get("/api/signup", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(resp.data);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchUser();
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<Login fetchUser={fetchUser} />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route
          path="/product/:productId"
          element={<ShowProduct user={user} />}
        />
        <Route path="/sellerhome" element={<SellerHome />} />
        {/* <Route path="/checkout" element={<Checkout />} />
        <Route path="/editproduct/:productId" element={<EditProduct />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
