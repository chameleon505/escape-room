package com.example.springbootapp.repository;

import com.example.springbootapp.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookedRoomRepo extends JpaRepository<BookedRoom, Long> {
    List<BookedRoom> findByRoomId(long roomId);
}
