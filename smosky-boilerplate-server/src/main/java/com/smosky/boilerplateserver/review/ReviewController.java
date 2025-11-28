package com.smosky.boilerplateserver.review;

import com.smosky.boilerplateserver.shared.ResponseDto;
import com.smosky.boilerplateserver.spring.BoilerplateRepository;
import com.smosky.boilerplateserver.review.dtos.CreateReviewDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
//@CrossOrigin(origins = {"http://localhost:8000","https://softsky.dev","https://www.softsky.dev"})
public class ReviewController {
  private final ReviewRepository reviewRepository;
  private final ReviewService reviewService;
  private final BoilerplateRepository boilerplateRepository;

  @PostMapping("")
//  @CrossOrigin(origins = {"http://localhost:8000","https://softsky.dev","https://www.softsky.dev"})
  public ResponseEntity<ResponseDto> createReview(@RequestBody CreateReviewDto dto) {
    return reviewService.createReview(dto);
  }

  @PostMapping("{id}")
//  @CrossOrigin(origins = {"http://localhost:8000","https://softsky.dev","https://www.softsky.dev"})
  public ResponseEntity<ResponseDto> deleteReview(@PathVariable("id")String id) {
    return reviewService.deleteReview(id);
  }
}
