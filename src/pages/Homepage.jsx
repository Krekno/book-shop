import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import products from "../data/products";

const Homepage = () => {
	return (
		<>
			<section className="hero">
				<div className="hero-content">
					<h1>Summer Sale!</h1>
					<p>Up to 50% off on all items</p>
					<Link to="/products" className="btn-primary">
						Shop Now
					</Link>
				</div>
			</section>

			<section className="featured-products">
				<h2>Featured Products</h2>
				<div className="product-grid">
					{products.slice(0, 4).map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</section>
		</>
	);
};

const ProductCard = ({ product }) => {
	const { addToCart } = useContext(CartContext);

	return (
		<div className="product-card">
			<img src={product.image} alt={product.name} />
			<h3>{product.name}</h3>
			<p>${product.price}</p>
			<button onClick={() => addToCart(product)}>Add to Cart</button>
		</div>
	);
};

export default Homepage;
