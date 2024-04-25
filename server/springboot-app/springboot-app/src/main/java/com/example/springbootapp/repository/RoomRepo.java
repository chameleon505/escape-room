package com.example.springbootapp.repository;

import com.example.springbootapp.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepo extends JpaRepository<Room, Long> {
    @Query("SELECT DISTINCT r.type from Room r")
    List<String> findDistinctRoomTitles();
}
