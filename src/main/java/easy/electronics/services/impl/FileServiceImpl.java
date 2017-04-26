package easy.electronics.services.impl;

import java.io.File;
import java.nio.file.Files;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import easy.electronics.services.FileService;

@Service
//TODO: repository
public class FileServiceImpl implements FileService {
	private static final Logger LOG = LoggerFactory.getLogger(FileServiceImpl.class);

	@Value("${rootPath}")
	private String rootPath;

	public void save(MultipartFile file) throws Exception {

		LOG.info("PathToAssets = {}", rootPath);
		String filePath = rootPath + file.getOriginalFilename();

		if (!alreadyExists(filePath)) {
			LOG.debug("Saving file {} ", filePath);
			File dest = new File(rootPath + file.getOriginalFilename());
			file.transferTo(dest);
		}
	}

	public byte[] get(String fileName) throws Exception{
		String rpath = rootPath + fileName;
		LOG.info("trying to get file from path = {}", rpath);
		return Files.readAllBytes(new File(rpath).toPath());
	}

	private Boolean alreadyExists(String path) {
		boolean exists = new File(path).exists();
		LOG.debug("file already exists = {} ", exists);
		return exists;
	}

}
