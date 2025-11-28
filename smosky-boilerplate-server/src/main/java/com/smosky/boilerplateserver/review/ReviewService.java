package com.smosky.boilerplateserver.review;

import com.smosky.boilerplateserver.shared.ResponseDto;
import com.smosky.boilerplateserver.spring.BoilerplateRepository;
import com.smosky.boilerplateserver.review.dtos.CreateReviewDto;
import com.smosky.boilerplateserver.review.dtos.CreateReviewResponseDto;
import com.smosky.boilerplateserver.review.dtos.StarCountDto;
import com.smosky.boilerplateserver.spring.entity.Boilerplate;
import com.smosky.boilerplateserver.review.entity.Review;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
//@CrossOrigin(origins = {"http://localhost:8000","https://softsky.dev","https://www.softsky.dev"})
public class ReviewService {
  
  private final ReviewRepository reviewRepository;
  private final BoilerplateRepository boilerplateRepository;
  private final HttpServletRequest httpServletRequest;
  
  public ResponseEntity<ResponseDto> createReview(CreateReviewDto dto) {
    if (dto.getName().isEmpty() || dto.getBoilerplateId() == null) {
      return null;
    }
    if (dto.getEmail() == null) {
      dto.setEmail("anomyous@example.com");
    }
    
    Boilerplate boilerplateExisting = boilerplateRepository.findById(dto.getBoilerplateId()).orElseThrow(() -> new RuntimeException("Boilerplate not found"));
    Review review = reviewRepository.save(Review.builder()
            .name(dto.getName())
            .star(dto.getStar())
            .content(dto.getContent())
            .email(dto.getEmail())
            .boilerplate(boilerplateExisting)
            .build());
    
    StarCountDto starCountDto = boilerplateRepository.findStarCounts(dto.getBoilerplateId());
    
    CreateReviewResponseDto createReviewResponseDto = CreateReviewResponseDto.builder()
            .id(review.getId())
            .name(review.getName())
            .email(review.getEmail())
            .content(review.getContent())
            .star(review.getStar())
            .createdAt(review.getCreatedAt())
            .updatedAt(review.getUpdatedAt())
            .totalReview(starCountDto.getTotalReviews())
            .starAvg(starCountDto.getStarAvg())
            .oneStar(starCountDto.getOneStarCount())
            .twoStar(starCountDto.getTwoStarCount())
            .threeStar(starCountDto.getThreeStarCount())
            .fourStar(starCountDto.getFourStarCount())
            .fiveStar(starCountDto.getFiveStarCount())
            .build();
    
    
    ResponseDto responseDto = ResponseDto.builder()
            .path(httpServletRequest.getServletPath())
            .status(HttpStatus.OK.value())
            .message("create review successfully!")
            .data(createReviewResponseDto)
            .build();
    return ResponseEntity.ok(responseDto);
  }
  
  
  public ResponseEntity<ResponseDto> deleteReview(String id) {
    Integer idConverter = Integer.parseInt(id);
    
    Review reviewExisting = reviewRepository.findById(idConverter).orElseThrow(() -> new RuntimeException("Review not found"));
    reviewRepository.delete(reviewExisting);
    
    ResponseDto responseDto = ResponseDto.builder()
            .path(httpServletRequest.getServletPath())
            .status(HttpStatus.OK.value())
            .message("delete review successfully!")
            .data( true)
            .build();
    return ResponseEntity.ok(responseDto);
  }
}
