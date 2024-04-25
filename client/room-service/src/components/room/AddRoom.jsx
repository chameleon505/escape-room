import React, { useState } from "react"
import { addRoom } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"


const AddRoom=() =>{
    const [newRoom, setNewRoom] = useState({
        picture: null,
        type: "",
        price: "",
        title: "",
        description: ""
      });
      const [imagePreview, setImagePreview] = useState("");
      const [successMessage, setSuccessMessage] = useState("");
      const [errorMessage, setErrorMessage] = useState("");
    const handleRoomPriceChange = (e) => {
        const name = e.target.name; 
        let value = e.target.value; 
        if (!isNaN(value)) { 
                value = parseInt(value); 
            } else {
                value = ""; 
            }
        
    
        setNewRoom({...newRoom, [name]:value}); 
    }
    const handleRoomTypeChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setNewRoom({ ...newRoom, [name]: value });
    }
    const handleImageChange = (e) => {

        const selectedImage = e.target.files[0]
        
        setNewRoom ({...newRoom, picture: selectedImage})
        
        setImagePreview(URL.createObjectURL(selectedImage))
        
        }
        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                const success = await addRoom(newRoom.picture, newRoom.type, newRoom.price, newRoom.title, newRoom.description)
                if (success !== undefined) {
                    setSuccessMessage("A new room was  added successfully !")
                    setNewRoom({ picture: null, type: "", price: "" , title: "", description: ""})
                    setImagePreview("")
                    setErrorMessage("")
                } else {
                    setErrorMessage("Error adding new room")
                }
            } catch (error) {

                setErrorMessage(error.message)
            }
            setTimeout(() => {
                setSuccessMessage("")
                setErrorMessage("")
            }, 3000)
        }
            
    


    return (
		<>
			<section className="container mt-5 mb-5 whitetext">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<h2 className="mt-5 mb-2">Add a New Room</h2>
                        {successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

						{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}
						

						<form onSubmit={handleSubmit}>
                        <div className="mb-4">
								<label htmlFor="title" className="form-label">
									Room Title
								</label>
								<input
                                 type="text"
                                 className="form-control"
                                 id="title"
                                 name="title"
                                 value={newRoom.title}
                                 onChange={handleRoomTypeChange}
                                 style={{ backgroundColor: '#f4f4f4' }}

									/>
							</div>	<div className="mb-4">
								<label htmlFor="description" className="form-label">
									Room Description
								</label>
								<input
                                 type="text"
                                 className="form-control"
                                 id="description"
                                 name="description"
                                 value={newRoom.description}
                                 onChange={handleRoomTypeChange}                                 
                                 style={{ backgroundColor: '#f4f4f4' }}

                                 
									/>
							</div>
							<div className="mb-4">
								<label htmlFor="type" className="form-label">
									Room Type
								</label>
								<input
                                 type="text"
                                 className="form-control"
                                 id="type"
                                 name="type"
                                 value={newRoom.type}
                                 onChange={handleRoomTypeChange}
                                 style={{ backgroundColor: '#f4f4f4' }}

									/>
							</div>
							<div className="mb-4">
								<label htmlFor="price" className="form-label">
									Room Price
								</label>
								<input
									required
									type="number"
									className="form-control"
									id="price"
									name="price"
                                    value={newRoom.price}
									onChange={handleRoomPriceChange}
                                    style={{ backgroundColor: '#f4f4f4' }}

								/>
							</div>
                            
							<div className="mb-4">
								<label htmlFor="photo" className="form-label">
									Room Photo
								</label>
								<input
									required
									name="photo"
									id="photo"
									type="file"
									className="form-control"
									onChange={handleImageChange}
                                    style={{ backgroundColor: '#f4f4f4' }}

								/>
                                {imagePreview && (
									<img
										src={imagePreview}
										alt="Preview  room photo"
										style={{ maxWidth: "400px", maxHeight: "400px" }}
										className="mb-3"></img>
								)}
								
							</div>
                            <div className="d-grid gap-2 d-md-flex mt-2">
                            <Link to={"/existing-rooms"} className="btn btn-outline-info">
									Existing rooms
								</Link>
								
								<button type="submit" className="btn btn-outline-primary ml-5">
									Save Room
								</button>
							</div>
                            

							
						</form>
					</div>
				</div>
			</section>
		</>
	)
}
export default AddRoom;