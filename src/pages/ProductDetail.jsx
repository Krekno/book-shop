import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import products from "../data/products";

const ProductDetail = () => {
	const { id } = useParams();
	const product = products.find((p) => p.id === parseInt(id));
	const { addToCart } = useContext(CartContext);

	return (
		<div className="product-detail">
			<div className="image-gallery">
				<img src={product.image} alt={product.name} />
			</div>
			<div className="product-info">
				<h1>{product.name}</h1>
				<p>${product.price}</p>
				<p>{product.description}</p>
				<button onClick={() => addToCart(product)}>Add to Cart</button>
			</div>
		</div>
	);
};

export default ProductDetail;
