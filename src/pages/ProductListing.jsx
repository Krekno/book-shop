import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { CartContext } from "../CartContext";
import products from "../data/products";

const ProductListing = () => {
	const [filters, setFilters] = useState({});
	const { addToCart } = useContext(CartContext);

	// Filter implementation here...

	return (
		<div className="product-listing">
			<aside className="filters">{/* Filter options go here */}</aside>
			<main className="product-grid">
				{products.map((product) => (
					<div key={product.id} className="product-item">
						<img src={product.image} alt={product.name} />
						<h3>{product.name}</h3>
						<p>${product.price}</p>
						<button onClick={() => addToCart(product)}>
							Add to Cart
						</button>
					</div>
				))}
			</main>
		</div>
	);
};

export default ProductListing;
