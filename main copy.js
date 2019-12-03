let song;
let sliderVolume;
let sliderRate;
let button, jumpButton;
let fft;

function setup() {
  createCanvas(256,256);
  colorMode(HSB);
  angleMode(DEGREES);
  song = loadSound('thisdot.wav', loaded)
  // song = loadSound('Komiku_broadswords.mp3', loaded)
  sliderRate = createSlider(.5, 1.5, 1, .01);
  sliderVolume = createSlider(0, 1, .5, .01);
  fft = new p5.FFT(.8, 256);
}

function loaded() {
  song.play();
  button = createButton("Pause");
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    button.html("Pause");
  } else {
    song.pause();
    button.html("Play");
  }
}

function draw() {
  background(51);
  song.setVolume(sliderVolume.value());
  song.rate(sliderRate.value());
  let spectrum = fft.analyze();
  noStroke();
  translate(width/2, height/2);
  for (var i = 0; i < spectrum.length; i++) {
    if (!spectrum[i] == 0) {
    let angle = map(i, 0, spectrum.length, 0, 360)
    let amp = spectrum[i];
    let r = map(amp, 0, 256, 20, 100);
    let rColor = map(amp, 0, 256, 0, 180);
    var x = r * cos(angle);
    var y = r * sin(angle);
    stroke(rColor, 255, 255)
    line(0,0,x,y);
    }
  }

}