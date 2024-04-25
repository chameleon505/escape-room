import React, { useEffect, useState } from "react"
import { getAllRooms } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
</style>
import { Card, Carousel, Col, Container, Row } from "react-bootstrap"

const RoomCarousel = () => {
	const [rooms, setRooms] = useState([{ id: "", title: "", price: "", picture: "" , type: "", description:""}])
	const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		getAllRooms()
			.then((data) => {
				setRooms(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setErrorMessage(error.message)
				setIsLoading(false)
			})
	}, [])

	if (isLoading) {
		return <div className="mt-5">Loading rooms....</div>
	}
	if (errorMessage) {
		return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>
	}

	return (
		<section className="bg-dark mb-5 mt-5 shadow">
			<Link to={"/browse-all-rooms"} className="main-color text-center"   style={{
        display: "inline-block",
        padding: "5px 30px",
        backgroundColor: "#b2b4b3",
        color: "#242524",
        borderRadius: "5px",
        textDecoration: "none",
        fontFamily: "Libre Baskerville",
        fontWeight: "bold",
    }}>
				Browse all rooms
			</Link>

			<Container >
				<Carousel indicators={false}>
					{[...Array(Math.ceil(rooms.length / 3))].map((_, index) => (
						<Carousel.Item key={index}>
							<Row>
								{rooms.slice(index * 3, index * 3 + 3).map((room) => (
									<Col key={room.id} className="mb-4" xs={12} md={6} lg={4}>
										<Card className="bg-dark">
											<Link to={`/info-room/${room.id}`}>
												<Card.Img
													variant="top"
													src={`data:image/png;base64, ${room.picture}`}
													alt="Room picture"
													className="w-100"
													style={{ height: "210px", width: "100%" }} 
													/>
											</Link>
											<Card.Body>
												<Card.Title className="main-color">{room.title}</Card.Title>
												<div className="flex-shrink-0">
													<Link to={`/info-room/${room.id}`} className="btn btn-main btn-sm">
														Book Now
													</Link>
												</div>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>
		</section>
	)
}

export default RoomCarousel