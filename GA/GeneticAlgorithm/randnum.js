export function rand(){

  var x = parseInt(Math.random() * (100 - 10 ) + 10);
  var y = parseInt(Math.random() * (100 - 10 ) + 10);

  return {x,y};
}
