package com.example.springbootapp.Response;

import com.example.springbootapp.model.BookedRoom;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Blob;
import java.util.List;
@Data
@NoArgsConstructor


public class RoomResponse {
    private long id;
    private String type;
    private String description;
    private String title;
    private int price;
    private boolean isBooked;
    private String  picture;
    private List<BookedRoomResponse> bookings;

    public RoomResponse(long id, String type,  int price, String title, String description) {
        this.id = id;
        this.description = description;
        this.type = type;
        this.title = title;
        this.price=price;

    }

    public RoomResponse(long id, String type,  int price, boolean isBooked, byte[]  picture, String title, String description) {
        //this.bookings = bookings;
        this.id = id;
        this.description = description;
        this.type = type;
        this.title = title;
        this.price = price;
        this.picture = picture!=null? Base64.encodeBase64String(picture):null;
        this.isBooked = isBooked;
    }
}
