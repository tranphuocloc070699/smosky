package com.smosky.boilerplateserver.admin;

import com.smosky.boilerplateserver.review.ReviewRepository;
import com.smosky.boilerplateserver.spring.BoilerplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {
  
  private final ReviewRepository reviewRepository;
  private final BoilerplateRepository boilerplateRepository;
  
  
  public Object fetchAllReview() {
      return boilerplateRepository.findAllReviewWithBoilerplateName();
  }
  
}
