package com.fruitable.Service;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

@Service
public class MailService {

	public boolean SendEmail(String subject, String message, String to) {
		
		boolean status = false;
		
		String from = "fruitable.com@gmail.com";
		
		// variable for Gmail host
		String host = "smtp.gmail.com";
		
		// get the system properties
		Properties properties = System.getProperties();
		System.out.println("PROPERTIES "+properties);
		
		// setting important information to properties object
		
		// set host
		properties.put("mail.smtp.host", host);
		// set Gmail port
		properties.put("mail.smtp.port", "465");
		// set ssl enable
		properties.put("mail.smtp.ssl.enable", "true");
		// set auth
		properties.put("mail.smtp.auth", "true");
		
		// step 1: to get session object
		Session session = Session.getInstance(properties, new Authenticator() {

			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
												  
				return new PasswordAuthentication("fruitable.com@gmail.com", "hlqlousixphxdvik");
			}
			
		});
		
		session.setDebug(true);
		
		//step 2: compose the message
		MimeMessage mimeMessage = new MimeMessage(session);
	
		try {
			// email from Fruitable, who is sending email
			mimeMessage.setFrom(from);
			
			// adding recipient to message, who is receiving  email
			mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
			
			// adding subject to message
			mimeMessage.setSubject(subject);
			
			// adding text to message			
//			mimeMessage.setText(message);
			mimeMessage.setContent(message, "text/html");
			
			
			// Step 3: send the message using Transport class
			Transport.send(mimeMessage);
			
			System.out.println("Send successfully email");
			status = true;
			
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return status;
		
	}
	
}
