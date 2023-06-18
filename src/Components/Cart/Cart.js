import React, { useContext } from "react";
import { BsBag } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import "./Cart.css";
import productsContext from "../../Contexts/ProductsContext";

export default function Cart() {
  const contextData = useContext(productsContext);

  const removeProductFromCart = (productId) => {
    const updatedCart = contextData.userCart.filter(
      (product) => product.id !== productId
    );
    contextData.setUserCart(updatedCart);
  };

  const increaseProductCount = (productId) => {
    const updatedCart = contextData.userCart.map((product) => {
      if (product.id === productId) {
        return { ...product, count: product.count + 1 };
      }
      return product;
    });
    contextData.setUserCart(updatedCart);
  };

  const decreaseProductCount = (productId) => {
    const updatedCart = contextData.userCart.map((product) => {
      if (product.id === productId) {
        if (product.count === 1) {
          // If count is 1, remove the product from the cart
          removeProductFromCart(productId);
        } else {
          return { ...product, count: product.count - 1 };
        }
      }
      return product;
    });
    contextData.setUserCart(updatedCart);
  };

  return (
    <aside className={`${contextData.isShowCart ? "active" : ""} bag-sidebar`}>
      {/* add active class to show bag sidebar */}
      <h3 className="bag-title">
        <span>
          <BsBag />
          Bag
        </span>
        <span>
          <AiOutlineClose
            className="close-icon"
            onClick={() => {
              contextData.setIsShowCart(false);
            }}
          />
        </span>
      </h3>
      <div className="row bag-wrapper">
        {contextData.userCart.map((product) => (
          <div className="col-12 mt-5" key={product.id}>
            <div className="card py-3 px-3">
              <div className="col-12 text-center">
                <img
                  src={product.img}
                  alt="Product images"
                  className="cart-img-top w-75"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <p className="card-text">{product.title}</p>
                <p className="price">{product.price}$</p>
                <br />
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-warning m-1 p-2 d-flex align-items-center" style={{ height: "20px" }}
                    onClick={() => decreaseProductCount(product.id)}
                  >
                    -
                  </button>
                  <span className="number">{product.count}</span>
                  <button
                    className="btn btn-warning btn-sm m-1 p-2 d-flex align-items-center" style={{ height: "20px" }}
                    onClick={() => increaseProductCount(product.id)}
                  >
                    +
                  </button>
                </div>
                <a
                  href="#"
                  className="btn btn-danger mt-3"
                  onClick={() => removeProductFromCart(product.id)}
                >
                  Remove
                </a>
                <a
                  href="#"
                  className="btn btn-outline-dark mt-2 text-capitalize"
                >
                  More Information
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}


