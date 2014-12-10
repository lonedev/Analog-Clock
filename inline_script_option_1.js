opera.isReady(function(){
for (var k in pref) {
  var e = document.getElementById(k);
  if (e) {
    e.value = pref[k];
  }
}
var inputs = window["inputs"] = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
  if (inputs[i].title) {
    var box = document.createElement("div");
    box.className = "box";
    var label = document.createElement("label");
    label.innerText = inputs[i].title + ":";
    box.appendChild(label);
    inputs[i].parentNode.insertBefore(box, inputs[i]);
    box.appendChild(inputs[i]);
  }
}
for (var i = 0; i < inputs.length; i++) {
  if (!inputs[i].id) continue;
  inputs[i].onchange = (function(id) {
    return function() {
      widget.preferences.setItem(id, this.value);
      update();
      drawClock(canvas, 128, 128);
      opera.extension.postMessage({
        what: "update"
      });
    };
  })(inputs[i].id);
}
var hiders = window["hiders"] = document.querySelectorAll(".toggle");
for (var i = 0; i < hiders.length; i++) {
  hiders[i].onmousedown = function() {
    var next = this.nextSibling;
    if (next != null) {
      if (next.className == "hidden") {
        next.className = "";
      } else {
        next.className = "hidden";
      }
    }
    return false;
  };
}
document.querySelector("#export").onclick = function() {
  window.open("data:text/plain," + encodeURIComponent(JSON.stringify(widget.preferences, null, " ")), "Analog Clock preferences");
};
document.querySelector("#reset").onclick = function() {
  if (confirm("Are you sure you want to revert settings to their default values?")) {
    for (key in prefd) {
      if (widget.preferences[key]) widget.preferences.setItem(key, prefd[key]);
    }
    update();
    opera.extension.postMessage({
      what: "update"
    });
  }
};
var canvas = window["canvas"] = document.querySelector("#clock");
window.setInterval(function() {
  drawClock(canvas, 128, 128);
}, 500);
});
