let song;
let sliderVolume;
let sliderRate;
let button, jumpButton;
let amp;
let volHistory = [];

function setup() {
  createCanvas(400,400);
  angleMode(DEGREES);
  song = loadSound('Komiku_broadswords.mp3', loaded)
  sliderRate = createSlider(.5, 1.5, 1, .01);
  sliderVolume = createSlider(0, 1, .5, .01);
  amp = new p5.Amplitude();
}

function loaded() {
  button = createButton("Play");
  song.play()
  button.mousePressed(togglePlaying);
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
  let vol = amp.getLevel();
  volHistory.push(vol);
  noFill();
  stroke(255);

  translate(width/2, height/2);
  beginShape();
  for (var i = 0; i < volHistory.length; i++) {
    let r = map(volHistory[i], 0, 1, width/8, width);
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  if (volHistory.length > 360) {
    volHistory.splice(0,1);
  }

}