//these are the variables that are saved in memory´
//This varible is for a hit counter
var hits = 0; 
//These four variables control where the dvd logo is(X, Y) and the size of it(width and height),
var dvdX = 100;
var dvdY = 100;
var dvdW = 330;
var dvdH = 150;

//speed varibable of the dvd logo
var dvdSpeedX = 2;
var dvdSpeedY = 2;

//This variable is used to run the RGB mode in the right speed
var dvdSpeedMult = 1;
var imgDvd; //displays the image of a DVD logo.

//this is the toggle for the rainbow mode
var activated = 0;
//these are the variables for the HSB sliders.
var hueVal = 0;
var satVal;
var brightVal;
var hueSpeed = 1; //speed to change hue color in rainbow mode
//Various sliders that control HSB color and the speed of the dvd logo via the variable values above.
var hueSlider;
var satSlider;
var brightSlider;
var dvdSlider;

//this is the RGB button
var dvdButton;

//this loads the imgDVD variable before the other code.
function preload() {
  imgDvd = loadImage('assets/DVD_VIDEO_logo.png');
}

// these are all the basic buttons and sliders that are loaded when the program runs.
function setup() {
  //creates a canvas(the browser application window) that adjust to the size of the window
  createCanvas(windowWidth,windowHeight);
   //creates a slider for the hue
   hueSlider = createSlider(0, 359, 0);
   hueSlider.position(50, 10);
   
   //creates a slider for the saturation   
   satSlider = createSlider (0,100, 75);
   satSlider.position(50, 40);
   
   //creates a slider for the brightness
   brightSlider = createSlider (0,100, 99);
   brightSlider.position(50, 70);
   
//creates a button from the dvdButton variable called RGB and sets the postion)   
   dvdButton = createButton('RGB');
   dvdButton.position(225, windowHeight-50);
   
//When the buttton is pressed it will call the rainbow function.   
   dvdButton.mousePressed(rainbow);
   
  //creates a slider for the speed of the dvd logo
   dvdSlider = createSlider (10,100, 2);
   dvdSlider.position(50, windowHeight-50);

//Sets the value of each HSB variable to the varible of the each corrospodning slider.
   brightVal = brightSlider.value();
   satVal = satSlider.value();
   hueVal = hueSlider.value();
}
//This function makes the rainbow  toggle work by running the variable activated and sets hue value acordenly to the state of "activated".
function rainbow() { //rainbow mode toggle
  if (activated == 0) {
    activated = 1;
    hueVal = 0;
  }
    else if (activated == 1) {
      activated = 0;
    }
}

//draw is a loop, which runs the code forever.
function draw() {
  drawBackground();
  fill(255,205,252);
  image(imgDvd, dvdX, dvdY, dvdW, dvdH);
  dvdX += dvdSpeedX * (dvdSpeedMult/10);
  dvdY += dvdSpeedY * (dvdSpeedMult/10);
  dvdSpeedMult = dvdSlider.value();
  
  textSize(48);
  text(hits, windowWidth/2, 50);
  collision();
  dvdSlider.position(50, windowHeight-50);
  textSize(30);
  text('Hue', hueSlider.x * 2 + hueSlider.width, 35);
  text('Saturation', satSlider.x * 2 + satSlider.width, 65);
  text('Brightness', brightSlider.x * 2 + brightSlider.width, 95);
  
  
  
}
  
//controls the collison depending on the window size
function collision() {
  if(dvdX > windowWidth - dvdW || dvdX < 0) {
    dvdSpeedX *=-1;
    hits++;
  }
  
  if(dvdY > windowHeight - dvdH || dvdY < 0) {
    dvdSpeedY *=-1;
    hits++;
  }
}
//updates the canvas, when the window is resized, so the collison function works after resizing.
function windowResized() { 
  resizeCanvas(windowWidth,windowHeight);
}
//This will draw the background to the color set by the sliders if RGB button is toggled)
function drawBackground() {
  colorMode(HSB);
  brightVal = brightSlider.value();
  satVal = satSlider.value();
  if(activated == 0) { //rainbow mode off
    hueVal = hueSlider.value();
    background(hueVal, satVal, brightVal, 1);
  }
//if 
  if(activated == 1) { //rainbow mode on
    hueSpeed = dvdSpeedMult/10;
    hueVal += hueSpeed;
    if(hueVal > 359) {
      hueVal = 0;      
    }
    background(hueVal, 100, 100, 1);
  }
//switches back p5.js to interpretate color in RGB(so other functions still work)
   colorMode(RGB);
}
