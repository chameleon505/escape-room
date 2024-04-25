import React, { useEffect } from "react"
import { useState } from "react"
import {getRoomById } from "../utils/ApiFunctions"
import RoomCarousel from "../common/RoomCarousel"
import {useParams } from "react-router-dom"
import { FaRegLightbulb} from "react-icons/fa"

import { Link } from "react-router-dom"



const RoomInfo = () => {
    // State variables
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);
    const[roomInfo, setRoomInfo] = useState({
        picture: "",
        type: "", 
        title: "",
		price: "",
		description: ""

    })


    const { roomId } = useParams()

	useEffect(() => {
		setTimeout(() => {
			getRoomById(roomId)
				.then((response) => {
					setRoomInfo(response)
					setLoading(false)
				})
				.catch((error) => {
					setError(error)
					setLoading(false)
				})
		}, 1000)
	}, [roomId])

    return (
		<div>
			<section className="container">
				<div className="row">
					<div className="col-md-19 mt-5 mb-5">
						{loading ? (
							<p>Loading room information...</p>
						) : error ? (
							<p>{error}</p>
						) : (
							<div className="room-info">
                                <div className="room-image">
                        <img
									src={`data:image/png;base64,${roomInfo.picture}`}
									alt="Room photo"
									style={{ width: "580px", height: "380px" }}
							 />
								
                                </div>
                    <div className="room-details">

                    <div className="room-description whitetext ">
                        <h2>{roomInfo.title}</h2>
                        <p>Price: ${roomInfo.price}</p>
                                        <p>{roomInfo.description}</p>
										
										<p> <FaRegLightbulb /> Difficulty Level: {roomInfo.type}</p>

					</div>
                    <div className="flex-shrink-0 mt-8">
													<Link to={`/book-room/${roomId}`} className="btn btn-white btn-sm">
														Book Now
													</Link>

												
												</div>
                   
                               
								
							</div>
                            </div>

                            
                            
                            
						)}
					</div>
					
				</div>
			</section>
			
		</div>
	)
};

export default RoomInfo;
