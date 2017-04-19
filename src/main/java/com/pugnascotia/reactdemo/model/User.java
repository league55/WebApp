package com.pugnascotia.reactdemo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name="APP_USER")
@Getter @Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User implements Serializable{

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name = "USER_ID")
	private Long userId;

	@NotEmpty
	@Column(name="USER_NAME", nullable=false, unique = true)
	private String userName;

	@NotEmpty
	@Column(name="FULL_NAME", nullable=false)
	private String fullName;

	@Column(name="AGE", nullable=false)
	private Integer age;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "author", cascade = CascadeType.ALL)
	private List<Article> articles;


	@Override
	public String toString() {
		return "User{" +
			"userId=" + userId +
			", userName='" + userName + '\'' +
			", fullName='" + fullName + '\'' +
			", age=" + age +
			'}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		User user = (User) o;
		return Objects.equals(userId, user.userId) &&
			Objects.equals(userName, user.userName) &&
			Objects.equals(fullName, user.fullName) &&
			Objects.equals(age, user.age);
	}

	@Override
	public int hashCode() {
		return Objects.hash(userId, userName, fullName, age);
	}
}
