import React from "react"
import { useEffect, useState } from "react"
export default function Orders({ role }) {
	const [orders, setOrders] = useState([])

	const endpoint =
		role === "ROLE_ADMIN"
			? "https://springboot-e-commerce-project-sab4.onrender.com/order/all-orders"
			: "https://springboot-e-commerce-project-sab4.onrender.com/order/my-orders"

	useEffect(() => {
		const getOrders = async () => {
			try {
				const response = await axios.get(
					endpoint,
					{},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`
						}
					}
				)

				getOrders()

				if (response.status === 200) {
					const data = response.data
					setOrders(data)
				}
			} catch (error) {
				console.error("Error fetching orders:", error)
				return
			}
		}
	}, [])

	return (
		<div className="container py-5">
			<h1 className="mb-4 fw-bold">📚 Your Orders</h1>

			{orders.length === 0 ? (
				<div className="alert alert-info">No orders found.</div>
			) : (
				<div className="row g-4">
					{orders.map((order) => (
						<div className="col-md-6" key={order.orderId}>
							<div className="card h-100">
								<div className="card-body">
									<div className="d-flex justify-content-between mb-2">
										<div>
											<h5 className="card-title">Order #{order.orderId}</h5>
											<p className="text-muted small mb-1">Date: {new Date(order.createdAt).toLocaleString()}</p>
											<p className="text-muted small mb-1">Email: {order.email}</p>
										</div>
										<span className="badge bg-secondary align-self-start">{order.status}</span>
									</div>
									<h6 className="mt-3">Items:</h6>
									<ul className="list-group list-group-flush mb-3">
										{order.items.map((item, idx) => (
											<li key={idx} className="list-group-item px-0 py-1">
												{item.productName} × {item.quantity}
											</li>
										))}
									</ul>
									<p className="fw-bold text-end mb-0">Total: ${order.totalPrice.toFixed(2)}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
