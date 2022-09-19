//定義
var AINO,DAIGAKU,SHIZUOKA,HAMAMATU,DATE;
var body=document.getElementById("body");
Set_Datas();
//関数---------------------------------------------------------------------
function View_Station(){
  var div=document.createElement("div");
  div.classList.add("content");
  div.id="content"
  div.appendChild(View_Station_Soon(SHIZUOKA,"静岡方面",4));
  div.appendChild(View_Station_Soon(HAMAMATU,"浜松方面",4));
  body.appendChild(div);
  var button = document.createElement("button");
  button.setAttribute("onclick","More_Info_Station()");
  button.id ="button";
  button.classList.add("button")
  button.innerHTML = "+";
  body.appendChild(button);
}

function More_Info_Station(){
  var div = document.getElementById("content")
  div.innerHTML = ""
  div.appendChild(View_Station_Soon(SHIZUOKA,"静岡方面",50));
  div.appendChild(View_Station_Soon(HAMAMATU,"浜松方面",50));
  var button = document.getElementById("button");
  button.innerHTML = "-";
  button.setAttribute("onclick","Decrease_Info_Station()");
}

function Decrease_Info_Station(){
  var div = document.getElementById("content")
  div.innerHTML = ""
  div.appendChild(View_Station_Soon(SHIZUOKA,"静岡方面",4));
  div.appendChild(View_Station_Soon(HAMAMATU,"浜松方面",4));
  var button = document.getElementById("button");
  button.innerHTML = "+";
  button.setAttribute("onclick","More_Info_Station()");
}

function View_Station_Soon(times,description,view_num){
  var div=document.createElement("div");
  var p=document.createElement("p");
  p.innerHTML=description;
  p.classList.add("bus-soon-desc");
  div.appendChild(p);
  div.classList.add("bus-soon");
  var count=0;
  for(var i=0;i<times.length&&count<view_num;i++){
    if(
      (times[i*3]>DATE.getHours())
      ||
      (times[i*3]==DATE.getHours()&&times[1+i*3]>DATE.getMinutes())
      ){
      var p=document.createElement("p");
      p.innerHTML=times[i*3]+":"+String(times[1+i*3]).padStart(2, '0')+" "+times[2+i*3];
      div.appendChild(p);
      count++;
    }
  }
  return div;
}

function Set_Datas(){
  var SH = new XMLHttpRequest();
  SH.addEventListener("load", Shizuoka_To_Hamamatu);
  SH.open("GET", "../DATA/SH.txt");
  SH.send();
  var HS = new XMLHttpRequest();
  HS.addEventListener("load", Hamamatu_To_Shizuoka);
  HS.open("GET", "../DATA/HS.txt");
  HS.send();
  DATE = new Date();
}

function Aino_To_Daigaku () {
  AINO=this.responseText.split(",");
  for(i=0;i<AINO.length;i++){
     AINO[i]=AINO[i].replace('\r\n','');
  }
}

function Daigaku_To_Aino () {
  DAIGAKU=this.responseText.split(",");
  for(i=0;i<DAIGAKU.length;i++){
     DAIGAKU[i]=DAIGAKU[i].replace('\r\n','');
  }
}

function Shizuoka_To_Hamamatu () {
  HAMAMATU=this.responseText.split(",");
  for(i=0;i<HAMAMATU.length;i++){
    HAMAMATU[i]=HAMAMATU[i].replace('\r\n','');
  }
  Do_View();
}

function Hamamatu_To_Shizuoka () {
  SHIZUOKA=this.responseText.split(",");
  for(i=0;i<SHIZUOKA.length;i++){
    SHIZUOKA[i]=SHIZUOKA[i].replace('\r\n','');
  }
  Do_View();
}

function Do_View(){
  if(SHIZUOKA.length&&HAMAMATU.length){
    console.log("GO");
    View_Station();
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