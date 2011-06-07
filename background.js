var w, h, output, canvas;

var resize = function() {
  w = window.innerWidth;
  h = window.innerHeight;
  
  canvas.setAttribute("width", w);
  canvas.setAttribute("height", h);
}

window.addEventListener("load", function() {
  output = document.querySelector("output");
  canvas = document.createElement("canvas");
  output.appendChild(canvas);
  
  resize();
  window.addEventListener("resize", resize, false);
  
  opera.extension.addEventListener("message", function(event) {
    if(event.data.what == "update") {
      update();
    }
  }, false);
  
  window.setInterval(function() {
    drawClock(canvas, w, h);
  }, 500);
}, false);
