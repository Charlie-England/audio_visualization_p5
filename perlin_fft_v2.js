let angle = 0;
let scl = 12;
let w = 600;
let h = 600;
let cols = w / scl;
let rows = 1;
let rows_max = h / (scl);
let flying = 0;
let song;
let sliderVolume;
let sliderRate;
let button, jumpButton;
let fft;


let terrain = new Array(rows);

for (var i = 0; i < terrain.length; i++) {
    terrain[i] = new Array(cols).fill(0);
}

function setup() {
    createCanvas(w,h, WEBGL);
    colorMode(HSB);
    song = loadSound('audio\\thisdot.mp3', loaded);
    // song = loadSound('chad_crouch_algo.mp3', loaded);
    // song = loadSound('Komiku_broadswords.mp3', loaded);
    // song = loadSound("audio\\Bisou_-_09_-_Panda.mp3", loaded);
    // song = loadSound("audio\\drunkensailor.mp3", loaded);
    sliderRate = createSlider(.5, 1.5, 1, .01);
    sliderVolume = createSlider(0, 1, .5, .01);
    fft = new p5.FFT();

    frameRate(30);


}

function loaded() {
    button = createButton("Play");
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

function add_row(){
    if (rows > rows_max) {
        terrain.pop()
    }
    terrain.unshift(new Array(cols).fill(0))
    rows = terrain.length
}



function draw() {
    //Song coding
    song.setVolume(sliderVolume.value());
    song.rate(sliderRate.value());
    let spectrum = fft.analyze();

    //end song coding

    //loop through rows and cols in terrain double array to set height
    //map the height from spectrum (fft analysis) to be from 0, height/4 which will set height of the wave
    //this height is then mapped again based on the position (inverse) larger y coord (closer to screen) get reduced to 0 while those
    //farther away get increased.


    if (song.isPlaying()){
        add_row();
        // for (let y = 0; y < 1; y++) {
        //     for (let x = 0; x < cols; x++) {
        //         specHeight = map(spectrum[x], 0, 255, 0, height/4)
        //         terrain[y][x] = specHeight*map(y, 0, rows, 1.5, .05);
        //     }
        // }
        //loops through the terrain again and this time it will draw the vertexes
        //stroke color is mapped and modified to be from 0 to 360
        //the vertex is then offset (due to OpenGL pushing reference from center) and the z-height is set based on the terrain array

        background(0);
        rotateX(PI/3);
        for (let y = 0; y < rows-1; y++) {
            beginShape(TRIANGLE_STRIP)
            for (let x = 0; x < cols; x++) {
                if (y==0) {
                    specHeight = map(spectrum[x], 0, 255, 0, height/4)
                    terrain[y][x] = specHeight*map(y, 0, rows, 1.5, .05);
                } 
                strColor = map(terrain[y][x], 0, height/4, 0, 360)
                stroke(strColor, 100, 50)
                noFill()
                vertex(x*scl-(width/2), y*scl-(height/4), terrain[y][x]);
                vertex(x*scl-(width/2), (y+1)*scl-(height/4), terrain[y+1][x]);
            }
            endShape()
        }
        console.log(rows);
    }

}