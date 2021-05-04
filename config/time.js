// 1618785312

// let val = 1618785312;
// let time = get;

// const timeall = time - val;
// if (timeall < 60) {
//   console.log("few");
// } else if (timeall > 60 && timeall < 3600) {
//   let timed = timeall / 60;
//   timed = Math.floor($timed);
//   console.log(timed + "min");
// } else if (timeall > 3600 && timeall < 86400) {
//   let timed = $timeall / 3600;
//   timed = Math.Math.floor($timed);
//   console.log(timed + "hr");
// } else if (timeall > 86400 && timeall < 604800) {
//   let timed = timeall / 86400;
//   timed = Math.floor($timed);
//   console.log(timed + "jr");
// } else if (timeall > 604800 && timeall < 18144000) {
//   let timed = $timeall / 604800;
//   timed = Math.floor($timed);
//   console.log(timed + "week");
// }

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
  //   console.log("fuck times");
  tt = 0;
}

module.exports = tt;
