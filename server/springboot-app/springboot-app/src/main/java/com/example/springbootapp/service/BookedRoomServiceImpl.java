package com.example.springbootapp.service;

import com.example.springbootapp.model.BookedRoom;
import com.example.springbootapp.model.Room;
import com.example.springbootapp.exception.*;
import com.example.springbootapp.repository.BookedRoomRepo;
import com.example.springbootapp.repository.RoomRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;

@Service

@RequiredArgsConstructor
public class BookedRoomServiceImpl implements BookedRoomService{
    private final BookedRoomRepo bookingRepositoty;
    private final RoomService roomService;


    public List<BookedRoom> getBookingsByRoomId(long roomId) {
        return bookingRepositoty.findByRoomId(roomId);
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepositoty.findAll();
    }

    @Override
    public void saveBooking(long roomId, BookedRoom bookingRequest) {
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean isAvailable = roomIsAvailable(bookingRequest, existingBookings);
        if(isAvailable) {
            room.addBooking(bookingRequest);
            bookingRepositoty.save(bookingRequest);
        }else{
            throw new InvalidBookingRequestException("Please choose another date");
        }

        


    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {

            return existingBookings.stream().noneMatch(existingBooking ->

                    bookingRequest.getStartTime().equals(existingBooking.getStartTime()));


    }


    @Override
    public void cancelBooking(long bookingId) {
        bookingRepositoty.deleteById(bookingId);

    }
}
