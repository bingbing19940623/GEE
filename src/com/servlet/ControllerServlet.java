package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;

import com.intr.*;
import com.bean.*;



/**

 * Servlet implementation class controllerServlet

 */

@WebServlet("/ControllerServlet")

public class ControllerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");   
		String signal = request.getParameter("signal");
		if(signal.equals("distribute")){
		    StringBean sinfor = new StringBean();
		    sinfor.setControllergroup(request.getParameter("controllergroup"));
		    sinfor.setSwitchgroup(request.getParameter("switchgroup"));
		    sinfor.setHostgroup(request.getParameter("hostgroup"));
		    sinfor.setLinegroup(request.getParameter("linegroup"));
		    sinfor.setBall1group(request.getParameter("ball1group"));
		    sinfor.setBall2group(request.getParameter("ball2group"));
		    sinfor.setNetname(request.getParameter("netname"));
            Informationadjust adjust = new Informationadjust();
            adjust.Split(sinfor);
            PrintWriter out =  response.getWriter();
            JSONObject json = new JSONObject();
            try {
				json.put("Return", sinfor.getReturn());
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
            out.print(json); 
		}	
		else if(signal.equals("exhibit")){
			Informationextract extract = new Informationextract();
			extract.createjson();
			PrintWriter out =  response.getWriter();
            JSONObject json = new JSONObject();
            try {
				json.put("message", "ready");
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
            out.print(json); 
		}
	}

}
