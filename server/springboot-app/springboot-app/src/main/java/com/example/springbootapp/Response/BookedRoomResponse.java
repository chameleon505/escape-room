package com.example.springbootapp.Response;

import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class BookedRoomResponse {
    private Long bookingID;
    private LocalDate startTime;
    private String name;
    private String email;
    private RoomResponse room;
    private int numOfPeople;

    public BookedRoomResponse(Long bookingID,LocalDate startTime, String name,
                              String email, int numOfPeople, RoomResponse room) {
        this.bookingID = bookingID;
        this.startTime = startTime;
        this.name = name;
        this.email =email;
        this.numOfPeople = numOfPeople;
        this.room = room;
    }
}
