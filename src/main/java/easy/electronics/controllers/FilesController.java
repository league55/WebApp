package easy.electronics.controllers;

import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import easy.electronics.services.FileService;

@RestController
@RequestMapping("/static")
public class FilesController {
	private static final Logger logger = LoggerFactory.getLogger(ArticleController.class);


	@Autowired
	FileService rabbitService;

	@RequestMapping(value = "/{imageId:.+}", method = RequestMethod.GET, produces = {IMAGE_JPEG_VALUE, IMAGE_GIF_VALUE, IMAGE_PNG_VALUE})
	public byte[] getFile(@PathVariable String imageId) throws IOException {
		byte[] file = null;
		try {
			file = rabbitService.get(imageId);
		} catch (Exception e) {
			logger.error(e.getLocalizedMessage());
		}
		return file;
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<String> saveFile(@RequestBody MultipartFile file) throws Exception {
		rabbitService.save(file);
		return new ResponseEntity<>(file.getOriginalFilename(), HttpStatus.OK);
	}

}
