package com.example.springbootapp.service;

import com.example.springbootapp.model.BookedRoom;

import java.util.List;

public interface BookedRoomService {
    List<BookedRoom> getAllBookings();

    void saveBooking(long roomId, BookedRoom bookingRequest);

    void cancelBooking(long bookingId);
}
