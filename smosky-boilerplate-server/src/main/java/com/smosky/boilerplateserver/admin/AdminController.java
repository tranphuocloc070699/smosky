package com.smosky.boilerplateserver.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
public class AdminController {
  
  private final AdminService adminService;
  
  @GetMapping("reviews")
  public Object fetchAllReview() {
    return adminService.fetchAllReview();
  }
}
