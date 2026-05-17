package com.hotel.recommendationservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Recommendation {

    private String recommendedRoom;
    private String reason;
}