import React, { useState, useRef } from "react";
import Image from 'next/image';
import {Camera} from "react-camera-pro";
import styles from '@/styles/Camera.module.css';
import { useEffect } from 'react';
import * as faceapi from 'face-api.js';

const CameraPage = () => {
    const canvasRef = useRef();
    const imageRef = useRef();
    const camera = useRef(null);
    const [image, setImage] = useState(null);


    const webcam = async ()=>{
        const detect = await faceapi.detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        console.log(detect)
        faceapi.matchDimensions(canvasRef.current, {
          width: "900",
          height: "600"
        });
        canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imageRef.current);
        faceapi.draw.drawDetections(canvasRef.current, detect);
      }

      useEffect(()=>{
        const loadingModels =()=>{
          Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),
          ])
          .then(()=>{
            console.log(webcam())
          })
          .catch(err=>console.log(err))
        }
    
        imageRef.current && loadingModels();
      },[])

    return ( 
        <div style={{width: "400px"}}>


            <Camera ref={imageRef}/>
            <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
            <img src={image} alt='Taken photo'/>

      
            <canvas ref={canvasRef} width="700" height="600" className={styles.canvas}></canvas>
      </div>
     );
}
 
export default CameraPage;