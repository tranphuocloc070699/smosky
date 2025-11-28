package com.smosky.boilerplateserver.review.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class CreateReviewDto {
  Integer boilerplateId;
  String name;
  String email;
  String content;
  Integer star;
}
