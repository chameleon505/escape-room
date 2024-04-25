package com.example.springbootapp.controller;

import com.example.springbootapp.Response.BookedRoomResponse;
import com.example.springbootapp.Response.RoomResponse;
import com.example.springbootapp.exception.*;
import com.example.springbootapp.model.BookedRoom;
import com.example.springbootapp.model.Room;
import com.example.springbootapp.service.BookedRoomServiceImpl;
import com.example.springbootapp.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class RoomController {
    private final RoomService roomService;
    private final BookedRoomServiceImpl bookedRoomService;

    @PostMapping("/add/room")
    public ResponseEntity<RoomResponse> addNewRoom(@RequestParam("photo") MultipartFile photo,@RequestParam("price") int price,
                                                   @RequestParam("description") String description, @RequestParam("type") String type, @RequestParam("title") String title) throws SQLException, IOException {
        Room room = roomService.addNewRoom(photo, type, price, title, description);
        RoomResponse response = new RoomResponse(room.getId(),room.getType(), room.getPrice(), room.getTitle(), room.getDescription());
        return  ResponseEntity.ok(response);

    }
    @GetMapping("/room/types")
    public List<String> getRoomTypes(){
        return roomService.getRoomTypesStrings();

    }
    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getRooms() throws SQLException {
        List<Room> rooms =roomService.getRoomTitles();
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room: rooms){

            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());

            if(photoBytes != null && photoBytes.length > 0){
                String base64Photo= Base64.encodeBase64String(photoBytes);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setPicture(base64Photo);
                roomResponses.add(roomResponse);

            }

        }
        return ResponseEntity.ok(roomResponses);

        }
    @DeleteMapping("/delete/room/{roomId}")

    public ResponseEntity<Void> deleteRoom(@PathVariable long roomId) {

        roomService.deleteRoom(roomId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


    @PutMapping("/update/{roomId}")
    public ResponseEntity<RoomResponse> updateRoom (@PathVariable long roomId,
                                                    @RequestParam(required = false) String type,
                                                    @RequestParam(required = false) String title,
                                                    @RequestParam(required = false) String description,
                                                    @RequestParam(required = false) Integer price,
                                                    @RequestParam(required = false) MultipartFile photo) throws IOException, SQLException {
        byte[] photoBytes = photo != null && !photo.isEmpty() ? photo.getBytes() : roomService.getRoomPhotoByRoomId(roomId);

        Blob photoBlob = photoBytes != null && photoBytes.length > 0 ? new SerialBlob(photoBytes) : null;

        Room theRoom = roomService.updateRoom(roomId, type, price, photoBytes, title, description);

        theRoom.setPicture(photoBlob);

        RoomResponse roomResponse = getRoomResponse(theRoom);

        return ResponseEntity.ok(roomResponse);
    }
    @GetMapping("/room/{roomId}")
    public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable long roomId) {
        Optional<Room> theRoom = roomService.getRoomById(roomId);

        return theRoom.map(room -> { RoomResponse roomResponse = getRoomResponse(room);
            return ResponseEntity.ok(Optional.of(roomResponse));

        }).orElseThrow(() -> new ResourceNotFoundException("Room not found"));

    }




        private RoomResponse getRoomResponse (Room room) {

        List<BookedRoom> bookings = getBookingsByRoomId(room.getId());
        byte[] photobytes = null;
        Blob photoBlob =room.getPicture();
        if (photoBlob !=null) {

            try {

                photobytes = photoBlob.getBytes(1, (int) photoBlob.length());

            } catch (SQLException e) {

                throw new PhotoRetrievalException("Error retrieving photo");

            }
        }

            return new RoomResponse(room.getId(),

                                room.getType(),

                                room.getPrice(),

                                room.isBooked(), photobytes, room.getTitle(), room.getDescription());
    }

    private List<BookedRoom> getBookingsByRoomId(long id) {
        return bookedRoomService.getBookingsByRoomId(id);
    }
}
