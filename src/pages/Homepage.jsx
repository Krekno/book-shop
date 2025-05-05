import React from "react"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../CartContext"
import products from "../data/products"

const Homepage = () => {
	return (
		<section className="container mt-5">
			<h2 className="mb-4">🌟 Featured Products</h2>
			<div className="row">
				{products.slice(0, 4).map((product) => (
					<div key={product.id} className="col-md-6 col-lg-3 mb-4">
						<ProductCard product={product} />
					</div>
				))}
			</div>
		</section>
	)
}

const ProductCard = ({ product }) => {
	const { addToCart } = useContext(CartContext)

	return (
		<div className="card h-100 shadow-sm">
			<Link
				to={`/products/${product.id}`}
				className="text-decoration-none text-dark">
				<img
					src={product.image}
					alt={product.name}
					className="card-img-top img-fluid"
				/>
				<div className="card-body">
					<h5 className="card-title">{product.name}</h5>
					<p className="card-text">${product.price}</p>
				</div>
			</Link>
			<div className="card-footer bg-transparent border-top-0">
				<button
					className="btn btn-outline-primary w-100"
					onClick={() => addToCart(product)}>
					Add to Cart
				</button>
			</div>
		</div>
	)
}

export default Homepage
