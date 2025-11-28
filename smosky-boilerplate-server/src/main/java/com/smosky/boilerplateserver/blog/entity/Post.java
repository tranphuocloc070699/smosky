package com.smosky.boilerplateserver.blog.entity;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.smosky.boilerplateserver.spring.entity.Tag;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
    name = "post"
)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Post {
  @Id
  @SequenceGenerator(
      name = "post_id_seq",
      sequenceName = "post_id_seq",
      allocationSize = 1
  )
  @GeneratedValue(
      strategy = GenerationType.SEQUENCE,
      generator = "post_id_seq"
  )
  private Integer id;

  @Column(nullable = false)
  private String thumbnail;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String slug;
  
  @Column
  private Integer liked;

  @Column(nullable = false,columnDefinition = "TEXT")
  private String content;

  @Column(name="pre_content",nullable = false,columnDefinition = "TEXT")
  private String preContent;

  @OneToMany(mappedBy = "post")
  private List<Toc> tocs;

  @Column(name="created_at")
  private Date createdAt;

  @Column(name="updated_at")
  private Date updatedAt;
  
  @ManyToMany(mappedBy = "posts")
  private List<Tag> tags;

  @PrePersist
  protected void onCreate() {
    createdAt = new Date();
    updatedAt = new Date();
  }

  @PreUpdate
  protected void onUpdate(){
    updatedAt = new Date();
  }

}

