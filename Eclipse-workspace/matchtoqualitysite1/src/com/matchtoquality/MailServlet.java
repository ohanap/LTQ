package com.matchtoquality;

import javax.mail.Transport;


import java.util.Properties; 
import javax.mail.Message; 
import javax.mail.Session; 

import javax.mail.internet.InternetAddress; 
import javax.mail.internet.MimeMessage;
import java.io.IOException; 

import javax.servlet.http.*; 



public class MailServlet extends HttpServlet{
	
  
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {         

		String email = req.getParameter("textfield2");
		String comments = req.getParameter("textfield22");
		String phone = req.getParameter("textfield3");
		String name = req.getParameter("textfield");
		
		String SMTP_AUTH_USER ="devtoquality@gmail.com";
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);
		try      {          Message msg = new MimeMessage(session);                     
			                msg.setFrom(new InternetAddress(SMTP_AUTH_USER, "MatchToQuality"));          
			                msg.addRecipient(Message.RecipientType.TO,new InternetAddress(SMTP_AUTH_USER));          
			                msg.setSubject(name + email);                     
			                msg.setContent(phone + comments, "text/html");         
			                Transport.send(msg);
			                resp.sendRedirect("/Matchtoquality.jsp");
			     }      
		catch (Exception e)      {         
			
			}   
		} 
	}