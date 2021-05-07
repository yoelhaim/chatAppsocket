let val = 1618791395191;
let time = Date.now();
let times = (time - val) / 1000;
let tt = 0;

if (times < 60) {
  tt = 1;
  //   console.log("few seccond");
} else if (times > 60 && times < 60 * 60) {
  tt = times / 60;
  tt = Math.floor(tt);
  //   console.log(tt + "min");
} else if (times >= 60 * 60 && times < 60 * 60 * 24) {
  tt = times / (60 * 60);
  tt = Math.floor(tt);
  //console.log(tt + "h");
} else {
  tt = 0;
}

module.exports = tt;
