package com.smosky.boilerplateserver.admin.dtos;

import com.smosky.boilerplateserver.review.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class FetchAllReviewResponse {
   String boilerplateName;
   Object reviews;
  
  public FetchAllReviewResponse(String boilerplateName, Object reviews) {
    this.boilerplateName = boilerplateName;
    this.reviews = reviews;
  }
}
