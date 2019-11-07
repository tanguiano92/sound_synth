'use strict';

let rainSound;

let makeRain;

let bees;

let makeBee;

let peeps;

let springPeepers;

let stormy;

let storm;

let spill;

let water;

let reverbBtn;
let delayBtn;

let reverb;
let delay;

let osc;

let waveFormSelect;

let pNoise;

var capture;
var tracker
var w = 640,
  h = 480;

let faceCentered = false;

function preload() {
  soundFormats('mp3', 'ogg');
  rainSound = loadSound('audio/rain.mp3');
  makeBee = loadSound('audio/bees.mp3');
  springPeepers = loadSound('audio/spring_peepers.mp3');
  storm = loadSound('audio/thunderstorm.mp3')
  water = loadSound('audio/river.wav');
}

function setup() {
  noCanvas();

  osc = new p5.Oscillator('square');

  // create dropdown menu to change osc Type
  createSpan('Select waveform: ');
  waveFormSelect = createSelect();
  waveFormSelect.option('sine');
  waveFormSelect.option('sawtooth');
  waveFormSelect.option('square');
  waveFormSelect.option('triangle');
  waveFormSelect.changed(setWaveForm);

  makeRain = select('#makeRainSound');
  makeRain.mousePressed(rain);
  spill = select('#makeWaterSpill');
  spill.mousePressed(waters);
  bees = select('#makeBees');
  bees.mousePressed(bee);
  stormy = select('#thunder');
  stormy.mousePressed(storms);

  peeps = select('#makeSpringPeepers');
  peeps.mousePressed(springPeeps);

  reverb = new p5.Reverb();
  delay = new p5.Delay();

  reverbBtn = select('#reverbButton');
  delayBtn = select('#delayButton');

  reverbBtn.mousePressed(function() {
    rainSound.setVolume(.5, 2);
    reverb.process(rainSound, 3, 2);
    storm.setVolume(.5, 2);
    reverb.process(storm, 3, 2);
    water.setVolume(.5, 2);
    reverb.process(water, 3, 2);
  });

  delayBtn.mousePressed(function() {
    delay.process(rainSound, .12, .7, 2300);
    delay.process(storm, .12, .7, 2300);
    delay.process(water, .12, .7, 2300);
  });

  //Creates a new HTML5 <video> element that contains the audio/video feed from a webcam.
  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  }, function() {
    console.log('capture ready.')
  });
  capture.elt.setAttribute('playsinline', '');
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();

  colorMode(HSB);
  //clm is a different library
  tracker = new clm.tracker();
  //init = initialize
  tracker.init();
  // this starts the capture
  tracker.start(capture.elt);

  colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);

  osc = new p5.Oscillator('square');


}

function draw() {

  pNoise = noise(frameCount / 20) * 100;

  osc.freq(map(mouseX, 0, width, 60, 1600) + pNoise);



  //osc.amp(map(mouseY, 0, height, .2, 0));
  osc.amp(map(sin(frameCount / 20), -1, 1, .05, .2));

  image(capture, 0, 0, w, h);
  var positions = tracker.getCurrentPosition();


  noFill();
  stroke(255);
  //creates line shape around the face
  beginShape();
  for (var i = 0; i < positions.length; i++) {
    vertex(positions[i][0], positions[i][1]);
  }
  //ends line shape around the face
  endShape();

  noStroke();
  // for loop puts together the line shape, points and numbers on face detection
  for (var i = 0; i < positions.length; i++) {
    //changes the color over time, "50, 100") rgb, "0-300" controls the hue
    fill(map(i, 0, positions.length, 0, 360), 50, 100);
    //creates points in line on face shape
    ellipse(positions[i][0], positions[i][1], 4, 4);
    // creates the numbers around the shape of face
    text(i, positions[i][0], positions[i][1]);
  }

  // estimate smiling amount through distance of corners of mouth
  //this code says if there is a face there, do something.
  if (positions.length > 0) {
    // [44] and [50] ;ocated on conrner of mouth. Created vector to detect mouth movement.
    var mouthLeft = createVector(positions[44][0], positions[44][1]);
    var mouthRight = createVector(positions[50][0], positions[50][1]);
    var smile = mouthLeft.dist(mouthRight);

    // line shows a bar showing smiling amount
    rect(20, 20, smile * 3, 20);
    // ^^^drawn here so as not to take up computer memory in the global scope.
    // uncomment for a surprise
    // noStroke();
    // fill(0, 255, 255);
    // ellipse(positions[62][0], positions[62][1], 50, 50);
  }
  for (var i = 0; i < positions.length; i++) {
    if (positions[i][0] > 100 && positions[i][0] < w - 100 && positions[i][1] > 100 && positions[i][1] < h - 100) {
      faceCentered = true;
    } else {
      faceCentered = false;
      // breaks out of for loop and faceCentered stays false
      break;
    }
  }

  if (!faceCentered) {
    textSize(30);
    fill(0, 0, 0, 10);
    // rectMode(CENTER);
    rect(0, h / 2 - 70, w, 100)
    fill(255);
    text("Bring Your Face Closer", 100, h / 2);
  }
}

function setWaveForm() {
  osc.setType(waveFormSelect.value());
}

function rain() {
  rainSound.setVolume(0.1);
  rainSound.play();
}

function bee() {
  makeBee.setVolume(0.1);
  makeBee.play();
}

function springPeeps() {
  springPeepers.setVolume(0.1);
  springPeepers.play();
}

function storms() {
  storm.setVolume(0.5);
  storm.play();
}

function waters() {
  water.setVolume(0.2);
  water.play();
}



function mousePressed() {
  osc.start();
}

function mouseReleased() {
  osc.stop()
}
