// default preference object
var prefd = {
  hcolor: "#000000", mcolor: "#000000", scolor: "#ed1c24", hwidth: 44, mwidth: 25,
  swidth: 10, macolor: "#ffffff", micolor: "#000000", fcolor: "#7f7f7f", bgcolor: "#ffffff",
  hhlength: 35, htlength: 14, mhlength: 43, mtlength: 14, shlength: 45,
  stlength: 14, mawidth: 20, miwidth: 10, madist: 14, malength: 16, midist: 14,
  milength: 11, bgpath: "bgs/b.png", bocolor: "#ffffff",
  href: "http://en.wikipedia.org/wiki/Time"
};

// preference object
var pref = {};
  
// function which updates the preference object
var update = function() {
  for(var key in prefd) {
    if(widget.preferences[key]) {
      if(typeof(prefd[key]) == "number") pref[key] = parseInt(widget.preferences[key]);
      else pref[key] = widget.preferences[key];
    } else {
      pref[key] = prefd[key];   // copy default preference
    }
  }
  
  if(pref.bgpath) {
    pref.bgimage = document.createElement("img");
    pref.bgimage.src = pref.bgpath;
  } else pref.bgimage = null;
  
  if(pref.fgpath) {
    pref.fgimage = document.createElement("img");
    pref.fgimage.src = pref.fgpath;
  } else pref.fgimage = null;
}

// update the prefeence object
update();

// function drawing the actual clock
function drawClock(canvas, w, h) {
  var ctx = canvas.getContext('2d'); ctx.save();
  ctx.clearRect(0, 0, w, h);
  
  // draw background
  ctx.fillStyle = pref.bgcolor;
  ctx.fillRect(0,0,w,h);
  
  ctx.translate(w/2, h/2); ctx.scale(Math.min(w,h)/2, Math.min(w,h)/2); ctx.scale(0.9, 0.9);
  
  // draw clock face (color and image over it)
  ctx.fillStyle = pref.fcolor;
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, Math.PI*2, true);
  ctx.fill();
  
  if(pref.bgimage) {
    ctx.drawImage(pref.bgimage, -1, -1, 2, 2);
  }
  
  // draw minor scale (minutes/seconds)
  ctx.lineWidth = pref.miwidth / 60 * 0.125;
  ctx.strokeStyle = pref.micolor;
  for(var i=0; i<60; i++) {
    ctx.beginPath();
    ctx.moveTo(0, -1 + 0.5 * pref.midist / 60);
    ctx.lineTo(0, -1 + 0.5 * pref.midist / 60 + 0.5 * pref.milength / 60);
    ctx.stroke();
    
    ctx.rotate(Math.PI / 30);
  }
  
  // draw major scale (hours)
  ctx.lineWidth = pref.mawidth / 60 * 0.125;
  ctx.strokeStyle = pref.macolor;
  for(var i=0; i<12; i++) {
    ctx.beginPath();
    ctx.moveTo(0, -1 + 0.5 * pref.madist / 60);
    ctx.lineTo(0, -1 + 0.5 * pref.madist / 60 + 0.5 * pref.malength / 60);
    ctx.stroke();
    
    ctx.rotate(Math.PI / 6);
  }
  
  // set shadow
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur    = 2;
  ctx.shadowColor   = 'rgba(0, 0, 0, 0.5)';
  
  var date = new Date();
  
  // draw hour hand
  ctx.save();
  ctx.strokeStyle = pref.hcolor;
  ctx.lineWidth = 0.125 * pref.hwidth / 60;
  ctx.rotate(date.getHours() * Math.PI / 6 + date.getMinutes() * Math.PI / 6 / 60);
  ctx.beginPath();
  ctx.moveTo(0, pref.htlength / 60);
  ctx.lineTo(0, -pref.hhlength / 60);
  ctx.stroke();
  ctx.restore();
  
  // draw minute hand
  ctx.save();
  ctx.strokeStyle = pref.mcolor;
  ctx.lineWidth = 0.125 * pref.mwidth / 60;
  ctx.rotate(date.getMinutes() * Math.PI / 30 + date.getSeconds() * Math.PI / 30 / 60);
  ctx.beginPath();
  ctx.moveTo(0, pref.mtlength/60);
  ctx.lineTo(0, -pref.mhlength/60);
  ctx.stroke();
  ctx.restore();
  
  // draw second hand
  ctx.save();
  ctx.strokeStyle = pref.scolor;
  ctx.lineWidth = 0.125 * pref.swidth / 60;
  ctx.rotate(date.getSeconds() * Math.PI / 30);
  ctx.beginPath();
  ctx.moveTo(0, pref.stlength/60);
  ctx.lineTo(0, -pref.shlength/60);
  ctx.stroke();
  ctx.restore();
  
  // draw glare
  ctx.shadowColor   = 'rgba(0, 0, 0, 0.0)';
  //ctx.drawImage(fgimage, -1, -1, 2, 2);
  
  // draw clock face border
  ctx.shadowColor   = 'rgba(0, 0, 0, 0.5)';
  ctx.lineWidth = 0.1;
  ctx.strokeStyle = pref.bocolor;
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, Math.PI*2, true);
  ctx.stroke();
  
  ctx.restore();
}
