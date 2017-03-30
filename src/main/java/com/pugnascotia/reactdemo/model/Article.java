package com.pugnascotia.reactdemo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Simple data container class. We need a no-args constructor so that Jackson
 * can deserialise these.
 */
@Data
@NoArgsConstructor
public class Article {
	private Long id;
	private String author;
	private String content;

	public Article(String author, String content) {
		setAuthor(author);
		setContent(content);
	}
}
