var cmumber = 0,smumber = 0,hmumber = 0,lmumber = 0,enline = 0,endelete = 0;
var cid="",sid="",hid="",lid="",ball1id="",ball2id="";
var linelevel,xmlns;

$(document).ready(function(){ 
	linelevelsvginit();
	pointlisten();
	statusjudge();
});
function endistribute(){
	$("#distribute").click(function(){
		if(cmumber>0){
		informationcollect();
		var netname = prompt('给你的网络起个名字吧！');
		$.ajax({
			type:"post",
			url:"../com.servlet/ControllerServlet",
			data:{
				controllergroup:cid,
				switchgroup:sid,
				hostgroup:hid,
				linegroup:lid,
				ball1group:ball1id,
				ball2group:ball2id,
				netname:netname,
				signal:"distribute",
			},
			dataType:"json",
			success : function(data)
			{  
				alert(data.Return);
			}
		});
		cid="";
		sid="";
		hid="";
		lid="";
		ball1id="";
		ball2id="";
		}
		else{
			alert("至少要有一个控制器吧！");
		}
	});
	
}
function informationcollect(){
	for(var i=1;i<=cmumber;i++){
		if($("#c"+i).length>0){
			cid = cid + "c" + i + ",";
		}
	}
	for(var i=1;i<=smumber;i++){
		if($("#s"+i).length>0){
			sid = sid + "s" + i + ",";
		}
	}
	for(var i=1;i<=hmumber;i++){
		if($("#h"+i).length>0){
			hid = hid + "h" + i + ",";
		}
	}

	for(var i=1;i<=lmumber;i++){
		if($("#l"+i).length>0){
			lid = lid + "l" + i + ",";
			ball1id = ball1id + $("#l"+i).attr("ball1") + ",";
			ball2id = ball2id + $("#l"+i).attr("ball2") + ",";
		}
	}
}
function enexhibit(){
	$("#exhibit").click(function(){
		$.ajax({
			type:"post",
			url:"../com.servlet/ControllerServlet",
			data:{
				signal:"exhibit",
			},
			dataType:"json",
			success : function(data)
			{  
				if(data.message=="ready"){
					location.href ="http://localhost:8080/GEE/jsp/exhibit.jsp"
				}
			}
		});
	});
}

