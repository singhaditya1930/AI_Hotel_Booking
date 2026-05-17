package com.hotel.roomservice.repository;

import com.hotel.roomservice.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}