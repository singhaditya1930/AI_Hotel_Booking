package com.hotel.recommendationservice.controller;

import com.hotel.recommendationservice.entity.Recommendation;
import com.hotel.recommendationservice.repository.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin(origins = "*")
public class RecommendationController {

    @Autowired
    private RecommendationRepository repository;

    @GetMapping("/recommend")
    public Recommendation recommendRoom() {

        List<Recommendation> list = repository.findAll();

        Recommendation best = list.stream()
                .max((a, b) -> a.getAiScore() - b.getAiScore())
                .orElse(null);

        return best;
    }
}