function statusjudge(){
	$("#ldemo").click(function(){
	    if(enline==0){
	    	enline=1;
	    }
	    else {
	    	enline=0;
	    }
	    if(endelete==1){
	    	endelete=0;
	    }
		if(enline==0){
	    	pointlisten();
	    }
		else {
			linelisten();	
		}
	});
	$("#ddemo").click(function(){
	    if(endelete==0){
	    	endelete=1;
	    }
	    else {
	    	endelete=0;
	    }
	    if(enline==1){
	    	enline=0;
	    }
		if(endelete==0){
	    	pointlisten();
	    }
		else {
		    deletelisten();	
		}
	});
	$("#empty").click(function(){
		$(".point").remove();
		$(".deletepoint").remove();
		$(".line").remove();
		$(".deleteline").remove();
		cmumber = smumber = hmumber = lmumber = 0;
		enline=endelete=0;
		pointlisten();
	});
}
function deletelisten(){
	unbindall();
    $("#ldemo").attr("style","background:url(../image/line1.png);background-size:100% 100%;top:320px;left:15px;");
    $("#ddemo").attr("style","background:url(../image/delete2.png);background-size:100% 100%;top:418px;left:13px;");
    $("#distribute").attr("class","darkbutton");
    $("#exhibit").attr("class","darkbutton");
    deletepointclick();
    deletelineclick();
    deletetheselected();
    
}
function linelisten(){
	unbindall();
	deleterecover();
    $("#ldemo").attr("style","background:url(../image/line2.png);background-size:100% 100%;top:318px;left:13px;");
    $("#ddemo").attr("style","background:url(../image/delete1.png);background-size:100% 100%;top:420px;left:15px;");
    $("#distribute").attr("class","darkbutton");
    $("#exhibit").attr("class","darkbutton");
    linecmousedown();
    linesmousedown();
    linehmousedown();
    
}
function pointlisten(){
	unbindall();
	endistribute();
	enexhibit();
	deleterecover();
	$("#ldemo").attr("style","background:url(../image/line1.png);background-size:100% 100%;top:320px;left:15px;");
	$("#ddemo").attr("style","background:url(../image/delete1.png);background-size:100% 100%;top:420px;left:15px;");
	$("#distribute").attr("class","button");
    $("#exhibit").attr("class","button");
    pointcmousedown();
    pointsmousedown();
    pointhmousedown();
    cmove();
    smove();  
    hmove();
    
}
function pointcmousedown(){
	$("#cdemo").mousedown(function(e){ //e鼠标事件
		cmumber++;
        $(this).css("cursor","move");//改变鼠标指针的形状 
        var offset = $(this).offset();//DIV在页面的位置 
        var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离 
        var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离
        cball = $("<div class='point controller' id='c"+ cmumber +"'><h5 class='tag'>c"+ cmumber +"</h5></div>");
        $(".balllevel").append(cball);
        $(document).bind("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件 
            $("#c"+ cmumber).stop();//加上这个之后 
            var _x = ev.pageX - x;//获得X轴方向移动的值 
            var _y = ev.pageY - y;//获得Y轴方向移动的值 
            $("#c"+ cmumber).animate({left:_x+"px",top:_y+"px"},10);
        });
        cmove();
     }); 
     $(document).mouseup(function(){ 
         $("#c"+ cmumber).css("cursor","default"); 
         $(this).unbind("mousemove"); 
     });
}
function pointsmousedown(){
	$("#sdemo").mousedown(function(e){ //e鼠标事件
     	 smumber++;
         $(this).css("cursor","move");//改变鼠标指针的形状 
         var offset = $(this).offset();//DIV在页面的位置 
         var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离 
         var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离 
         sball = $("<div class='point switch' id='s"+ smumber +"'><h5 class='tag'>s"+ smumber +"</h5></div>");
         $(".balllevel").append(sball);
         $(document).bind("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件 
             $("#s"+ smumber).stop();//加上这个之后 
             var _x = ev.pageX - x;//获得X轴方向移动的值 
             var _y = ev.pageY - y;//获得Y轴方向移动的值 
             $("#s"+ smumber).animate({left:_x+"px",top:_y+"px"},10); 
         });
         smove();
      }); 
      $(document).mouseup(function(){ 
          $("#s+ cmumber").css("cursor","default"); 
          $(this).unbind("mousemove"); 
      });
}
function pointhmousedown(){
	$("#hdemo").mousedown(function(e){ //e鼠标事件
        hmumber++;
        $(this).css("cursor","move");//改变鼠标指针的形状 
        var offset = $(this).offset();//DIV在页面的位置 
        var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离 
        var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离 
        hball = $("<div class='point host' id='h"+ hmumber +"'><h5 class='tag'>h"+ hmumber +"</h5></div>");
        $(".balllevel").append(hball);
        $(document).bind("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件 
            $("#h"+ hmumber).stop();//加上这个之后 
            var _x = ev.pageX - x;//获得X轴方向移动的值 
            var _y = ev.pageY - y;//获得Y轴方向移动的值 
            $("#h"+ hmumber).animate({left:_x+"px",top:_y+"px"},10); 
        });
        hmove();
    }); 
    $(document).mouseup(function(){ 
        $("#h+ hmumber").css("cursor","default"); 
        $(this).unbind("mousemove"); 
    });
}
function cmove(){
    $(".controller").mousedown(function(e){//e鼠标事件
        var i = $(e.target).attr("id");
        $(this).css("cursor","move");//改变鼠标指针的形状 
        var offset = $(this).offset();//DIV在页面的位置 
        var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离 
        var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离 
         
        var connect=[];                                        //获取与移动球相连的线的信息
        var connectnumber = 0;
        for(var l=1;l<=lmumber;l++){
        	ball1=$("#l"+l).attr("ball1");
        	ball2=$("#l"+l).attr("ball2");
        	if(i == ball1){
        		connectnumber++;
        		connect[connectnumber]=[l,ball2];
        	}
        	else if(i == ball2){
        		connectnumber++;
        		connect[connectnumber]=[l,ball1];
        	}
        }

        $(document).bind("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件 
            $("#"+i).stop();//加上这个之后 
            var _x = ev.pageX - x;//获得X轴方向移动的值 
            var _y = ev.pageY - y;//获得Y轴方向移动的值 
            $("#"+i).animate({left:_x+"px",top:_y+"px"},10);
            
            var offset = $("#"+i).offset();               //算出移动球球心
            var thisballcenter_x = offset.left + 33;
            var thisballcenter_y = offset.top + 33;
            for(var l=1;l<=connectnumber;l++){
            	var offset = $("#"+connect[l][1]).offset();               //算出这条线连接的另一个球的球心
                var thatballcenter_x = offset.left + 33;
                var thatballcenter_y = offset.top + 33;                
                drawline("l"+connect[l][0],thisballcenter_x,thisballcenter_y,thatballcenter_x,thatballcenter_y); //划线
            }
        });
        $(document).mouseup(function(){ 
         $("#"+i).css("cursor","default"); 
         $(this).unbind("mousemove"); 
        }); 
    });
}
function smove(){
	 $(".switch").mousedown(function(e){//e鼠标事件
         var i = $(e.target).attr("id");
         $(this).css("cursor","move");//改变鼠标指针的形状 
         var offset = $(this).offset();//DIV在页面的位置 
         var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离 
         var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离 
         
         var connect=[];                                        //获取与移动球相连的线的信息
         var connectnumber = 0;
         for(var l=1;l<=lmumber;l++){
         	ball1=$("#l"+l).attr("ball1");
         	ball2=$("#l"+l).attr("ball2");
         	if(i == ball1){
         		connectnumber++;
         		connect[connectnumber]=[l,ball2];
         	}
         	else if(i == ball2){
         		connectnumber++;
         		connect[connectnumber]=[l,ball1];
         	}
         }
         
         $(document).bind("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件 
             $("#"+i).stop();//加上这个之后 
             var _x = ev.pageX - x;//获得X轴方向移动的值 
             var _y = ev.pageY - y;//获得Y轴方向移动的值 
             $("#"+i).animate({left:_x+"px",top:_y+"px"},10); 
             var offset = $("#"+i).offset();               //算出移动球球心
             var thisballcenter_x = offset.left + 33;
             var thisballcenter_y = offset.top + 33;
             for(var l=1;l<=connectnumber;l++){
             	var offset = $("#"+connect[l][1]).offset();               //算出这条线连接的另一个球的球心
                 var thatballcenter_x = offset.left + 33;
                 var thatballcenter_y = offset.top + 33;               
                 drawline("l"+connect[l][0],thisballcenter_x,thisballcenter_y,thatballcenter_x,thatballcenter_y); //划线
             }
         });
         $(document).mouseup(function(){ 
          $("#"+i).css("cursor","default"); 
          $(this).unbind("mousemove"); 
         }); 
      });
}
function hmove(){
	$(".host").mousedown(function(e){//e鼠标事件
        var i = $(e.target).attr("id");
        $(this).css("cursor","move");//改变鼠标指针的形状 
        var offset = $(this).offset();//DIV在页面的位置 
        var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离 
        var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离 
        var connect=[];                                        //获取与移动球相连的线的信息
        var connectnumber = 0;
        for(var l=1;l<=lmumber;l++){
        	ball1=$("#l"+l).attr("ball1");
        	ball2=$("#l"+l).attr("ball2");
        	if(i == ball1){
        		connectnumber++;
        		connect[connectnumber]=[l,ball2];
        	}
        	else if(i == ball2){
        		connectnumber++;
        		connect[connectnumber]=[l,ball1];
        	}
        }
        $(document).bind("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件 
            $("#"+i).stop();//加上这个之后 
            var _x = ev.pageX - x;//获得X轴方向移动的值 
            var _y = ev.pageY - y;//获得Y轴方向移动的值 
            $("#"+i).animate({left:_x+"px",top:_y+"px"},10); 
            var offset = $("#"+i).offset();               //算出移动球球心
            var thisballcenter_x = offset.left + 33;
            var thisballcenter_y = offset.top + 33;
            for(var l=1;l<=connectnumber;l++){
            	var offset = $("#"+connect[l][1]).offset();               //算出这条线连接的另一个球的球心
                var thatballcenter_x = offset.left + 33;
                var thatballcenter_y = offset.top + 33;
                drawline("l"+connect[l][0],thisballcenter_x,thisballcenter_y,thatballcenter_x,thatballcenter_y); //划线
            }
        });
        $(document).mouseup(function(){ 
         $("#"+i).css("cursor","default"); 
         $(this).unbind("mousemove"); 
        }); 
     }); 
}
function linecmousedown(){
	$(".controller").mousedown(function(e){
		unbindall();
    	lmumber++;//加一根线
    	var ball1 = $(this).attr("id");
    	$(document).css("cursor","move");//改变鼠标指针的形状 
    	var offset = $(this).offset();//DIV在页面的位置 
    	var ballcenter_x = offset.left + 33;//获得球心x坐标
    	var ballcenter_y = offset.top + 33;//获得球心y坐标
    	
    	var svgnewline = svgnewlineinit();
    	svgnewline.setAttributeNS(null,"id","l"+lmumber);
    	linelevel.appendChild(svgnewline);
    	
        $(document).bind("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件 

        	var mousex = ev.pageX;//获取鼠标x坐标
        	var mousey = ev.pageY;//获取鼠标y坐标
        	
        	drawline("l"+lmumber,ballcenter_x,ballcenter_y,mousex,mousey); //划线
        	
        });
        $(".controller").mouseup(function(){ 
        	$(document).css("cursor","default");
            $(document).unbind("mousemove");

            var ball2 = $(this).attr("id");
            if(ball1 != ball2){
            	alert("控制器不能连接控制器");
            }
            $("#l"+lmumber).remove();
            lmumber--;
            unbindmouseup();
        	linelisten();
        });
        $(".switch").mouseup(function(){ 
            $(document).css("cursor","default");//换鼠标样式
            $(document).unbind("mousemove"); 
            
            var ball2 = $(this).attr("id");
            
            var overlooptag = 0;
            for(var l=1;l<=lmumber;l++){
            	var begin = $("#l"+l).attr("ball1"); 
            	var end = $("#l"+l).attr("ball2"); 
            	if((begin==ball1&&end==ball2)||(begin==ball2&&end==ball1)){
            		overlooptag++;
            	}
            }
            
            if(overlooptag){
            	$("#l"+lmumber).remove();
            	lmumber--;
            	alert("这条线已经连过了");
            }
            else{
            	var offset = $(this).offset();//DIV在页面的位置 
                
                var endballcenter_x = offset.left + 33;//获得鼠标指针离DIV元素左边界的距离 
                var endballcenter_y = offset.top + 33;//获得鼠标指针离DIV元素上边界的距离
                
                $("#l"+lmumber).attr("ball1",ball1);
                $("#l"+lmumber).attr("ball2",ball2);
                drawline("l"+lmumber,ballcenter_x,ballcenter_y,endballcenter_x,endballcenter_y);  //划线
            }
            unbindmouseup();
            linelisten();
        }); 
        $(".host").mouseup(function(){ 
        	$(document).css("cursor","default"); 
            $(document).unbind("mousemove");
            alert("控制器不能连接主机");
            
            $("#l"+lmumber).remove();
            lmumber--;
            
            unbindmouseup();
            linelisten();
            
        });
        $(document).mouseup(function(){ 
        	$(document).css("cursor","default");
        	$(document).unbind("mousemove");
            
            $("#l"+lmumber).remove();
            lmumber--;
            
            unbindmouseup();
            linelisten();
        });    
    }); 
}
function linesmousedown(){
	$(".switch").mousedown(function(e){
		unbindall();
    	lmumber++;//加一根线
    	
    	var ball1 = $(this).attr("id");
    	
    	$(document).css("cursor","move");//改变鼠标指针的形状 
    	var offset = $(this).offset();//DIV在页面的位置 
    	var ballcenter_x = offset.left + 33;//获得球心x坐标
    	var ballcenter_y = offset.top + 33;//获得球心y坐标
    	
    	var svgnewline = svgnewlineinit();
    	svgnewline.setAttributeNS(null,"id","l"+lmumber);
    	linelevel.appendChild(svgnewline);
    	
        $(document).bind("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件 
        	
        	var mousex = ev.pageX;//获取鼠标x坐标
        	var mousey = ev.pageY;//获取鼠标y坐标
        
        	drawline("l"+lmumber,ballcenter_x,ballcenter_y,mousex,mousey); //划线
        });
        $(".controller").mouseup(function(){ 
            $(document).css("cursor","default");//换鼠标样式
            $(document).unbind("mousemove"); 
            
            var ball2 = $(this).attr("id");
            
            var overlooptag = 0;
            for(var l=1;l<=lmumber;l++){
            	var begin = $("#l"+l).attr("ball1"); 
            	var end = $("#l"+l).attr("ball2"); 
            	if((begin==ball1&&end==ball2)||(begin==ball2&&end==ball1)){
            		overlooptag++;
            	}
            }
            
            if(overlooptag){
            	$("#l"+lmumber).remove();
            	lmumber--;
            	alert("这条线已经连过了");
            }
            else{
            	var offset = $(this).offset();//DIV在页面的位置 
                
                var endballcenter_x = offset.left + 33;//获得鼠标指针离DIV元素左边界的距离 
                var endballcenter_y = offset.top + 33;//获得鼠标指针离DIV元素上边界的距离
                
                $("#l"+lmumber).attr("ball1",ball1);
                $("#l"+lmumber).attr("ball2",ball2);
                drawline("l"+lmumber,ballcenter_x,ballcenter_y,endballcenter_x,endballcenter_y);  //划线
            }

            unbindmouseup();
            linelisten();
        });
        $(".switch").mouseup(function(){ 
            $(document).css("cursor","default");//换鼠标样式
            $(document).unbind("mousemove"); 
            
            var ball2 = $(this).attr("id");
            if(ball1 != ball2){
            	var overlooptag = 0;
                for(var l=1;l<=lmumber;l++){
                	var begin = $("#l"+l).attr("ball1"); 
                	var end = $("#l"+l).attr("ball2"); 
                	if((begin==ball1&&end==ball2)||(begin==ball2&&end==ball1)){
                		overlooptag++;
                	}
                }
                
                if(overlooptag){
                	$("#l"+lmumber).remove();
                	lmumber--;
                	alert("这条线已经连过了");
                }
                else{
                	var offset = $(this).offset();//DIV在页面的位置
                    var endballcenter_x = offset.left + 33;//获得鼠标指针离DIV元素左边界的距离 
                    var endballcenter_y = offset.top + 33;//获得鼠标指针离DIV元素上边界的距离
                
                    $("#l"+lmumber).attr("ball1",ball1);
                    $("#l"+lmumber).attr("ball2",ball2);
                    drawline("l"+lmumber,ballcenter_x,ballcenter_y,endballcenter_x,endballcenter_y);  //划线
                }
            	
            }
            else{
            	$("#l"+lmumber).remove();
                lmumber--;
            }
            unbindmouseup();
        	linelisten();
        });
        $(".host").mouseup(function(){ 
            $(document).css("cursor","default");//换鼠标样式
            $(document).unbind("mousemove");
            
            var ball2 = $(this).attr("id");
            
            var overlooptag = 0;
            for(var l=1;l<=lmumber;l++){
            	var begin = $("#l"+l).attr("ball1"); 
            	var end = $("#l"+l).attr("ball2"); 
            	if((begin==ball1&&end==ball2)||(begin==ball2&&end==ball1)){
            		overlooptag++;
            	}
            }
            
            if(overlooptag){
            	$("#l"+lmumber).remove();
            	lmumber--;
            	alert("这条线已经连过了");
            }
            else{
            	var offset = $(this).offset();//DIV在页面的位置
                var endballcenter_x = offset.left + 33;//获得鼠标指针离DIV元素左边界的距离 
                var endballcenter_y = offset.top + 33;//获得鼠标指针离DIV元素上边界的距离
            
                $("#l"+lmumber).attr("ball1",ball1);
                $("#l"+lmumber).attr("ball2",ball2);
                drawline("l"+lmumber,ballcenter_x,ballcenter_y,endballcenter_x,endballcenter_y);  //划线
            }
            
        	unbindmouseup();
        	linelisten();
        });
        $(document).mouseup(function(){ 
        	$(document).css("cursor","default");
        	$(document).unbind("mousemove");
            
            $("#l"+lmumber).remove();
            lmumber--;
            
            unbindmouseup();
            linelisten();
        }); 
    }); 
}
function linehmousedown(){
	$(".host").mousedown(function(e){
		unbindall();
    	lmumber++;//加一根线
    	
    	var ball1 = $(this).attr("id");
    	
    	$(document).css("cursor","move");//改变鼠标指针的形状 
    	var offset = $(this).offset();//DIV在页面的位置 
    	var ballcenter_x = offset.left + 33;//获得球心x坐标
    	var ballcenter_y = offset.top + 33;//获得球心y坐标
    	
    	var svgnewline = svgnewlineinit();
    	svgnewline.setAttributeNS(null,"id","l"+lmumber);
    	linelevel.appendChild(svgnewline);
    	
        $(document).bind("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件 
        	
        	var mousex = ev.pageX;//获取鼠标x坐标
        	var mousey = ev.pageY;//获取鼠标y坐标  
        
        	drawline("l"+lmumber,ballcenter_x,ballcenter_y,mousex,mousey); //划线
        });
        $(".controller").mouseup(function(){ 
        	$(document).css("cursor","default");
            $(document).unbind("mousemove");
            alert("主机不能连接控制器");
            
            $("#l"+lmumber).remove();
            lmumber--;
            
            unbindmouseup();
            linelisten();
            
        });
        $(".switch").mouseup(function(){ 
            $(document).css("cursor","default");//换鼠标样式
            $(document).unbind("mousemove"); 
            
            var ball2 = $(this).attr("id");
            
            var overlooptag = 0;
            for(var l=1;l<=lmumber;l++){
            	var begin = $("#l"+l).attr("ball1"); 
            	var end = $("#l"+l).attr("ball2"); 
            	if((begin==ball1&&end==ball2)||(begin==ball2&&end==ball1)){
            		overlooptag++;
            	}
            }
            
            if(overlooptag){
            	$("#l"+lmumber).remove();
            	lmumber--;
            	alert("这条线已经连过了");
            }
            else{
            	var offset = $(this).offset();//DIV在页面的位置
                var endballcenter_x = offset.left + 33;//获得鼠标指针离DIV元素左边界的距离 
                var endballcenter_y = offset.top + 33;//获得鼠标指针离DIV元素上边界的距离
            
                $("#l"+lmumber).attr("ball1",ball1);
                $("#l"+lmumber).attr("ball2",ball2);
                drawline("l"+lmumber,ballcenter_x,ballcenter_y,endballcenter_x,endballcenter_y);  //划线
            }
        	
        	unbindmouseup();
        	linelisten();
        });
        $(".host").mouseup(function(){ 
        	$(document).css("cursor","default");
            $(document).unbind("mousemove");

            var ball2 = $(this).attr("id");
            if(ball1 != ball2){
            	alert("主机不能连接主机");
            }
            $("#l"+lmumber).remove();
            lmumber--;
            unbindmouseup();
        	linelisten();
        });
        $(document).mouseup(function(){ 
        	$(document).css("cursor","default");
            $(document).unbind("mousemove");
            
            $("#l"+lmumber).remove();
            lmumber--;
            unbindmouseup();
            linelisten();
        });
        
    }); 
	
}
function deletepointclick(){
	$(".point").click(function(){
		var ballid = $(this).attr("id");
		var ballclass = $(this).attr("class");
		if(ballclass == "point controller"){
			$("#"+ballid).attr("class","deletepoint controller");
		}
		else if(ballclass == "point switch"){
			$("#"+ballid).attr("class","deletepoint switch");
		}
		else if(ballclass == "point host"){
			$("#"+ballid).attr("class","deletepoint host");
		} 
		var offset = $("#"+ballid).offset();
		var top = offset.top-4;
	    var left = offset.left-4;
	    $("#"+ballid).animate({left:left+"px",top:top+"px"},0);
		$(".point").unbind("click");
		$(".deletepoint").unbind("click");
		deletepointclick();
	});
	$(".deletepoint").click(function(){	
		var ballid = $(this).attr("id");
		var ballclass = $(this).attr("class");
	    if(ballclass == "deletepoint controller"){
			$("#"+ballid).attr("class","point controller");
		}
		else if(ballclass == "deletepoint switch"){
			$("#"+ballid).attr("class","point switch");
		}
		else if(ballclass == "deletepoint host"){
			$("#"+ballid).attr("class","point host");
		}
	    var offset = $("#"+ballid).offset();
	    var top = offset.top+4;
	    var left = offset.left+4;
	    $("#"+ballid).animate({left:left+"px",top:top+"px"},0);
	    $(".point").unbind("click");
		$(".deletepoint").unbind("click");
		deletepointclick();
	});
}
function deletelineclick(){
	$(".line").click(function(){
		var lineid = $(this).attr("id");
		$("#"+lineid).attr("class","deleteline");
		$(".line").unbind("click");
		$(".deleteline").unbind("click");
		deletelineclick();
	});
	$(".deleteline").click(function(){
		var lineid = $(this).attr("id");
		$("#"+lineid).attr("class","line");
		$(".line").unbind("click");
		$(".deleteline").unbind("click");
		deletelineclick();
	});
}
function deletetheselected(){
	$(document).keydown(function(e){
		if(e.which==46){
			for(var c=1;c<=cmumber;c++){
				if($("#c"+c).attr("class")=="deletepoint controller"){
					var id=$("#c"+c).attr("id")
					for(var l=1;l<=lmumber;l++){
						if($("#l"+l).attr("ball1")==id||$("#l"+l).attr("ball2")==id){
							$("#l"+l).remove();
						}
					}
				}
			}
			for(var s=1;s<=smumber;s++){
				if($("#s"+s).attr("class")=="deletepoint switch"){
					var id=$("#s"+s).attr("id")
					for(var l=1;l<=lmumber;l++){
						if($("#l"+l).attr("ball1")==id||$("#l"+l).attr("ball2")==id){
							$("#l"+l).remove();
						}
					}
				}
			}
			for(var h=1;h<=cmumber;h++){
				if($("#h"+h).attr("class")=="deletepoint host"){
					var id=$("#h"+h).attr("id")
					for(var l=1;l<=lmumber;l++){
						if($("#l"+l).attr("ball1")==id||$("#l"+l).attr("ball2")==id){
							$("#l"+l).remove();
						}
					}
				}
			}
			$(".deletepoint").remove();
			$(".deleteline").remove();
		}
	});
}
function deleterecover(){
	for(var c=1;c<=cmumber;c++){
		if($("#c"+c).attr("class")=="deletepoint controller"){
			$("#c"+c).attr("class","point controller");
			var offset = $("#c"+c).offset();
		    var top = offset.top+4;
		    var left = offset.left+4;
		    $("#c"+c).animate({left:left+"px",top:top+"px"},0);
		}
	}
	for(var s=1;s<=smumber;s++){
		if($("#s"+s).attr("class")=="deletepoint switch"){
			$("#s"+s).attr("class","point switch");
			var offset = $("#s"+s).offset();
		    var top = offset.top+4;
		    var left = offset.left+4;
		    $("#s"+s).animate({left:left+"px",top:top+"px"},0);
		}
	}
	for(var h=1;h<=cmumber;h++){
		if($("#h"+h).attr("class")=="deletepoint host"){
			$("#h"+h).attr("class","point host");
			var offset = $("#h"+h).offset();
		    var top = offset.top+4;
		    var left = offset.left+4;
		    $("#h"+h).animate({left:left+"px",top:top+"px"},0);
		}
	}
	for(var l=1;l<=cmumber;l++){
		if($("#l"+l).attr("class")=="deleteline"){
			$("#l"+l).attr("class","line");
			var offset = $("#l"+l).offset();
		    var top = offset.top+4;
		    var left = offset.left+4;
		    $("#l"+l).animate({left:left+"px",top:top+"px"},0);
		}
	}
}
function drawline(id,x1,y1,x2,y2){
	$("#"+id).attr("x1",x1);
	$("#"+id).attr("y1",y1);
	$("#"+id).attr("x2",x2);
	$("#"+id).attr("y2",y2);
}
function linelevelsvginit(){
	linelevel=document.getElementById("linelevel");
	xmlns = "http://www.w3.org/2000/svg"; 
}
function svgnewlineinit(){
	var svgnewline = document.createElementNS(xmlns,"line");
    svgnewline.setAttributeNS(null,"x1",0);
    svgnewline.setAttributeNS(null,"y1",0);
    svgnewline.setAttributeNS(null,"x2",0);
    svgnewline.setAttributeNS(null,"y2",0);
    svgnewline.setAttributeNS(null,"class","line");
    return svgnewline;
}
function unbindmouseup(){
	$(".controller").unbind("mouseup");
	$(".switch").unbind("mouseup");
	$(".host").unbind("mouseup");
	$(".linecanvas").unbind("mouseup");
	$(".point").unbind("mouseup");
	$(document).unbind("mouseup");
}
function unbindall(){
	$("#cdemo").unbind();
    $("#sdemo").unbind();
	$("#hdemo").unbind();
	$(".controller").unbind();
	$(".switch").unbind();
	$(".host").unbind();
	$(".linecanvas").unbind();
	$(".point").unbind();
	$(".deletepoint").unbind();
	$(".line").unbind();
	$(".deleteline").unbind();
	$("#distribute").unbind();
	$("#exhibit").unbind();
	$(document).unbind("keydown");
}
