import React, { useEffect } from "react"
import moment from "moment"
import { useState } from "react"
import { Form, FormControl, Button } from "react-bootstrap"
import BookingSummary from "./BookingSummary"
import { bookRoom, getRoomById } from "../utils/ApiFunctions"
import { useNavigate, useParams } from "react-router-dom"

const BookingForm = () => {
	const [validated, setValidated] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [roomPrice, setRoomPrice] = useState(0)
	const openingHoursStart = moment("11:00 AM", "h:mm A");
    const openingHoursEnd = moment("12:00 PM", "h:mm A");


	const [booking, setBooking] = useState({
		name: "",
		email: "",
		startTime: "",
		numOfPeople: "",
	})
   
    const { roomId } = useParams()
    const navigate = useNavigate()


    const handleInputChange = (e) => {
		const { name, value } = e.target
		setBooking({ ...booking, [name]: value })
		setErrorMessage("")
	}
    const getRoomPriceById = async (roomId) => {
		try {
			const response = await getRoomById(roomId)
			setRoomPrice(response.price)
		} catch (error) {
			throw new Error(error)
		}
	}
    
	useEffect(() => {
		getRoomPriceById(roomId)
	}, [roomId])

    const isPlayersCountValid = (numOfPeople) => {
        return numOfPeople >= 2 && numOfPeople <= 5;
    };

    const handleSubmit = (e) => {
		e.preventDefault()
		const form = e.currentTarget
		if (form.checkValidity() === false || !isPlayersCountValid(booking.numOfPeople)) {
			e.stopPropagation()
		} else {

			setIsSubmitted(true)

		}
		setValidated(true)
	}
    const handleBooking = async () => {
		try {
			await bookRoom(roomId, booking)
			setIsSubmitted(true)
            navigate("/booking-success", { state: { message: "" }})
		} catch (error) {
			const errorMessage = error.message
			console.log(errorMessage)
			navigate("/booking-success", { state: { error: errorMessage } })
		}
	}

	return (
		<>
			<div className="container mb-5">
				<div className="row">
					<div className="col-md-6">
						<div className="card card-body mt-5">
							<h4 className="card-title">Reserve Room</h4>

							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Group>
									<Form.Label htmlFor="name" className="main-color">
										Name
									</Form.Label>
									<FormControl
										required
										type="text"
										id="name"
										name="name"
										value={booking.name}
										placeholder="Enter your full name"
										onChange={handleInputChange}
									/>
									<Form.Control.Feedback type="invalid">
										Please enter your name
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group>
									<Form.Label htmlFor="email" className="main-color">
										Email
									</Form.Label>
									<FormControl
										required
										type="email"
										id="email"
										name="email"
										value={booking.email}
										placeholder="Enter your email"
										onChange={handleInputChange}
									/>
									<Form.Control.Feedback type="invalid">
										Please enter a valid email address.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group>
    <Form.Label htmlFor="date" className="main-color">
        Date
    </Form.Label>
    <FormControl
       required
	   type="date"
	   id="date"
	   name="startTime"
	   value={booking.startTime}
	   placeholder="date"
	   min={moment().format("MMM Do, YYYY")}
	   onChange={handleInputChange}
    />
    <Form.Control.Feedback type="invalid">
        Please enter a valid date.
    </Form.Control.Feedback>
</Form.Group>

										
										{errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
									

								
										<div className="col-6">
											<Form.Label htmlFor="numOfPeople" className="main-color">
												Players
											</Form.Label>
											<FormControl
												required
												type="number"
												id="numOfPeople"
												name="numOfPeople"
												value={booking.numOfPeople}
												min={2}
												placeholder="0"
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Please select at least 2 players
											</Form.Control.Feedback>
										</div>
										
								

								<div className="fom-group mt-2 mb-2">
									<button type="submit" className="btn btn-main">
										Continue
									</button>
								</div>
							</Form>
						</div>
					</div>

					<div className="col-md-4">
						{isSubmitted && (
							<BookingSummary
							booking={booking}
							payment={roomPrice}
							onConfirm={handleBooking}
							isFormValid={validated}
						/>

						)}
					</div>
				</div>
			</div>
		</>
	)
}
export default BookingForm
    

    
