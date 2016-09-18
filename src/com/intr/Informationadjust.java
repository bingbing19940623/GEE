package com.intr;
import com.bean.*;
import java.util.ArrayList;
import java.util.List;

public class Informationadjust {
	public void Split(StringBean sinfor){
		ArrayBean ainfor = new ArrayBean();
		
		if(!sinfor.getControllergroup().equals("")){
			String[] c= sinfor.getControllergroup().split(",");
		    for(int i=0;i<c.length;i++){
		    	ainfor.addControllergroup(c[i]);
		    }
		}
		
		if(!sinfor.getSwitchgroup().equals("")){
		    String[] s= sinfor.getSwitchgroup().split(",");
		    for(int i=0;i<s.length;i++){
			    ainfor.addSwitchgroup(s[i]);
		    }
		}
		if(!sinfor.getHostgroup().equals("")){
		    String[] h= sinfor.getHostgroup().split(",");
		    for(int i=0;i<h.length;i++){
			    ainfor.addHostgroup(h[i]);
		    }
		}
		if(!sinfor.getLinegroup().equals("")){
		    String[] l= sinfor.getLinegroup().split(",");
		    String[] b1= sinfor.getBall1group().split(",");
		    String[] b2= sinfor.getBall2group().split(",");
		    for(int i=0;i<l.length;i++){
			    ainfor.addLinegroup(l[i]);
			    ainfor.addBall1group(b1[i]);
			    ainfor.addBall2group(b2[i]);
		}
		}
		
		
		
		ainfor.setNetname(sinfor.getNetname());
        Informationdistribute distribute = new Informationdistribute();
    	distribute.Distribute(ainfor);
    	sinfor.setReturn(ainfor.getReturn());
	};
}
