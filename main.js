song1="";
song2="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftWrist=0;
scorerigtWrist=0;
song1_status="";
song2_status="";
function preload(){
    song1=loadSound("song.mp3");
    song2=loadSound("music.mp3");
}
function setup(){
  canvas=createCanvas(600,500);  
  canvas.center();
  video=createCapture(VIDEO);
  video.hide();
  posenet=ml5.poseNet(video,mobelLoaded);
  posenet.on("pose" ,gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    if(scoreleftWrist>0.2){
circle(leftWristx , leftwristy , 20);
song1.stop();
if(song2_status==false){
song2.play();
document.getElementById("song").innerHTML="song 2 playing";
}
    }
    if(scorerightWrist>0.2){
circle(rightWristx , rightwristy , 20);
 song2.stop();
 if(song1_status==false){
  song1.play();
  document.getElementById("song").innerHTML="song 1 playing";
  }
    }

}
function mobelLoaded(){
  console.log("posenet is working");
}
function gotPoses(results){
if(results.length>0){
leftwristx=results[0].pose.leftWrist.X;
leftwristy=results[0].pose.leftWrist.Y;
rightwristx=results[0].pose.rightWrist.X;
rightwristy=results[0].pose.rightWrist.Y;
scoreleftWrist=results[0].pose.keypoints[9].score;
scorerightWrist=results[0].pose.keypoints[10].score;
}
}