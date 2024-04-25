import axios from "axios"
export const api = axios.create(
    {baseURL: "http://localhost:8080"
})
export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}
export async function addRoom(picture, type, price, title, description){
    const formData = new FormData();
    formData.append("photo", picture);
    formData.append("type", type);
    formData.append("price", price);
	formData.append("title", title);
    formData.append("description", description);

    

    const response = await api.post("/rooms/add/room", formData,{
		
	})
    if (response.status === 201) {
        
        return true;
      } else {
        return false;
      }

}
export async function getRoomTypes() {
    try {
      const response = await api.get("/rooms/room/types");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching room types"); 
    }
  }
  export async function getAllRooms() {

	try {
		const result = await api.get("/rooms/all-rooms")
		return result.data
	} catch (error) {


		throw new Error("Error fetching rooms")
	}
}
export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(`/rooms/delete/room/${roomId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error deleting room ${error.message}`)
	}
}
export async function updateRoom(roomId, roomData) {
	const formData = new FormData()
	formData.append("type", roomData.type)
	formData.append("price", roomData.price)
	formData.append("photo", roomData.picture)
	formData.append("title", roomData.title)
	formData.append("description", roomData.description)

	const response = await api.put(`/rooms/update/${roomId}`, formData)
	return response
}
export async function getRoomById(roomId) {
	try {
		const result = await api.get(`/rooms/room/${roomId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}
export async function bookRoom(roomId, booking) {
	try {
		const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error booking room : ${error.message}`)
		}
	}
}
export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings")
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`)
	}
}


