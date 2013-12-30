<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>

<html>
  <body>

<%
    UserService userService = UserServiceFactory.getUserService();
    User user = userService.getCurrentUser();
    if (user != null) {
%>
<p>Hello, <%= user.getNickname() %>! (You can
<a href="<%= userService.createLogoutURL(request.getRequestURI()) %>">sign out</a>.)</p>
<%
    } else {
%>
<p>Hello!
<a href="<%= userService.createLoginURL(request.getRequestURI()) %>">Sign in</a>
to include your name with greetings you post.</p>
<%
    }
%>


  <form action="/SendMail" method="post">
    <div>htmlText:<textarea name="htmlText" rows="1" cols="60"></textarea></div>
    <div>email:<textarea name="email" rows="1" cols="60"></textarea></div>
    <div>sub:<textarea name="sub" rows="1" cols="60"></textarea></div>
    <div><input type="submit" value="Send Mail" /></div>
  </form>

  </body>
</html>
