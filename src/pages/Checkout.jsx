import React from "react";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
	const navigate = useNavigate();
	const { cartItems } = useContext(CartContext);
	const total = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add your payment processing logic here
		alert("Payment successful!");
		navigate("/confirmation");
	};

	return (
		<div className="checkout-page">
			<h1>Checkout</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Name</label>
					<input type="text" required />
				</div>
				<div className="form-group">
					<label>Email</label>
					<input type="email" required />
				</div>
				<div className="form-group">
					<label>Shipping Address</label>
					<input type="text" required />
				</div>
				<div className="order-summary">
					<h2>Order Summary</h2>
					<p>Total: ${total.toFixed(2)}</p>
				</div>
				<button type="submit" className="btn-primary">
					Place Order
				</button>
			</form>
		</div>
	);
};

export default Checkout;
