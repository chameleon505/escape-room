import React, { useContext } from "react"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
<style>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
</style>


const RoomCard = ({ room }) => {
	return (
		<Col key={room.id} className="mb-6" xs={15} >
			<Card>
				<Card.Body className="d-flex align-items-center">
					<div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
						<Link to={`/info-room/${room.id}`}>
							<Card.Img
								variant="top"
								src={`data:image/png;base64, ${room.picture}`}
								alt="Room Photo"
								style={{height: "180px", width: "250px"  }}
							/>
						</Link>
					</div>
					<div className="flex-grow-1 ml-3 px-5">
						<Card.Title className="main-color-blue mb-4">{room.title}</Card.Title>
						<Card.Text>{room.description}</Card.Text>
					</div>
					<div className="flex-shrink-0 mt-3">
						<Link to={`/info-room/${room.id}`} className="btn btn-main btn-sm">
							Book Now
						</Link>
					</div>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default RoomCard