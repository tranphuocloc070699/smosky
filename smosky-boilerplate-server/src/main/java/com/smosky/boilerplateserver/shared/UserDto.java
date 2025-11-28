package com.smosky.boilerplateserver.shared;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
  private UUID id;
  private String email;
  private String password;
  private String name;
  private String username;
  private Provider provider;
//  private Role role;
  private Boolean isUsing2FA;
  private String secret;
  private Date createdAt;
  private Date updatedAt;
}