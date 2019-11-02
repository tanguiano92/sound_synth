'use strict';

let rainSound;

let makeRain;

let button;

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

function preload(){
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

  //makeRain = select('#makeRainSound');
//spill = select('#makeWaterSpill');
//spill.mousePressed(waters);
  //bees = select('#makeBees');
//  bees.mousePressed(bee);
//  stormy = select('#thunder');
  //stormy.mousePressed(storms);

//  peeps = select('#makeSpringPeepers');
//  peeps.mousePressed(springPeeps);

  reverb = new p5.Reverb();
 delay = new p5.Delay();

  reverbBtn = select('#reverbButton');
  delayBtn = select('#delayButton');

reverbBtn.mousePressed(function(){
  rainSound.setVolume(.5, 2);
  reverb.process(rainSound, 3, 2);
  storm.setVolume(.5, 2);
  reverb.process(storm, 3, 2);
  water.setVolume(.5, 2);
  reverb.process(water, 3, 2);
});

delayBtn.mousePressed(function(){
  delay.process(rainSound, .12, .7, 2300);
  delay.process(storm, .12, .7, 2300);
  delay.process(water, .12, .7, 2300);
});
}

function draw() {

  pNoise = noise(frameCount/20) * 100;

  osc.freq(map(mouseX, 0, width, 60, 1600) + pNoise);
  osc.amp(map(mouseY, 0, height, .2, 0));


}

function setWaveForm(){
  osc.setType(waveFormSelect.value());
}

function rain(){
  rainSound.setVolume(0.1);
  rainSound.play();
}
function bee(){
  makeBee.setVolume(0.1);
  makeBee.play();
}
function springPeeps(){
  springPeepers.setVolume(0.1);
  springPeepers.play();
}
function storms(){
  storm.setVolume(0.5);
  storm.play();
}
function waters(){
  water.setVolume(0.2);
  water.play();
}



function mousePressed(){
  osc.start();
}

function mouseReleased(){
  osc.stop()
}
