import React from "react";
import { useContext } from "react";
import { CartContext } from "../CartContext";

const Cart = () => {
	const { cartItems, removeFromCart } = useContext(CartContext);

	return (
		<div className="cart-page">
			<h1>Your Cart</h1>
			{cartItems.map((item) => (
				<div key={item.id} className="cart-item">
					<img src={item.image} alt={item.name} />
					<div>
						<h3>{item.name}</h3>
						<p>
							${item.price} x {item.quantity}
						</p>
						<button onClick={() => removeFromCart(item.id)}>
							Remove
						</button>
					</div>
				</div>
			))}
			<div className="cart-total">
				Total: $
				{cartItems.reduce(
					(acc, item) => acc + item.price * item.quantity,
					0
				)}
			</div>
			<button className="btn-primary">Proceed to Checkout</button>
		</div>
	);
};

export default Cart;
