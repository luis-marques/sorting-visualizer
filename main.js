var barSize = [];
var numberOfBars;
var backgroundColor = 230;

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    numberOfBars =40;
    for (i = 0; i < numberOfBars; i++){
        barSize[i] = random(20, windowHeight*0.8);
    }
    console.log(barSize)

    // min, max, default, step
    slider = createSlider(4, 100, numberOfBars, 1);
    slider.position(windowWidth*0.1,windowHeight*0.035);
    slider.style('width','80px');
}


function draw(){
    background(backgroundColor);

    // when slider changes value calls the updateNumberBars() function
    slider.changed(updateNumberBars)

    // calculates width of Bar Canvas
    widthBarCanvas = windowWidth*0.9 - windowWidth*0.1

    // calculates width of each bar to keep the above constant
    barWidth = widthBarCanvas/numberOfBars;


    for (i=0; i<barSize.length; i++){
          fill(0, 191, 255)
          stroke(backgroundColor);
          if (numberOfBars< 28){
              strokeWeight(barWidth*0.05);
          }
          else{
              strokeWeight(barWidth*0.1);
          }
        rect(width*0.1 + i*barWidth, windowHeight*0.1, barWidth, barSize[i]);

          if (numberOfBars<50){
              textAlign(CENTER);
              fill(255);
              noStroke();
              textSize(barWidth*0.4);
              text(round(barSize[i], 0), width*0.1 + i*barWidth + barWidth/2, windowHeight*0.1 + barWidth/2);
          }
    }
    // Menu Bar
    noStroke();
    fill(120);
    rect(0,0, windowWidth,windowHeight*0.1,);

    slider.position(windowWidth*0.02, windowHeight*0.015);
    slider.size(windowWidth*0.1,windowHeight*0.035);

    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(windowHeight*0.04);
    text("# of bars: " + slider.value(), windowWidth*0.02 + windowWidth*0.1/2, windowHeight*0.08);

    fill(100);
    rect(windowWidth*0.04 + windowWidth*0.1,0, 8,windowHeight*0.1,);

    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(windowHeight*0.04);
    text("Sort!", windowWidth*0.9, windowHeight*0.065);

}

function updateNumberBars(){
    barSize = [];
    numberOfBars = slider.value();
    for (i = 0; i < numberOfBars; i++){
        barSize[i] = random(20, windowHeight*0.8);
    }
}

``
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}