let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let scored_sound = new Audio();
let fly_audio = new Audio();

let pipeBottom = new Image();
let pipeUp = new Image();
let road = new Image();
let back = new Image();
let bird = new Image();

let pipes = [];
pipes[0] = {
    x: canvas.width,
    y: Math.random() * -118,
    gap: 50,
    spawnDistance: 20,
}

let gap = 40;
let Ypos = 150; 
let Yvel = 0; 
let gravity = 0.2;


scored_sound = "./audio/score.mp3";
fly_audio.src = "./audio/fly.mp3";

pipeBottom.src = "img/pipeBottom.png";
pipeUp.src = "img/pipeUp.png";
road.src = "img/road.png";
back.src = "img/back.png";
bird.src = "img/bird.png";


canvas.width = 256;
canvas.height = 512;


canvas.addEventListener("mousedown", moveUp);


function moveUp() {
    Yvel = -4;
    fly_audio.volume = 0.1  
    fly_audio.play();
}

function draw() {
    ctx.drawImage(back, 0, 0);
    ctx.drawImage(road, 0, canvas.height - 118)
    ctx.drawImage(bird, 20, Ypos);


    Yvel += gravity;
    Ypos += Yvel;

    for (let i = 0; i < pipes.length; i++) {
        ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeBottom.height + pipes[i].gap);

        pipes[i].x -= 2;

        if (pipes[i].x === pipes[i].spawnDistance) {
            pipes.push({
                x: canvas.width,
                y: Math.random() * -118,
                gap: pipes[i].gap - 2,
                spawnDistance: pipes[i].spawnDistance + 2,
            });
        }
    }

    if (Ypos >= canvas.height - road.height - bird.height) {
        reload()
    }

    

}

function reload() {
    Xpos = 10;
    Yvel = 0;
    Ypos = 150;

}


setInterval(draw, 20);