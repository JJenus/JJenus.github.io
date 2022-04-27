$(function () {
  // body...
  
  
  function fmt(val) {
    // body...
    if(val < 10)
      return "0"+val;
    return val;
  }
  
  
  function startTime() {
    let date = new moment()
  let tomorrow;
  tomorrow = moment().add(1, 'days')
  tomorrow.startOf('day');
  var tm ;
  
  let yesterday;
  yesterday = moment().add(-1, 'days')
  yesterday.startOf('day'); 
  var ys;
  
  var now = new moment();
  
    
    tm = fmt(Math.abs( tomorrow.diff(now, "hours"))) + ':' + fmt(Math.abs((tomorrow.diff(now, "minutes") % 60))) + ''
    
    ys = fmt(Math.abs( yesterday.diff(now, "hours"))) + ':' + fmt(Math.abs( (yesterday.diff(now, "minutes") % 60))) + ''
    
    $("#today").text(date.format('HH:mm'))
    $("#yest").text(ys)  
    $("#tom").text(tm) 
    $("#secs").text(date.format('ss'))
    
    $("#ysd").text(yesterday.format("ddd, MMM YY"))
    $("#td").text(date.format("ddd, MMM YYYY")) 
    $("#tmd").text(tomorrow.format("ddd, MMM YY")) 
   
    var t = setTimeout(startTime, 500);
  }

startTime();
  
  
})