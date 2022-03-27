sound="";
sound2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftWristScore=0;
rightWristScore=0;
songStatus="";
songStatus2="";

function preload(){
    sound= loadSound("Harry Potter Theme Song.mp3");
    sound2= loadSound("Peter Pan.mp3");
    }

    function setup(){
        canvas= createCanvas(600,500);
        canvas.center();
    
        video= createCapture(VIDEO);
        video.hide();

        posenet= ml5.poseNet(video,modelLoaded);

        posenet.on('pose',gotPoses);
        }

        function draw(){
            image(video,0,0,600,500);
            fill("#FF0000");
            stroke("#FF0000");
            songStatus=sound.isPlaying();
            console.log(songStatus);

            songStatus2=sound2.isPlaying();
            console.log(songStatus2);
        }

        function gotPoses(results){
            if(results.length>0){

                leftWristX=results[0].pose.leftWrist.x;
                leftWristY=results[0].pose.leftWrist.y;
                console.log("LeftWrist x ="+leftWristX + " LeftWrist y ="+leftWristY);
            
                rightWristX=results[0].pose.rightWrist.x;
                rightWristY=results[0].pose.rightWrist.y;
                console.log("rightWrist x ="+rightWristX + " rightWrist y ="+rightWristY);

                console.log(results);
                leftWristScore=results[0].pose.keypoints[9].score;
                console.log("Left Wrist Score = "+leftWristScore);

                console.log(results);
                rightWristScore=results[0].pose.keypoints[9].score;
                console.log("Right Wrist Score = "+rightWristScore);
            }

            if(leftWristScore>0.2){
                circle(leftWristX, leftWristY, 20);
                sound2.stop();
            }

            if(rightWristScore>0.2){
                circle(rightWristX, rightWristY, 20);
                sound.stop();
            }

            if(songStatus==false){
            if(leftWristY>0 && leftWristY<500){
            sound.play();
            }
            else if(rightWristY>0 && rightWristY<500){
                sound2.play();
            }
            }

        }

        function modelLoaded(){
            console.log("PoseNet is initialised");
        }

