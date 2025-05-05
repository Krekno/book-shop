import React from "react"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../CartContext"
import products from "../data/products"

const ProductDetail = () => {
	const { id } = useParams()
	const product = products.find((p) => p.id === parseInt(id))
	const { addToCart } = useContext(CartContext)

	return (
		<div className="container mt-5">
			<div className="row">
				{/* Product Image Section */}
				<div className="col-md-6 mb-4">
					<div className="image-gallery">
						<img
							src={product.image}
							alt={product.name}
							className="img-fluid rounded"
						/>
					</div>
				</div>

				{/* Product Info Section */}
				<div className="col-md-6">
					<div className="card h-100 shadow-sm">
						<div className="card-body">
							<h1 className="card-title">{product.name}</h1>
							<p className="card-text text-muted">
								${product.price}
							</p>
							<p className="card-text">{product.description}</p>
							<button
								className="btn btn-primary w-100"
								onClick={() => addToCart(product)}>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductDetail
