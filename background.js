window.addEventListener("load", function() {
  var w = window.innerWidth, h = window.innerHeight;
  
  var output = document.querySelector("output");
  var canvas = document.createElement("canvas");
  output.appendChild(canvas);
  
  window.addEventListener("resize", function() {
    w = window.innerWidth;
    h = window.innerHeight;
    
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
  }, false);
  
  opera.extension.addEventListener("message", function(event) {
    if(event.data.what == "update") {
      update();
    }
  }, false);
  
  window.setInterval(function() {
    drawClock(canvas, w, h);
  }, 500);
}, false);
