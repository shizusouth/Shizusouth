//定義
var AINO,DAIGAKU,SHIZUOKA,HAMAMATU,DATE;
var body=document.getElementById("body");
Set_Datas();
//関数---------------------------------------------------------------------
function View_Bus(){
  var div=document.createElement("div");
  div.classList.add("content");
  div.id = "content"
  div.appendChild(View_Bus_Soon(AINO,"愛野駅->大学",4));
  div.appendChild(View_Bus_Soon(DAIGAKU,"大学->愛野駅",4));
  body.appendChild(div);
  var button = document.createElement("button");
  button.setAttribute("onclick","More_Info_Bus()");
  button.id ="button";
  button.classList.add("button");
  button.innerHTML = "+";
  body.appendChild(button);
}

function More_Info_Bus(){
  var div = document.getElementById("content");
  div.innerHTML = ""
  div.appendChild(View_Bus_Soon(AINO,"愛野駅->大学",50));
  div.appendChild(View_Bus_Soon(DAIGAKU,"大学->愛野駅",50));
  var button = document.getElementById("button");
  button.innerHTML = "-";
  button.setAttribute("onclick","Decrease_Info_Bus()");
}
function Decrease_Info_Bus(){
  var div = document.getElementById("content");
  div.innerHTML = "";
  div.appendChild(View_Bus_Soon(AINO,"愛野駅->大学",4));
  div.appendChild(View_Bus_Soon(DAIGAKU,"大学->愛野駅",4));
  var button = document.getElementById("button")
  button.innerHTML = "+";
  button.setAttribute("onclick","More_Info_Bus()");
}

function View_Bus_Soon(times,description,view_num){
  var div=document.createElement("div");
  var p=document.createElement("p");
  p.innerHTML=description;
  p.classList.add("bus-soon-desc");
  div.appendChild(p);
  div.classList.add("bus-soon");
  var count=0;
  for(var i=0;i<(times.length)/2&&count<view_num;i++){
    if(
      (times[i*3]==DATE.getHours()&&times[1+i*3]>DATE.getMinutes())||
      times[i*3]>DATE.getHours()
    ){
      var p=document.createElement("p");
      p.innerHTML=times[i*3]+":"+String(times[1+i*3]).padStart(2, '0');
      div.appendChild(p);
      count++;
    }
  }

  if(
    (DATE.getHours()>times[times.length-3])||
    (DATE.getHours()==times[times.length-3]&&DATE.getMinutes()>times[times.length-2])
  ){
    var p=document.createElement("p");
    p.innerHTML="　本日のバスは終了しました";
    div.appendChild(p);
  }
  return div;
}
function Set_Datas(){
  var AD = new XMLHttpRequest();
  AD.addEventListener("load", Aino_To_Daigaku);
  AD.open("GET", "../DATA/AD.txt?data=11");
  AD.send();
  var DA = new XMLHttpRequest();
  DA.addEventListener("load", Daigaku_To_Aino);
  DA.open("GET", "../DATA/DA.txt?data=11");
  DA.send();
  DATE = new Date();
}

function Aino_To_Daigaku () {
  AINO=this.responseText.split(",");
  for(i=0;i<AINO.length;i++){
     AINO[i]=AINO[i].replace('\r\n','');
  }
  Do_View();
}

function Daigaku_To_Aino () {
  DAIGAKU=this.responseText.split(",");
  for(i=0;i<DAIGAKU.length;i++){
     DAIGAKU[i]=DAIGAKU[i].replace('\r\n','');
  }
  Do_View();
}

function Shizuoka_To_Hamamatu () {
  HAMAMATU=this.responseText.split(",");
  for(i=0;i<HAMAMATU.length;i++){
    HAMAMATU[i]=HAMAMATU[i].replace('\r\n','');
  }
}

function Hamamatu_To_Shizuoka () {
  SHIZUOKA=this.responseText.split(",");
  for(i=0;i<SHIZUOKA.length;i++){
    SHIZUOKA[i]=SHIZUOKA[i].replace('\r\n','');
  }
}
function Do_View(){
  if(AINO.length&&DAIGAKU.length){
    console.log("GO");
    View_Bus();
  }else{
    console.log("YET");
  }
}
function view_menu(){
  var menu=document.getElementById("menu");
  menu.style.display="block";
}
function close_menu(){
  var menu=document.getElementById("menu");
  menu.style.display="none";
}