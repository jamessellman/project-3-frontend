import React from "react";
import { IProduct } from "../interfaces/productInterface";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";
import {baseUrl} from "../src/config"

type ISelectedCountry = string;

function Checkout({ price, title, _id }: IProduct) {
  const [selectedCountry, setSelectedCountry] =
    React.useState<ISelectedCountry>("1");
  const [selectTermsAndConditions, setSelectTermsAndConditions] =
    React.useState(false);
  const [deliveryCost, setDeliveryCost] = React.useState<number>(0);

  const navigate = useNavigate();
  const { width, height } : any = useWindowSize();

  function selectCountry(e: any) {
    const country = e.currentTarget.value;
    setSelectedCountry(country);
    updateDeliveryCost(country);
  }

  function updateDeliveryCost(country: string) {
    const selectedOption = document.querySelector(`option[value="${country}"]`);
    if (selectedOption && selectedOption.classList.contains("europe")) {
      setDeliveryCost(10);
    } else if (selectedOption && selectedOption.classList.contains("uk")) {
      setDeliveryCost(0);
    } else {
      setDeliveryCost(20);
    }
  }

  function conditions() {
    if (!selectTermsAndConditions) {
      setSelectTermsAndConditions(true);
    } else {
      setSelectTermsAndConditions(false);
    }
  }

  async function completePurchase() {
    const resp = await fetch(`${baseUrl}/products/${_id}`);
    const data = await resp.json();
    data.unitsSold++;
    const update = await axios.post(`${baseUrl}/unitsSold/${_id}`, {
      unitsSold: data.unitsSold,
    });
    setModalIsActive(true);
  }

  const [modalIsActive, setModalIsActive] = React.useState(false);

  function closeModal() {
    setModalIsActive(false);
  }

  function continueShopping() {
    navigate("/products");
  }

  return (
    <>
      <div className={`modal ${modalIsActive && "is-active"}`}>
        <Confetti width={width} height={height} />
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Your order is complete! 🎉</p>
            <button
              onClick={closeModal}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            A confirmation email is on its way to you 🤓
          </section>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button
                onClick={continueShopping}
                className="button is-dark is-rounded"
              >
                Continue Shopping
              </button>
            </div>
          </footer>
        </div>
      </div>
      <hr></hr>
      <div className="field mt-5">
        <label className="label">Name</label>
        <div className="control">
          <input type="text" placeholder="Enter name here" className="input" />
        </div>
      </div>

      <div className="field mt-5">
        <label className="label">Email</label>
        <div className="control">
          <input type="text" placeholder="Enter name here" className="input" />
        </div>
      </div>

      <div className="field mt-5">
        <label className="label">Card Number</label>
        <div className="control">
          <input
            type="text"
            placeholder="16 digit card number"
            className="input"
          />
        </div>
      </div>

      <div className="field mt-5 is-grouped">
        <div className="control">
          <label className="label">Expiry Date</label>
          <div className="control">
            <input type="text" placeholder="DD/MM/YY" className="input" />
          </div>
        </div>
        <div className="control">
          <label className="label">CVC</label>
          <div className="control">
            <input type="text" placeholder="123" className="input" />
          </div>
        </div>
      </div>

      <div className="field mt-5">
        <label className="label">Delivery Address</label>
        <div className="control">
          <input
            type="text"
            placeholder="House name/number"
            className="input mt-1"
          />
          <input type="text" placeholder="Street" className="input mt-1" />
          <input type="text" placeholder="Town/city" className="input mt-1" />
          <input type="text" placeholder="Postcode" className="input mt-1" />
        </div>
      </div>
      <div className="field mt-1">
        <p className="control has-icons-left">
          <span className="select">
            <select value={selectedCountry} onChange={selectCountry}>
              <option value="1" disabled>
                Country
              </option>
              <option className="europe" value="andorra">
                Andorra
              </option>
              <option className="europe" value="austria">
                Austria
              </option>
              <option className="europe" value="Belarus">
                Belarus
              </option>
              <option className="europe" value="Bulgaria">
                Bulgaria
              </option>
              <option className="europe" value="Croatia">
                Croatia
              </option>
              <option className="europe" value="Cyprus">
                Cyprus
              </option>
              <option className="europe" value="czech-republic">
                Czech Republic
              </option>
              <option className="europe" value="denmark">
                Denmark
              </option>
              <option className="europe" value="estonia">
                Estonia
              </option>
              <option className="europe" value="finland">
                Finland
              </option>
              <option className="europe" value="France">
                France
              </option>
              <option className="europe" value="Germany">
                Germany
              </option>
              <option className="europe" value="Greece">
                Greece
              </option>
              <option className="europe" value="Hungary">
                Hungary
              </option>
              <option className="europe" value="Iceland">
                Iceland
              </option>
              <option className="europe" value="Ireland">
                Ireland
              </option>
              <option className="europe" value="Isle-of-Man">
                Isle of Man
              </option>
              <option className="europe" value="Italy">
                Italy
              </option>
              <option className="europe" value="Latvia">
                Latvia
              </option>
              <option className="europe" value="Liechtenstein">
                Liechtenstein
              </option>
              <option className="europe" value="Lithuania">
                Lithuania
              </option>
              <option className="europe" value="Luxembourg">
                Luxembourg
              </option>
              <option className="europe" value="Norway">
                Norway
              </option>
              <option className="europe" value="Poland">
                Poland
              </option>
              <option className="europe" value="Portugal">
                Portugal
              </option>
              <option className="europe" value="Romania">
                Romania
              </option>
              <option className="europe" value="Russia">
                Russia
              </option>
              <option className="europe" value="Slovakia">
                Slovakia
              </option>
              <option className="europe" value="Slovenia">
                Slovenia
              </option>
              <option className="row" value="south-africa">
                South Africa
              </option>
              <option className="europe" value="spain">
                Spain
              </option>
              <option className="europe" value="sweden">
                Sweden
              </option>
              <option className="europe" value="switzerland">
                Switzerland
              </option>
              <option className="europe" value="turkey">
                Turkey
              </option>
              <option className="uk" value="united-kingdom">
                United Kingdom
              </option>
              <option className="row" value="united-states">
                United States
              </option>
            </select>
          </span>
          <span className="icon is-small is-left">🌐</span>
        </p>
      </div>
      <hr />
      <p className="subtitle has-text-grey-dark is-3 mt-5"> Total</p>
      <p className="mt-2 has-text-darker">
        <strong>
          {title}: £<span>{price.toLocaleString()}</span>
        </strong>
      </p>
      <p className="mt-2 has-text-darker">
        <strong>Delivery: </strong>£<span>{deliveryCost.toLocaleString()}</span>
      </p>
      <p className="mt-2 has-text-darker">
        <strong className="has-text-grey-dark">Total: </strong>£
        <span>{Number(price + deliveryCost).toLocaleString()}</span>
      </p>

      <div className="field mt-5">
        <div className="control">
          <label className="checkbox has-text-grey">
            <input type="checkbox" onClick={conditions} /> I agree to the{" "}
            <a className="terms-and-conditions" href="#">
              terms and conditions
            </a>
          </label>
        </div>
      </div>
      {selectTermsAndConditions &&  (
        <button onClick={completePurchase} className="button is-link mt-5">
          Complete Purchase
        </button>
      )}
    </>
  );
}

export default Checkout;
