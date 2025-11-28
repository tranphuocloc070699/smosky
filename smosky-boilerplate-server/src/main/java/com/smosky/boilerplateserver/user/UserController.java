package com.smosky.boilerplateserver.user;

import com.smosky.boilerplateserver.exception.ConflictException;
import com.smosky.boilerplateserver.shared.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {
  
  private final S3Service s3Service;
  
  
  @PostMapping("upload-image")
  ResponseEntity<ResponseDto> uploadImage(@RequestPart(name = "file")  MultipartFile file) {
    try {
    String  url = s3Service.uploadImage(file);
      Map<String,Object> map = new HashMap<>();
      map.put("url",url);
      return ResponseEntity.ok(ResponseDto.builder()
              .path(null)
              .errors(null)
              .message("Upload image successfully!")
              .status(HttpStatus.OK.value())
              .data(map)
              .build());
    } catch (IOException e) {
      throw new ConflictException(e.getMessage());
    }
  }
  
  @PostMapping("delete-image")
  ResponseEntity<ResponseDto> deleteImage(@RequestBody ImageUrlDto dto) {
    String object = s3Service.deleteImage(dto.getUrl());
    Map<String,String> map = new HashMap<>();
    map.put("url",object);
    return ResponseEntity.ok(ResponseDto.builder()
            .path(null)
            .errors(null)
            .message("Delete image successfully!")
            .status(HttpStatus.OK.value())
            .data(map)
            .build());
  }
}
