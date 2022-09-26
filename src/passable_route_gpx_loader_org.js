// minify: https://www.toptal.com/developers/javascript-minifier
(function(){
  const readXML = function(file){
    return new Promise(function(resolve, reject){
      try{
        const reader = new FileReader();
        const parser = new DOMParser();

        reader.onload = function(){
          resolve(parser.parseFromString(reader.result, "text/xml"));
        };
        reader.readAsText(file, "utf-8");
        
      }catch(e){
        reject(e);
      }
    });
  };
  const parseGPX = async function(file){
    const xml = await readXML(file);
    const name = file.name;
    const coords = [];
    const points = [];

    for(const trkpt of xml.querySelectorAll("trkpt")){
      coords.push({
        latitude: trkpt.getAttribute("lat") - 0,
        longitude: trkpt.getAttribute("lon") - 0
      });
    }
    for(const wpt of xml.querySelectorAll("wpt")){
      points.push({
        latitude: wpt.getAttribute("lat") - 0,
        longitude: wpt.getAttribute("lon") - 0,
        name: wpt.querySelector("name").textContent
      });
    }
    
    return {
      name,
      coords,
      points
    };
  }
  if(!document.getElementById("gpx_files")){
    const ele = document.createElement("input");
    ele.id = "gpx_files";
    ele.type = "file";
    ele.accept = ".gpx";
    ele.multiple = true;
    ele.style.display = "none";
    document.getElementById("divMap").appendChild(ele);
    
    ele.addEventListener("change", async function(evt){
      map.entities.clear()
      for(const file of evt.target.files){
        const gpx = await parseGPX(file);
        const line = new Microsoft.Maps.Polyline(gpx.coords, {
            strokeColor: "#3f3d9aa0",
            strokeThickness: 3
        });
        map.entities.push(line);
        const rect = Microsoft.Maps.LocationRect.fromLocations(gpx.coords);
        map.setView({ bounds: rect});
        
        const pins = gpx.points.map((e) => new Microsoft.Maps.Pushpin({
          latitude: e.latitude,
          longitude: e.longitude
        }, {
          title: e.name
        }));
        pins.map(e => map.entities.push(e));
      }
    });
  };
  document.getElementById("gpx_files").click();
})();
