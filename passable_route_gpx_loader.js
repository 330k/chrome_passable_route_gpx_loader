(function () {
  let func_str = '!function(){let t=async function(t){var e;let n=await (e=t,new Promise(function(t,n){try{let l=new FileReader,i=new DOMParser;l.onload=function(){t(i.parseFromString(l.result,"text/xml"))},l.readAsText(e,"utf-8")}catch(o){n(o)}})),l=t.name,i=[],o=[];for(let a of n.querySelectorAll("trkpt"))i.push({latitude:a.getAttribute("lat")-0,longitude:a.getAttribute("lon")-0});for(let r of n.querySelectorAll("wpt"))o.push({latitude:r.getAttribute("lat")-0,longitude:r.getAttribute("lon")-0,name:r.querySelector("name").textContent});return{name:l,coords:i,points:o}};if(!document.getElementById("gpx_files")){let e=document.createElement("input");e.id="gpx_files",e.type="file",e.accept=".gpx",e.multiple=!0,e.style.display="none",document.getElementById("divMap").appendChild(e),e.addEventListener("change",async function(e){for(let n of(map.entities.clear(),e.target.files)){let l=await t(n),i=new Microsoft.Maps.Polyline(l.coords,{strokeColor:"#3f3d9aa0",strokeThickness:3});map.entities.push(i);let o=Microsoft.Maps.LocationRect.fromLocations(l.coords);map.setView({bounds:o});let a=l.points.map(t=>new Microsoft.Maps.Pushpin({latitude:t.latitude,longitude:t.longitude},{title:t.name}));a.map(t=>map.entities.push(t))}})}document.getElementById("gpx_files").click()}();';
  
  const BUTTON_ID = "__330k_button";
  
  let ele = document.getElementById(BUTTON_ID);
  if(ele === null){
    ele = document.createElement("div");
    ele.innerHTML = "<a href='javascript:" + func_str + "' accesskey='w' style='color:black;display:inline-block;width:100%;height:100%;'>GPXファイル読み込み</a></div>";
    ele.id = BUTTON_ID;
    ele.style.display = "block";
    ele.style.border = "1px solid black";
    ele.style.backgroundColor = "#eee";
    ele.style.textAlign = "center";
    ele.style.width = "150px";
    
    document.getElementById("divMap").appendChild(ele);
  }
})();
