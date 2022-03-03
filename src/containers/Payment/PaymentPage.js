import React from "react";
import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useParams } from "react-router";
import { toast } from "react-toastify";

function PaymentPage({ authToken, product, setProduct }) {
  const stripe = useStripe();
  const elements = useElements();

  const { id } = useParams();

  const [buyerProtect, setBuyerProtect] = useState(0.8);
  const [cost, setCost] = useState(1.8);
  const [completed, setCompleted] = useState(false);

  const [errorMessge, setErrorMessage] = useState("");

  const total = cost + buyerProtect + product.product_price;
  // https://ryan-minted.herokuapp.com/payment

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, {
      name: id,
    });

    if (!stripeResponse.token) {
      setErrorMessage(stripeResponse.error.message);
      toast.error(stripeResponse.error.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const stripeToken = stripeResponse.token.id;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}payment`,
          {
            stripeToken,
            price: product.product_price,
            description: product.product_description,
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        if ((response.data.status = "succeeded")) {
          setCompleted(true);
          toast.success("Produit acheter", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Une erreur c'est produit veuillez réessayer", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  return (
    <div className="PaymentPage">
      <div className="box-payment">
        <span>Résumer de la commande :</span>
        <div className="payment-info">
          <h2>{product.product_name}</h2>
          <div>
            <h3>Commande</h3> <span>{product.product_price} €</span>
          </div>
          <div>
            <h3>Frais de protection acheteur</h3>
            <span>{buyerProtect.toFixed(2)} €</span>
          </div>
          <div>
            <h3>Frais de port</h3>
            <span>{cost.toFixed(2)} €</span>
          </div>
          <hr />
        </div>
        <div className="payment-total">
          <h4>Total</h4>
          <span>{total.toFixed(2)} €</span>
        </div>
        <div>
          {!completed ? (
            <form onSubmit={handleSubmit}>
              <div className="card-box">
                <CardElement />
              </div>
              <button type="submit">Valider</button>
            </form>
          ) : (
            <span>Paiment effectué !</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
