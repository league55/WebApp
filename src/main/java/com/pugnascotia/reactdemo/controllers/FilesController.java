package com.pugnascotia.reactdemo.controllers;

import com.pugnascotia.reactdemo.services.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/static")
public class FilesController {
	private static final Logger logger = LoggerFactory.getLogger(ArticleController.class);


	@Autowired
	FileService rabbitService;

	@RequestMapping(value = "/{imageId:.+}", method = RequestMethod.GET)
	public void getFile(@PathVariable String imageId, HttpServletResponse response) throws IOException {
		byte[] file = null;
		try {
			file = rabbitService.get(imageId);
		} catch (Exception e) {
			logger.error(e.getLocalizedMessage());
		}
		response.setContentType("image/jpeg, image/jpg, image/png, image/gif");
		response.getOutputStream().write(file);
		response.getOutputStream().close();
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<String> saveFile(@RequestBody MultipartFile file) throws Exception {
		rabbitService.save(file);
		return new ResponseEntity<>(file.getOriginalFilename(), HttpStatus.OK);
	}

}
