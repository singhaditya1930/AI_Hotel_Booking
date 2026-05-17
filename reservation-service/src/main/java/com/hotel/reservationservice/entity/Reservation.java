package com.hotel.reservationservice.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "reservations")
@Data
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long roomId;

    private String checkInDate;

    private String checkOutDate;

    private String status;
}