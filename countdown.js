var WINDOW_WIDTH=1500;
var WINDOW_HEIGHT=500;
var RADIUS=8;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;

var data = new Date();
var hours=data.getHours();
var minutes=data.getMinutes();
var seconds=data.getSeconds();
var balls=[];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
window.onload=function(){
	

	var can=window.document.getElementById('can');
	var cans=can.getContext('2d');

	can.width=WINDOW_WIDTH;
	can.height=WINDOW_HEIGHT;
	
	render(cans);
setInterval(
function(){
	
	
	update(cans);
	//render(cans);
},
50
	);
	
	
	
}

function render(cxt){

	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);	
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);//
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);//
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
	}
	
}

function renderDigit (x,y,num,cxt) {
	cxt.fillStyle="#a9a9a9"

	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+RADIUS+1,y+i*2*(RADIUS+1)+RADIUS+1,RADIUS,0,Math.PI*2,true);
				cxt.closePath();
				cxt.fill();

}
}
function update(cxt){

var data = new Date();
		
if(seconds!=data.getSeconds()){
	if(hours!=data.getHours()){
		addballs(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10));
		addballs(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10));
	}
	if(minutes!=data.getMinutes()){
		addballs(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10));
		addballs(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10));
	}
		addballs(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10));
		addballs(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10));
	 hours=data.getHours();
	 minutes=data.getMinutes();
	 seconds=data.getSeconds();
	 
	 
}
render(cxt);
updateballs(cxt);
	console.log(balls.length);
	

}
function addballs(x,y,num){
	

	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1){
				var aball={
					x:x+j*2*(RADIUS+1)+RADIUS+1,
					y:y+i*2*(RADIUS+1)+RADIUS+1,
					g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
				}
				balls.push(aball);
				
				
}
}
function updateballs(cxt){


	

	for(var i=0;i<balls.length;i++){
	balls[i].x=balls[i].x+balls[i].vx;
	balls[i].y=balls[i].y+balls[i].vy;
	balls[i].vy=balls[i].vy+balls[i].g;

	if(balls[i].y>=WINDOW_HEIGHT-RADIUS)
	{
		balls[i].y=WINDOW_HEIGHT-RADIUS;
		balls[i].vy=-(balls[i].vy/2);
	}
	if (!(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH)) {

			balls.splice(i,1);

		}
}


		

	
}