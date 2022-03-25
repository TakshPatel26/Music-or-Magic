Peter_pan_song="";
Harry_potter_theme_song="";
song_1_status="";
song_2_status="";
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
scoreleftWrist=0;
scoreRightWrist=0;
function preload(){
    Peter_pan_song = loadSound("music.mp3");
    Harry_potter_theme_song = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600,530);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("poseNet is Loaded");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scorerightWrist=results[0].pose.keypoints[10].score;
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist= " + scoreleftWrist + "scorerightWrist= " + scorerightWrist);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX= "+rightWristX+"rightWristY= "+rightWristY);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX= "+leftWristX+"leftWristY= "+leftWristY);
    }
}
function draw(){
    image(video,0,0,600,530);
    fill('red');
    stroke('green');
    song_1_status=Peter_pan_song.isPlaying();
    song_2_status=Harry_potter_theme_song.isPlaying();

    if(scoreleftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        Peter_pan_song.stop();
        if(song_2_status==false){
            Harry_potter_theme_song.play();
            document.getElementById("song_name").innerHTML="Song Name is Harry Potter Song";
        }
    }
}