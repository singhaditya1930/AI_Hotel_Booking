package com.hotel.reviewservice.repository;

import com.hotel.reviewservice.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}