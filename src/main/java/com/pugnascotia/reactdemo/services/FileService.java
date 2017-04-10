package com.pugnascotia.reactdemo.services;


import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	void save(MultipartFile file) throws Exception;
	byte[] get(String fileName) throws Exception;
	}
