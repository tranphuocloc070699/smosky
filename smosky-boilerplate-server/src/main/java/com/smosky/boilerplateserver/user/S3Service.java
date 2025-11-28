package com.smosky.boilerplateserver.user;

import com.smosky.boilerplateserver.exception.ConflictException;
import com.smosky.boilerplateserver.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {
  @Value("${application.bucket.name}")
  private  String bucketName;
  
  private final S3Client s3Client;
  
  public String uploadImage(MultipartFile file) throws IOException {
    if(file==null){
      throw new ConflictException("File not found");
    }
    
    String filename =   UUID.randomUUID() + "-" + file.getOriginalFilename() ;
    
    String objectKey = "posts/" + filename;
    PutObjectRequest request = PutObjectRequest.builder()
            .bucket(bucketName)
            .contentType("image/" + "jpeg")
            .key(objectKey)
            .build();

      s3Client.putObject(request, RequestBody.fromBytes(file.getBytes()));
    
    
    String url =s3Client.utilities().getUrl(GetUrlRequest.builder()
            .bucket(bucketName)
            .key(objectKey)
            .build()).toExternalForm();
    Map<String,String> data = new HashMap<>();
    data.put("url",url);
    return url;
  }
  
  public String deleteImage(String url) {
    HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
            .bucket(bucketName)
            .key(extractObjectKey(url))
            .build();
    DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
            .bucket(bucketName)
            .key( extractObjectKey(url))
            .build();
    
    try {
      s3Client.headObject(headObjectRequest);
      s3Client.deleteObject(deleteRequest);
      Map<String,String> data = new HashMap<>();
      
      return url;
    } catch (NoSuchKeyException e) {
      System.err.println(e.getMessage());
      throw new ResourceNotFoundException("deleteImage","image","url not found to delete");
    } catch (S3Exception e) {
      System.err.println("Error deleting object: " + e.getMessage());
      throw new RuntimeException(e.getMessage());
    }
  }
  
  private String extractObjectKey(String url){
    String urlWithoutPrefix = url.replace("https://", "");
    String[] parts = urlWithoutPrefix.split("/");
    String bucketName = parts[0];
    return urlWithoutPrefix.substring(bucketName.length() + 1);
    
  }
}