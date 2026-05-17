package com.hotel.recommendationservice.repository;

import com.hotel.recommendationservice.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendationRepository
        extends JpaRepository<Recommendation, Long> {
}