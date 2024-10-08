var rev = "fwd";
function titlebar(val) {
  var msg = "KonaloboWorld!";
  var res = "KonaloboWorld!";
  var speed = 300;
  var pos = val;
  msg = "   |-" + msg + "-|";
  var le = msg.length;
  if (rev == "fwd") {
    if (pos < le) {
      pos = pos + 1;
      scroll = msg.substr(0, pos);
      document.title = scroll;
      timer = window.setTimeout("titlebar(" + pos + ")", speed);
    } else {
      rev = "bwd";
      timer = window.setTimeout("titlebar(" + pos + ")", speed);
    }
  } else {
    if (pos > 0) {
      pos = pos - 1;
      var ale = le - pos;
      scrol = msg.substr(ale, le);
      document.title = scrol;
      timer = window.setTimeout("titlebar(" + pos + ")", speed);
    } else {
      rev = "fwd";
      timer = window.setTimeout("titlebar(" + pos + ")", speed);
    }
  }
}
titlebar(0);