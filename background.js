opera.isReady(function(){
var w = window["w"], h = window["h"], output = window["output"], canvas = window["canvas"];
var resize = window["resize"] = function() {
  w = window.innerWidth;
  h = window.innerHeight;
  
  canvas.setAttribute("width", w);
  canvas.setAttribute("height", h);
};
window.addEventListener("load", function() {
  output = document.querySelector("output");
  canvas = document.createElement("canvas");
  output.appendChild(canvas);
  
  resize();
  window.addEventListener("resize", resize, false);  
  opera.contexts.speeddial.url = pref.href;
  
  opera.extension.addEventListener("message", function(event) {
    if(event.data.what == "update") {
      update();
      opera.contexts.speeddial.url = pref.href;
    }
  }, false);
  
  window.setInterval(function() {
    drawClock(canvas, w, h);
  }, 500);
}, false);
});
