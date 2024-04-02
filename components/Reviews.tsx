import React, { SyntheticEvent } from "react";
import { IProduct } from "../interfaces/productInterface";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {baseUrl} from "../src/config"

interface IReview {
  name: string;
  review: string;
}

function Reviews({ _id, reviews }: IProduct) {
  const [displayedReviews, setDisplayedReviews] =
    React.useState<Array<IReview> | null>(null);

  const [textInput, setTextInput] = React.useState({
    name: "",
    review_text: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  async function getReviews() {
    const resp = await fetch(`${baseUrl}/products/${_id}`);
    const product = await resp.json();
    console.log(product);
    setDisplayedReviews(product.reviews);
  }

  React.useEffect(() => {
    getReviews();
  }, []);

  function handleChange(e: any) {
    const fieldName = e.currentTarget.name;
    console.log(e.currentTarget.value);
    let newTextInput = structuredClone(textInput);
    newTextInput[fieldName as keyof typeof textInput] = e.currentTarget.value;
    setTextInput(newTextInput);
    if (newTextInput.name && newTextInput.review_text) {
      setIsButtonDisabled(false);
    }
  }

  async function handleClick(e: SyntheticEvent) {
    e.preventDefault();
    await axios.put(`${baseUrl}/reviews/${_id}`, {
      reviews: [{ name: textInput.name, review: textInput.review_text }],
    });
    window.location.reload();
    getReviews();
    setIsButtonDisabled(true);
    setTextInput({
      name: "",
      review_text: "",
    });
  }

  return (
    <section className="mt-5">
      <div>
        <p className="subtitle is-4 has-text-grey mb-3">Reviews</p>
      </div>

      <textarea
        className="textarea"
        placeholder="Leave your review here"
        onChange={handleChange}
        name={"review_text"}
      ></textarea>
      <input
        className="input mt-1"
        type="text"
        placeholder="Your name"
        onChange={handleChange}
        name={"name"}
      />
      <button
        className="button has-background-warning-dark has-text-centered is-rounded mt-4"
        onClick={handleClick}
        disabled={isButtonDisabled}
      >
        Post Review
      </button>
      {reviews &&
        reviews.map((item: any) => {
          return (
            <>
              <article className="mt-5 message has-text-grey">
                <div className="subtitle mt-5"> Posted Reviews :</div>
                <div className="message-header has-text-warning">
                  {item.name}{" "}
                  <small>
                    Posted on {item.date} at {item.time}
                  </small>
                </div>
                <div className="message-body">{item.review}</div>
              </article>
            </>
          );
        })}
    </section>
  );
}

export default Reviews;
