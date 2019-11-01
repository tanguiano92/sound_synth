let rainSound;
let makeRain;
let button;

var wave;

let playing;

function preload(){
  soundFormats('mp3', 'ogg');
  rainSound = loadSound('audio/rain.mp3');
}

function setup() {
  noCanvas();

  makeRain = select('#makeRainSound');
  makeRain.mousePressed(rain);

  wave = new p5.Oscillator();
  wave.setType('sine');
  wave.start();
  wave.amp(0);
    wave.freq(1000);

  button = createButton('play.pause')
  button.mousePressed(toggle);
}

function draw() {

}

function rain(){
  rainSound.setVolume(0.1);
  rainSound.play();
}

function toggle(){
if (!playing) {
      wave.amp(0.5, 1);
  playing = true;
} else {
  wave.stop();
  wave.amp(0, 1);
  playing = false;
}
}
