package com.example.springbootapp.model;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@AllArgsConstructor
@Getter
@Setter
@Entity

public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private int price;
    private String type;
    private String description;



    private boolean isBooked = false;
    @Lob
    private Blob picture;
    @OneToMany(mappedBy = "room",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedRoom> bookings;

    public Room() {
        this.bookings = new ArrayList<>();
    }
    public void addBooking(BookedRoom booking){
        if(bookings==null){
            bookings = new ArrayList<>();
        }
        else{
            bookings.add(booking);
            booking.setRoom(this);
            isBooked = true;

        }
    }
}
