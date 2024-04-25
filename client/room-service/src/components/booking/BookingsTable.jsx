import { parseISO } from "date-fns"
import React, { useState, useEffect } from "react"
import DateSlider from "../common/DateSlider"

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
	const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

	const filterBookings = (startDate, endDate) => {
		let filtered = bookingInfo
		if (startDate && endDate) {
			filtered = bookingInfo.filter((booking) => {
				const bookingStartDate = parseISO(booking.startTime)
				return (
					bookingStartDate >= startDate && bookingStartDate <= endDate 
				)
			})
		}
		setFilteredBookings(filtered)
	}

	useEffect(() => {
		setFilteredBookings(bookingInfo)
	}, [bookingInfo])

	return (
		<section className="p-4">
			<DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
			<table className="table table-bordered table-hover ">
				<thead>
					<tr>
						<th>S/N</th>
						<th>Booking ID</th>
						<th>Room ID</th>
						<th>Room Title</th>
						<th>Date</th>
						<th>Name</th>
						<th>Email</th>
						<th>Number of players</th>
						<th colSpan={2}>Actions</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{filteredBookings.map((booking, index) => (
						<tr key={booking.bookingID}>
							<td>{index + 1}</td>
							<td>{booking.bookingID}</td>
							<td>{booking.room.id}</td>
							<td>{booking.room.title}</td>
							<td>{booking.startTime}</td>
							<td>{booking.name}</td>
							<td>{booking.email}</td>
							<td>{booking.numOfPeople}</td>
							<td>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => handleBookingCancellation(booking.bookingID)}>
									Cancel
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{filterBookings.length === 0 && <p> No booking found for the selected dates</p>}
		</section>
	)
}

export default BookingsTable