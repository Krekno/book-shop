import React, { useContext, useState, useEffect } from "react"
import { CartContext } from "../CartContext"
import { Link } from "react-router-dom"
import axios from "axios" // Import axios

const ProductListing = () => {
	const [books, setBooks] = useState([])
	const [categories, setCategories] = useState([])
	const [filters, setFilters] = useState({ category: "" })
	const { addToCart } = useContext(CartContext)

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await axios.get("https://springboot-e-commerce-project.onrender.com/book/get-all-book")
				const data = response.data
				console.log(data)
				setBooks(data)

				const uniqueCategories = [...new Set(data.map((book) => book.category))]
				setCategories(uniqueCategories)
			} catch (error) {
				console.error("Error fetching books:", error)
			}
		}

		fetchBooks()
	}, [])

	const filteredBooks = books.filter((book) => (filters.category ? book.category === filters.category : true))

	return (
		<div className="container mt-5">
			<div className="row">
				{/* Filter Sidebar */}
				<aside className="col-md-3 mb-4">
					<h5>Filters</h5>
					<div className="card shadow-sm">
						<div className="card-body">
							{/* Dynamically render categories */}
							{categories.map((category) => (
								<div key={category} className="form-check">
									<input
										type="radio"
										className="form-check-input"
										id={category}
										name="category"
										checked={filters.category === category}
										onChange={() =>
											setFilters({
												...filters,
												category: category
											})
										}
									/>
									<label className="form-check-label" htmlFor={category}>
										{category}
									</label>
								</div>
							))}
						</div>
					</div>
				</aside>

				{/* Product Grid */}
				<main className="col-md-9">
					<div className="row g-4">
						{filteredBooks.map((book) => (
							<div key={book.isbn} className="col-md-4">
								<div className="card h-100 shadow-sm">
									<Link to={`/products/${book.id}`} className="text-decoration-none text-dark">
										<img src={book.image} alt={book.title} className="card-img-top img-fluid" />
										<div className="card-body">
											<h5 className="card-title">{book.title}</h5> <p className="card-text">${book.price}</p>{" "}
										</div>
									</Link>
									<div className="card-footer bg-transparent border-top-0">
										<button className="btn btn-outline-primary w-100" onClick={() => addToCart(book)}>
											Add to Cart
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</main>
			</div>
		</div>
	)
}

export default ProductListing
