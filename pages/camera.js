import React, { useState, useRef } from "react";
import Image from 'next/image';

import styles from '@/styles/Camera.module.css';
import { useEffect } from 'react';
import * as faceapi from 'face-api.js';
import Form from "@/components/Forms";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUrl } from "@/formRed";

const CameraPage = () => {
    const canvasRef = useRef();
    const videoRef = useRef(null);
    const {url } = useSelector(state => state.form);
    const dispatch = useDispatch();

    useEffect(()=>{
        webcam();
        videoRef && loadingModels();
    }, [])
   


    const webcam = async ()=>{
        navigator.mediaDevices.getUserMedia({video: true})
        .then((currentStream)=>{

            videoRef.current.srcObject = currentStream;

        })
        .catch(err=>console.log(err))
      }

    
    
    //   loading models

    const loadingModels =()=>{
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
          faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        ]).then(()=>{
            detectExpressions()
        })

    }

   
    const detectExpressions = ()=>{
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current);
            faceapi.matchDimensions(canvasRef.current, {
                width: "900",
                height: "600"
              });

              const scaled = faceapi.resizeResults(detections, {width: "900", height: "600"});
              faceapi.draw.drawFaceExpressions(canvasRef.current, scaled);
              faceapi.draw.drawDetections(canvasRef.current, scaled);
        }, 1000);
    }
       

    return ( 

        <div className={styles.parentContainer}>
        <Form/>
        <div className={styles.container}>


            <video ref={videoRef} crossOrigin="anonymous" width="700" height="600" autoPlay />
      
            <canvas ref={canvasRef} width="700" height="600" className={styles.canvas}></canvas>
      </div>
        
        
        
        </div>
     );
}
 
export default CameraPage;