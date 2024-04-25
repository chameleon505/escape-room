package com.example.springbootapp.controller;

import com.example.springbootapp.Response.BookedRoomResponse;
import com.example.springbootapp.exception.InvalidBookingRequestException;
import com.example.springbootapp.model.BookedRoom;
import com.example.springbootapp.service.BookedRoomService;
import com.example.springbootapp.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.springbootapp.model.BookedRoom;
import com.example.springbootapp.model.Room;
import com.example.springbootapp.Response.BookedRoomResponse;
import com.example.springbootapp.Response.RoomResponse;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/bookings")

public class BookedRoomController {
    private final BookedRoomService bookingService;
    private final RoomService roomService;


    @GetMapping("all-bookings")
    public ResponseEntity<List<BookedRoomResponse>> getAllBookings() {
        List<BookedRoom> bookings = bookingService.getAllBookings();

        List<BookedRoomResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {

            BookedRoomResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);

        }
        return ResponseEntity.ok(bookingResponses);

    }
    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable long roomId, @RequestBody BookedRoom bookingRequest){
        try{
            System.out.print(bookingRequest);
            bookingService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok("Booking is successful!");
        }
        catch(InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());

        }
    }
    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable long bookingId) {

        bookingService.cancelBooking(bookingId);
    }

    private BookedRoomResponse getBookingResponse (BookedRoom booking) {

        Room theRoom = roomService.getRoomById(booking.getRoom().getId()).get();

        RoomResponse room = new RoomResponse(

                theRoom.getId(),

                theRoom.getType(),

                theRoom.getPrice(), theRoom.getTitle(),
                theRoom.getDescription());

        return new BookedRoomResponse(

                booking.getBookingID(), booking.getStartTime(),booking.getName(),booking.getEmail(), booking.getNumOfPeople(), room);

    }



    }