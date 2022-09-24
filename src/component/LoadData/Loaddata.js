import React, { useEffect, useState } from "react";
import "./Loaddata.css";
const Loaddata = () => {
  const [cosmetics, SetCosmetics] = useState([]);
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => SetCosmetics(data));
  }, []);
  return (
    <div>
      {cosmetics.map((cosmetic) => (
        <SingleData key={cosmetic.id} cosmetic={cosmetic}></SingleData>
      ))}
    </div>
  );
};

const SingleData = (props) => {
  // console.log(props.cosmetic);
  const { id, price, name } = props.cosmetic;
  return (
    <div className="cosmetic">
      <h1>Name : {name}</h1>
      <p>Price : {price}</p>
      <p>Id : {id}</p>
      <button onClick={() => addToDb(id)}>Add To Cart</button>
      <button onClick={() => removeFromDb(id)}>Remove To Cart</button>
      <button onClick={() => deleteShoppingCart()}>Delete All To Cart</button>
    </div>
  );
};

const addToDb = (id) => {
  let shoppingCart = {};
  // get the shopping Cart
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  } else {
    shoppingCart = {};
  }
  // add Quantity
  const quantity = shoppingCart[id];
  if (quantity) {
    const newQuantity = quantity + 1;
    // const newQuantity = parseInt(quantity) + 1;
    // localStorage.setItem(id, newQuantity);
    shoppingCart[id] = newQuantity;
  } else {
    // localStorage.setItem(id, 1);
    shoppingCart[id] = 1;
  }
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

const removeFromDb = (id) => {
  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    const shoppingCart = JSON.parse(storedCart);
    if (id in shoppingCart) {
      delete shoppingCart[id];
      localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
    }
  }
};
const deleteShoppingCart = () => {
  localStorage.removeItem("shopping-cart");
};

export default Loaddata;
