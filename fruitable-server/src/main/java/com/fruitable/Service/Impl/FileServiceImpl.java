package com.fruitable.Service.Impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fruitable.Service.FileService;

@Service
public class FileServiceImpl  implements FileService{

	@Override
	public String uploadImage(String path, MultipartFile file) throws IOException {
		
		// get File name
		String name = file.getOriginalFilename();
		
		// generate unique file name
		String now = LocalDateTime.now().toString();
		String dateTime=now.replaceAll(":","-");//replaces all occurrences of ":" to "-" in time 
		int lastDotIndex = name.lastIndexOf('.');
		String uniqueName = name.substring(0, lastDotIndex) + dateTime + name.substring(lastDotIndex);
		System.out.println("uName:"+ uniqueName);
		
		
		// create full path
		String filePath = path + File.separator + uniqueName;
		System.out.println("FilePath:"+filePath);
		
		// create folder if not created
		File f = new File(path);
		if(!f.exists()) {
			
			f.mkdir();
		}
		
		
		// upload file Or copy file and put in created file path
		Files.copy(file.getInputStream(), Paths.get(filePath));
		
		return uniqueName;
	}

	@Override
	public InputStream getImage(String path, String fileName) throws FileNotFoundException {
		// create full path
		String fullPath = path+File.separator+fileName;
		
		InputStream IS = new FileInputStream(fullPath);
		return IS;
	}

	
	
	
	


}


 