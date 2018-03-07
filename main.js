function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

createSection = function(){
    const div = document.createElement("div");
    const body = document.querySelector("body");
    const width = body.clientWidth;
    const height = body.clientHeight;
    body.appendChild(div);


    const points = [];
    const lineWidth = 3;

    const stage = new Konva.Stage({
        container: div,
        width: width,
        height: height
    });

    const layer = new Konva.Layer();
    const addPoint = function(margin) {
        const point = calculateRandomPoint(margin, width, height);
        points.push(point[0], point[1]);
    }
    points.push(width/2, -lineWidth/2);
    points.push(width/2, 0);

    for (var i = 0; i < numberOfPoints; i++) {
        addPoint(.7);
    }

    points.push(
        width/2 ,
        height - lineWidth/2
    );
    points.push(
        width/2 ,
        height + lineWidth/2
    );

    const line = new Konva.Line({
         points: points,
         stroke: 'black',
         strokeWidth: lineWidth,
         closed : false,
         tension : tension
       });
    layer.add(line);
    stage.add(layer);
}

calculateRandomPoint = function(margin, width, height){

    if (!margin) {
        margin = 1;
    }

    return [
        width/2 - Math.random()*(width*margin) + (width*margin)/2,
        height/2 - Math.random()*(height*margin) + (height*margin)/2
    ]
}
setTension = function(){
    let tension = parseInt(getParameterByName("tension"), 10);
    if (isNaN(tension)) {
        return Math.floor(Math.random()*10)/10;
    }
    while (tension > 1) {
        tension = tension/10;
    }
    console.log(tension, tension <= 0 ? 0 : tension);

    return tension <= 0 ? 0 : tension;
}


const numberOfPoints = getParameterByName("points") || 3;
const tension = setTension();
let ticking = false;


// On load
window.onload = function() {
    createSection();
    createSection();
}

// On Scroll
window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {

    window.requestAnimationFrame(function() {
      if (window.scrollY % document.querySelector("body").clientHeight < 20) {
          createSection();
      }
      ticking = false;
    });

    ticking = true;

  }

});