import React from "react"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../CartContext"

const ProductDetail = ({ books }) => {
	const { id } = useParams()
	const { addToCart } = useContext(CartContext)
	const book = books.find((p) => p.isbn === parseInt(id))

	return (
		<div className="container mt-5">
			<div className="row">
				{/* Product Image Section */}
				<div className="col-md-6 mb-4">
					<div className="image-gallery">
						<img src={book.image} alt={book.name} className="img-fluid rounded" />
					</div>
				</div>

				{/* Product Info Section */}
				<div className="col-md-6">
					<div className="card h-100 shadow-sm">
						<div className="card-body">
							<h1 className="card-title">{book.title}</h1>
							<p className="card-text text-muted">${book.price}</p>
							<p className="card-text">{book.description}</p>
							<button className="btn btn-primary w-100" onClick={() => addToCart(book)}>
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
