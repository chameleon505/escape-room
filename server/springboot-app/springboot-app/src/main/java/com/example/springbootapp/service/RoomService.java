package com.example.springbootapp.service;

import com.example.springbootapp.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface RoomService {
    Room addNewRoom(MultipartFile photo, String type, int price, String title, String description) throws IOException, SQLException;

    List<Room> getRoomTitles();

    List<String> getRoomTypesStrings();

    byte[] getRoomPhotoByRoomId(long id) throws SQLException;

    void deleteRoom(Long roomId);

    Room updateRoom(long roomId, String roomType, Integer price, byte[] photoBytes, String title, String description);

    Optional<Room> getRoomById(long roomId);
}
