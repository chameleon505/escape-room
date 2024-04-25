import React, { useEffect, useState } from "react"
import { getRoomById, updateRoom } from "../utils/ApiFunctions"
import { Link, useParams } from "react-router-dom"

const EditRoom = () => {

const [room, setRoom] = useState({
    picture: null,
    type: "",
    price: "",
    title: "",
    description: ""
  });
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { roomId } = useParams()


const handleRoomPriceChange = (e) => {
    const name = e.target.name; 
    let value = e.target.value; 
    if (!isNaN(value)) { 
            value = parseInt(value); 
        } else {
            value = ""; 
        }
    

    setRoom({...room, [name]:value}); 
}
const handleRoomTypeChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRoom({ ...room, [name]: value });
}
const handleImageChange = (e) => {

    const selectedImage = e.target.files[0]
    
    setRoom ({...room, picture: selectedImage})
    
    setImagePreview(URL.createObjectURL(selectedImage))
    
    }
    useEffect(() => {
		const fetchRoom = async () => {
			try {
				const roomData = await getRoomById(roomId)
				setRoom(roomData)
				setImagePreview(roomData.picture)
			} catch (error) {
				console.error(error)
			}
		}

		fetchRoom()
	}, [roomId])

    const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await updateRoom(roomId, room)
			if (response.status === 200) {
				setSuccessMessage("Room updated successfully!")
				const updatedRoomData = await getRoomById(roomId)
				setRoom(updatedRoomData)
				setImagePreview(updatedRoomData.picture)
				setErrorMessage("")
			} else {
				setErrorMessage("Error updating room")
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

    return (
		<div className="container mt-5 mb-5 whitetext">
			<h3 className="text-center mb-5 mt-5">Edit Room</h3>
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					{successMessage && (
						<div className="alert alert-success" role="alert">
							{successMessage}
						</div>
					)}
					{errorMessage && (
						<div className="alert alert-danger" role="alert">
							{errorMessage}
						</div>
					)}
					<form onSubmit={handleSubmit}>
					<div className="mb-3">
								<label htmlFor="title" className="form-label">
									Room Title
								</label>
								<input
                                 type="text"
                                 className="form-control"
                                 id="title"
                                 name="title"
                                 value={room.title}
                                 onChange={handleRoomTypeChange}
									/>
							</div>	<div className="mb-3">
								<label htmlFor="description" className="form-label">
									Room Description
								</label>
								<input
                                 type="text"
                                 className="form-control"
                                 id="description"
                                 name="description"
                                 value={room.description}
                                 onChange={handleRoomTypeChange}
								 />
							</div>
						<div className="mb-3">
							<label htmlFor="type" className="form-label">
								Room Type
							</label>
							<input
								type="text"
								className="form-control"
								id="type"
								name="type"
								value={room.type}
								onChange={handleRoomTypeChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="price" className="form-label">
								Room Price
							</label>
							<input
								type="number"
								className="form-control"
								id="price"
								name="price"
								value={room.price}
								onChange={handleRoomPriceChange}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="photo" className="form-label ">
								Photo
							</label>
							<input
								
								type="file"
								className="form-control"
								id="photo"
								name="photo"
								onChange={handleImageChange}
							/>
							{imagePreview && (
								<img
									src={`data:image/jpeg;base64,${imagePreview}`}
									alt="Room preview"
									style={{ maxWidth: "400px", maxHeight: "400" }}
									className="mt-3"
								/>
							)}
						</div>
						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
								back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Room
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default EditRoom