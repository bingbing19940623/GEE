package com.intr;

import java.io.*;
import java.util.*;

import com.bean.ArrayBean;

public class Informationextract {
    public void createjson(){
    	List <String>  extractinfor = new ArrayList();
    	File fileurlread = new File("/home/jqm/mininet/custom/exhibit.txt");
    	try {
    		BufferedReader reader = new BufferedReader(new FileReader(fileurlread));
			String str = null;
    		try {
				while((str=reader.readLine())!=null){
					extractinfor.add(str);
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	ArrayBean exinfor = new ArrayBean();
    	if(!extractinfor.get(0).equals("")){
			String[] c= extractinfor.get(0).split(",");
		    for(int i=0;i<c.length;i++){
		    	exinfor.addControllergroup(c[i]);
		    }
		}
    	if(!extractinfor.get(1).equals("")){
			String[] c= extractinfor.get(1).split(",");
		    for(int i=0;i<c.length;i++){
		    	exinfor.addSwitchgroup(c[i]);
		    }
		}
    	if(!extractinfor.get(2).equals("")){
			String[] c= extractinfor.get(2).split(",");
		    for(int i=0;i<c.length;i++){
		    	exinfor.addHostgroup(c[i]);
		    }
		}
    	for(int i=3;i<extractinfor.size();i++){
    		String[] c= extractinfor.get(i).split(",");
    		exinfor.addBall1group(c[0]);
    		exinfor.addBall2group(c[1]);
    	}
    	File fileurlwrite = new File("Documents/apache-tomcat-8.0.33/wtpwebapps/GEE/json/exhibit.json");
    	try{
			FileOutputStream out = new FileOutputStream(fileurlwrite);
			int c = exinfor.getControllergroupsize(), s = exinfor.getSwitchgroupsize(), h = exinfor.getHostgroupsize();
			out.write("{\r\n    \"type\": \"force\",\r\n    \"categories\": [\r\n        {\r\n            \"name\": \"Controller\",\r\n            \"keyword\": {},\r\n            \"base\": \"Controller\"\r\n        },\r\n        {\r\n            \"name\": \"Switch\",\r\n            \"keyword\": {},\r\n            \"base\": \"Switch\"\r\n        },\r\n        {\r\n            \"name\": \"Host\",\r\n            \"keyword\": {},\r\n            \"base\": \"Host\"\r\n        }\r\n    ],\r\n    \"nodes\": [\r\n".getBytes());
			for(int i=0;i<c;i++){
				out.write(("        {\r\n            \"name\": \""+exinfor.getControllergroup(i)+"\",\r\n            \"value\": 1,\r\n            \"category\": 0\r\n        },\r\n").getBytes());	
			}
			for(int i=0;i<s;i++){
				out.write(("        {\r\n            \"name\": \""+exinfor.getSwitchgroup(i)+"\",\r\n            \"value\": 1,\r\n            \"category\": 1\r\n        },\r\n").getBytes());	
			}
			for(int i=0;i<h;i++){
				out.write(("        {\r\n            \"name\": \""+exinfor.getHostgroup(i)+"\",\r\n            \"value\": 1,\r\n            \"category\": 2\r\n        }").getBytes());	
				if(i==h-1){
					out.write("\r\n".getBytes());
				}
				else{
					out.write(",\r\n".getBytes());
				}
			}
			out.write("    ],\r\n    \"links\": [\r\n".getBytes());
			for(int i=0;i<exinfor.getBall1groupsize();i++){
				int b1=0,b2=0,b3=0;
				if(exinfor.getBall1group(i).charAt(0)=='c'){
					for(int j=0;j<c;j++){
						if(exinfor.getBall1group(i).equals(exinfor.getControllergroup(j))){
							b1=j;
						}
					}
				}
				else if(exinfor.getBall1group(i).charAt(0)=='s'){
					for(int j=0;j<s;j++){
						if(exinfor.getBall1group(i).equals(exinfor.getSwitchgroup(j))){
							b1=c+j;
						}
					}
				}
				else if(exinfor.getBall1group(i).charAt(0)=='h'){
					for(int j=0;j<h;j++){
						if(exinfor.getBall1group(i).equals(exinfor.getHostgroup(j))){
							b1=c+s+j;
						}
					}
				}
				if(exinfor.getBall2group(i).charAt(0)=='c'){
					for(int j=0;j<c;j++){
						if(exinfor.getBall2group(i).equals(exinfor.getControllergroup(j))){
							b2=j;
						}
					}
				}
				else if(exinfor.getBall2group(i).charAt(0)=='s'){
					for(int j=0;j<s;j++){
						if(exinfor.getBall2group(i).equals(exinfor.getSwitchgroup(j))){
							b2=c+j;
						}
					}
				}
				else if(exinfor.getBall2group(i).charAt(0)=='h'){
					for(int j=0;j<h;j++){
						if(exinfor.getBall2group(i).equals(exinfor.getHostgroup(j))){
							b2=c+s+j;
						}
					}
				}
				if(exinfor.getBall1group(i).charAt(0)=='s'&&exinfor.getBall2group(i).charAt(0)=='s'){
					b3=1;
				}
				else if((exinfor.getBall1group(i).charAt(0)=='c'&&exinfor.getBall2group(i).charAt(0)=='s')||(exinfor.getBall1group(i).charAt(0)=='s'&&exinfor.getBall2group(i).charAt(0)=='c')){
					b3=10;
				}
				else if((exinfor.getBall1group(i).charAt(0)=='h'&&exinfor.getBall2group(i).charAt(0)=='s')||(exinfor.getBall1group(i).charAt(0)=='s'&&exinfor.getBall2group(i).charAt(0)=='h')){
					b3=10;
				}
				out.write(("        {\r\n            \"source\": "+b1+",\r\n            \"target\": "+b2+",\r\n            \"weight\": "+b3+"\r\n        }").getBytes());
				if(i==exinfor.getBall1groupsize()-1){
					out.write("\r\n".getBytes());
				}
				else{
					out.write(",\r\n".getBytes());
				}
			}
			out.write("    ]\r\n}\r\n".getBytes());
		    out.close();
		}catch(Exception e){
			e.printStackTrace();
		}
    }
}
