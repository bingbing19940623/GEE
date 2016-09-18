package com.intr;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.LineNumberReader;

import com.bean.*;

public class Informationdistribute {

	public void Distribute(ArrayBean ainfor){
	File fileurl = new File("mininet/custom/"+ainfor.getNetname()+".py");
	if(!fileurl.exists()){
		try{ 
			fileurl.createNewFile();
			ainfor.setReturn("网络创建好啦！");
		}catch(Exception e){
			e.printStackTrace();
		}
		try{
			FileOutputStream out = new FileOutputStream(fileurl);
			
			out.write("#!/usr/bin/python\r\n\r\nfrom mininet.net import Mininet\r\nfrom mininet.node import Controller, OVSSwitch\r\nfrom mininet.cli import CLI\r\nfrom mininet.log import setLogLevel\r\n\r\ndef multiControllerNet():\r\n    \"Create a network from semi-scratch with multiple controllers.\"\r\n\r\n    net = Mininet( controller=Controller, switch=OVSSwitch )\r\n\r\n    f = open('/home/jqm/mininet/custom/exhibit.txt','wa')\r\n\r\n".getBytes());
			out.write("    print \"*** Creating (reference) controllers\"\r\n".getBytes());
			for(int i=0;i<ainfor.getControllergroupsize();i++){
				out.write(("    "+ainfor.getControllergroup(i)+" = net.addController( '"+ainfor.getControllergroup(i)+"' )\r\n").getBytes());
				out.write(("    f.write('"+ainfor.getControllergroup(i)+",')\r\n").getBytes());
			}
			out.write("    f.write('\\n')".getBytes());
			out.write("\r\n".getBytes());
			out.write("    print \"*** Creating switches\"\r\n".getBytes());
			String [] Switchtag = new String [ainfor.getSwitchgroupsize()];
			for(int i=0;i<ainfor.getSwitchgroupsize();i++){
				out.write(("    "+ainfor.getSwitchgroup(i)+" = net.addSwitch( '"+ainfor.getSwitchgroup(i)+"' )\r\n").getBytes());
				out.write(("    f.write('"+ainfor.getSwitchgroup(i)+",')\r\n").getBytes());
				Switchtag[i]=ainfor.getSwitchgroup(i);
			}
			out.write("    f.write('\\n')".getBytes());
			out.write("\r\n".getBytes());
			out.write("    print \"*** Creating hosts\"\r\n".getBytes());
			for(int i=0;i<ainfor.getHostgroupsize();i++){
				out.write(("    "+ainfor.getHostgroup(i)+" = net.addHost( '"+ainfor.getHostgroup(i)+"' )\r\n").getBytes());
				out.write(("    f.write('"+ainfor.getHostgroup(i)+",')\r\n").getBytes());
			}
			out.write("    f.write('\\n')".getBytes());
			out.write("\r\n".getBytes());
			out.write("    print \"*** Creating links\"\r\n".getBytes());
			for(int i=0;i<ainfor.getLinegroupsize();i++){
				if(ainfor.getBall1group(i).charAt(0)!='c'&&ainfor.getBall2group(i).charAt(0)!='c'){
				    out.write(("    net.addLink( "+ainfor.getBall1group(i)+","+ainfor.getBall2group(i)+" )\r\n").getBytes());
				    out.write(("    f.write('"+ainfor.getBall1group(i)+","+ainfor.getBall2group(i)+"')\r\n").getBytes());
					out.write("    f.write('\\n')".getBytes());
				    out.write("\r\n".getBytes());
				}
			}
			out.write("\r\n".getBytes());
			out.write("    print \"*** Starting network\"\r\n    net.build()\r\n".getBytes());
			for(int i=0;i<ainfor.getControllergroupsize();i++){
				out.write(("    "+ainfor.getControllergroup(i)+".start()\r\n").getBytes());
			}
			for(int i=0;i<ainfor.getLinegroupsize();i++){
				if(ainfor.getBall1group(i).charAt(0)!='h'&&ainfor.getBall2group(i).charAt(0)!='h'&&(ainfor.getBall1group(i).charAt(0)!='s'||ainfor.getBall2group(i).charAt(0)!='s')){
				    if(ainfor.getBall1group(i).charAt(0)=='s'){
				    	out.write(("    "+ainfor.getBall1group(i)+".start( ["+ainfor.getBall2group(i)+"] )\r\n").getBytes());
				    	out.write(("    f.write('"+ainfor.getBall2group(i)+","+ainfor.getBall1group(i)+"')\r\n").getBytes());
				    	out.write("    f.write('\\n')\r\n".getBytes());
				    	for(int j=0;j<ainfor.getSwitchgroupsize();j++){
				    		if(Switchtag[j].equals(ainfor.getBall1group(i))){
				    			Switchtag[j]="";
				    		}
				    	}
				    }
				    else{
				    	out.write(("    "+ainfor.getBall2group(i)+".start( ["+ainfor.getBall1group(i)+"] )\r\n").getBytes());
				    	out.write(("    f.write('"+ainfor.getBall1group(i)+","+ainfor.getBall2group(i)+"')\r\n").getBytes());
				    	out.write("    f.write('\\n')\r\n".getBytes());
				    	for(int j=0;j<ainfor.getSwitchgroupsize();j++){
				    		if(Switchtag[j].equals(ainfor.getBall2group(i))){
				    			Switchtag[j]="";
				    		}
				    	}
				    }
				}
			}
			for(int i=0;i<ainfor.getSwitchgroupsize();i++){
	    		if(!Switchtag[i].equals("")){
			    	out.write(("    "+Switchtag[i]+".start( ["+ainfor.getControllergroup(0)+"] )\r\n").getBytes());
			    	out.write(("    f.write('"+ainfor.getControllergroup(0)+","+Switchtag[i]+"')\r\n").getBytes());
			    	out.write("    f.write('\\n')\r\n".getBytes());
	    		}
	    	}
		    out.write("\r\n".getBytes());
		    out.write("    f.close()\r\n\r\n".getBytes());
			out.write("    print \"*** Testing network\"\r\n    net.pingAll()\r\n\r\n    print \"*** Running CLI\"\r\n    CLI( net )\r\n\r\n    print \"*** Stopping network\"\r\n    net.stop()\r\n\r\nif __name__ == '__main__':\r\n    setLogLevel( 'info' )  # for CLI output\r\n    multiControllerNet()".getBytes());

		    out.close();
		}catch(Exception e){
			e.printStackTrace();
		}
		
                                                              //开启命令行
        String [] mingling = {"/bin/bash", "-c", "mininet/custom/init.sh "+ainfor.getNetname()+".py"}; 
        //String mingling = "sudo python mininet/custom/123.py";
        //String mingling = "gnome-terminal";   
       // String [] mingling = {"/bin/bash", "-c", "mininet/custom/init.sh 123.py"}; 

		Runtime run = Runtime.getRuntime();//返回与当前 Java 应用程序相关的运行时对象  
        try {  
            Process p = run.exec(mingling);// 启动另一个进程来执行命令  
            BufferedInputStream in = new BufferedInputStream(p.getInputStream());  
            BufferedReader inBr = new BufferedReader(new InputStreamReader(in));  
            String lineStr;  
            while ((lineStr = inBr.readLine()) != null)  
                //获得命令执行后在控制台的输出信息  
                System.out.println(lineStr);// 打印输出信息  
            //检查命令是否执行失败。  
            if (p.waitFor() != 0) {  
                if (p.exitValue() == 1)//p.exitValue()==0表示正常结束，1：非正常结束  
                    System.err.println("命令执行失败!");  
            }  
            inBr.close();  
            in.close();  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        
       
        
	}
	else{
		ainfor.setReturn("那个网络已经存在了！换个名吧！");
	}
		
//		System.out.println(ainfor.getControllergroup(2));
//		System.out.println(ainfor.getSwitchgroup(3));
		
	}

}
