package com.fruitable.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FileService {

	String uploadImage(String path, MultipartFile file)throws IOException;
	
	InputStream getImage(String path, String fileName) throws FileNotFoundException;
}
