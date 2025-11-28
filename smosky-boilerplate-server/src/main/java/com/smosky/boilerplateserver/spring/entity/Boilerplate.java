package com.smosky.boilerplateserver.spring.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.smosky.boilerplateserver.review.entity.Review;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id")
public class Boilerplate {

  @Id
  @SequenceGenerator(
          name = "boilerplate_id_seq",
          sequenceName = "boilerplate_id_seq",
          allocationSize = 1
  )
  @GeneratedValue(
          strategy = GenerationType.SEQUENCE,
          generator = "boilerplate_id_seq"
  )
  private Integer id;
  
  
  @OneToMany(mappedBy = "boilerplate")
  private List<Review> reviews;

  @Column
  private String name;

  @Column
  private String thumbnail;

  @Column
  private String description;
  
  @Column
  private String type;

  @Column(name="preview_link")
  private String previewLink;

  

  @ElementCollection
  @CollectionTable(name = "boilerplate_dependencies", joinColumns = @JoinColumn(name = "boilerplate_id"))
  @Column(name = "dependencies")
  private List<String> dependencies;

  @ElementCollection
  @CollectionTable(name = "boilerplate_features", joinColumns = @JoinColumn(name = "boilerplate_id"))
  @Column(name = "features")
  private List<String> features;

  @ManyToMany(mappedBy = "boilerplates")
  private List<Tag> tags;

  @CreationTimestamp
  @Column(name = "created_at")
  private Date createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private Date updatedAt;
}
