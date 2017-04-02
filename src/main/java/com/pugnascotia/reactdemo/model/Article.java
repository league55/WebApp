package com.pugnascotia.reactdemo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@NoArgsConstructor
@Entity
@Table(name = "ARTICLES")
@Getter @Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Article implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "article_id")
	private Long articleId;

	@NotEmpty
	@Column(name = "TITLE", nullable = false)
	private String title;

	@NotEmpty
	@Column(name = "STATUS", nullable = false)
	private String status;

	@CreationTimestamp
	@Temporal(TemporalType.DATE)
	@Column(name = "CREATE_DATE")
	private Date createDate;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "MODIFY_DATE")
	private Date modifyDate;

	@Column(name = "CONTENT", nullable = false, columnDefinition = "JSON")
	private String content;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID")
	@JsonIgnoreProperties("articles")
	private User author;

	@Override
	public String toString() {
		return "Article{" +
			"articleId=" + articleId +
			", title='" + title + '\'' +
			", status='" + status + '\'' +
			", createDate=" + createDate +
			", modifyDate=" + modifyDate +
			", content='" + content + '\'' +
			'}';
	}


	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Article article = (Article) o;
		return Objects.equals(articleId, article.articleId) &&
			Objects.equals(title, article.title) &&
			Objects.equals(status, article.status) &&
			Objects.equals(createDate, article.createDate);
	}

	@Override
	public int hashCode() {
		return Objects.hash(articleId, title, status, createDate);
	}
}
