import React, { useState, useEffect } from "react"
import moment from "moment"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
	const startTime = moment(booking.startTime)

	const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)
	const navigate = useNavigate()

    const handleConfirmBooking = () => {
		setIsProcessingPayment(true)
		setTimeout(() => {
			setIsProcessingPayment(false)
			setIsBookingConfirmed(true)
			onConfirm()
		}, 3000)
	}
    useEffect(() => {
		if (isBookingConfirmed) {
			navigate("/booking-success")
		}
	}, [isBookingConfirmed, navigate])

    return (
		<div className="row">
			<div className="col-md-6"></div>
			<div className="card card-body mt-5">
				<h4 className="card-title main-color">Reservation Summary</h4>
				<p>
					Name: <strong>{booking.name}</strong>
				</p>
				<p>
					Email: <strong>{booking.email}</strong>
				</p>
				<p>
                Date: <strong>{moment(booking.startTime).format("MMM Do YYYY, h:mm a")}</strong>
				</p>
				

				<div>
					<h5 className="main-color">Number of Players</h5>
					<strong>
						{booking.numOfPeople}
					</strong>
					
				</div>

				
						<p>
							Total payment: <strong>${payment}</strong>
						</p>

						{isFormValid && !isBookingConfirmed ? (
							<Button variant="success" onClick={handleConfirmBooking}>
								{isProcessingPayment ? (
									<>
										<span
											className="spinner-border spinner-border-sm mr-2"
											role="status"
											aria-hidden="true"></span>
										Booking Confirmed, redirecting to payment...
									</>
								) : (
									"Confirm Booking & proceed to payment"
								)}
							</Button>
						) : isBookingConfirmed ? (
							<div className="d-flex justify-content-center align-items-center">
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						) : null}
					
			</div>
		</div>
	)
}

export default BookingSummary