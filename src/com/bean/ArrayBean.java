package com.bean;

import java.util.ArrayList;
import java.util.List;

public class ArrayBean {
	private List<String> Controllergroup = new ArrayList();
	List<String> Switchgroup = new ArrayList();
	List<String> Hostgroup = new ArrayList();
	List<String> Linegroup = new ArrayList();
	List<String> Ball1group = new ArrayList();
	List<String> Ball2group = new ArrayList();
	private String Netname;
	private String Return;
	
	public String getControllergroup(int index) {
		return Controllergroup.get(index);
	}
	public void addControllergroup(String str) {
		Controllergroup.add(str);
	}
	
	public String getSwitchgroup(int index) {
		return Switchgroup.get(index);
	}
	public void addSwitchgroup(String str) {
		Switchgroup.add(str);
	}
	
	public String getHostgroup(int index) {
		return Hostgroup.get(index);
	}
	public void addHostgroup(String str) {
		Hostgroup.add(str);
	}
	
	public String getLinegroup(int index) {
		return Linegroup.get(index);
	}
	public void addLinegroup(String str) {
		Linegroup.add(str);
	}
	
	public String getBall1group(int index) {
		return Ball1group.get(index);
	}
	public void addBall1group(String str) {
		Ball1group.add(str);
	}
	
	public String getBall2group(int index) {
		return Ball2group.get(index);
	}
	public void addBall2group(String str) {
		Ball2group.add(str);
	}
	public String getNetname() {
		return Netname;
	}
	public void setNetname(String netname) {
		Netname = netname;
	}
	public String getReturn() {
		return Return;
	}
	public void setReturn(String return1) {
		Return = return1;
	}
	
	
	public int getControllergroupsize(){
		return Controllergroup.size();
	}
	public int getSwitchgroupsize(){
		return Switchgroup.size();
	}
	public int getHostgroupsize(){
		return Hostgroup.size();
	}
	public int getLinegroupsize(){
		return Linegroup.size();
	}
	public int getBall1groupsize(){
		return Ball1group.size();
	}
	public int getBall2groupsize(){
		return Ball2group.size();
	}
	
}
