package com.example.springbootapp.service;

import com.example.springbootapp.exception.InternalServerException;
import com.example.springbootapp.exception.ResourceNotFoundException;
import com.example.springbootapp.model.Room;
import com.example.springbootapp.repository.RoomRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RoomServiceImpl implements RoomService {
    private final RoomRepo roomRepo;

    @Override
    public Room addNewRoom(MultipartFile photo, String type, int price, String title, String description) throws IOException, SQLException {
        Room room = new Room();
        room.setType(type);
        room.setPrice(price);
        room.setTitle(title);
        room.setDescription(description);

        if (!photo.isEmpty()) {
            byte[] bytes = photo.getBytes();
            Blob photoBlob = new SerialBlob(bytes);
            room.setPicture(photoBlob);


        }
        return roomRepo.save(room);
    }

    @Override
    public List<Room> getRoomTitles() {
        return roomRepo.findAll();

    }

    @Override
    public List<String> getRoomTypesStrings() {
        return roomRepo.findDistinctRoomTitles();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(long id) throws SQLException {
        Optional<Room> theRoom = roomRepo.findById(id);

        if (theRoom.isEmpty()) {

            throw new ResourceNotFoundException("Sorry, Room not found!");
        }

        Blob photoBlob = theRoom.get().getPicture();

        if (photoBlob != null) {

            return photoBlob.getBytes(1, (int) photoBlob.length());

        }

        return null;
    }

    @Override
    public void deleteRoom(Long roomId) {
        Optional<Room> theRoom = roomRepo.findById(roomId);

        if (theRoom.isPresent()) {

            roomRepo.deleteById(roomId);

        }

    }

    @Override
    public Room updateRoom(long roomId, String type, Integer roomPrice, byte[] photoBytes, String title, String description) {

        Room room = roomRepo.findById(roomId).orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        if (type != null) room.setType(type);
        if (title != null) room.setTitle(title);
        if (description != null) room.setDescription(description);

        if (roomPrice != null) room.setPrice(roomPrice);

        if (photoBytes != null && photoBytes.length > 0) {
            try {
                room.setPicture(new SerialBlob(photoBytes));

            } catch (SQLException s) {
                throw new InternalServerException("Error updating room");

            }

        }
        return roomRepo.save(room);
    }

    @Override
    public Optional<Room> getRoomById(long roomId) {
        return Optional.of(roomRepo.findById(roomId).get());
    }
}
