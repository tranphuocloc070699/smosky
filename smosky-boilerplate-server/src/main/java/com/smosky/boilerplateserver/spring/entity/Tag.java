package com.smosky.boilerplateserver.spring.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.smosky.boilerplateserver.blog.entity.Post;
import jakarta.persistence.*;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class,
    property = "id")
public class Tag {
  @Id
  @SequenceGenerator(
          name = "tag_id_seq",
          sequenceName = "tag_id_seq",
          allocationSize = 1
  )
  @GeneratedValue(
          strategy = GenerationType.SEQUENCE,
          generator = "tag_id_seq"
  )
  private Integer id;

  @Column(unique = true)
  private String name;
  
  @Enumerated(EnumType.STRING)
  private TagType type;

  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @JoinTable(name = "tag_boilerplate",
      joinColumns = @JoinColumn(name = "tag_id"),
      inverseJoinColumns = @JoinColumn(name = "boilerplate_id")
  )
  private List<Boilerplate> boilerplates;
  
  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @JoinTable(name = "tag_post",
          joinColumns = @JoinColumn(name = "tag_id"),
          inverseJoinColumns = @JoinColumn(name = "post_id")
  )
  private List<Post> posts;
}
