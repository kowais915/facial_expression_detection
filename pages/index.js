
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useRef } from 'react';
import { useEffect } from 'react';
import * as faceapi from 'face-api.js';
import Form from '@/components/Forms';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUrl } from "@/formRed";
import {useState } from 'react';
import Link  from 'next/link';



export default function Home() {
  const canvasRef = useRef();
  const imageRef = useRef();
  const {url } = useSelector(state => state.form);
  const dispatch = useDispatch();
  const [formUrl, setFormUrl ] = useState('');

  console.log(url)

  const webcam = async ()=>{
    const detect = await faceapi.detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    console.log(detect)
    faceapi.matchDimensions(canvasRef.current, {
      width: "900",
      height: "600"
    });

    const scaled = faceapi.resizeResults(detect, {width: "900", height: "600"});
    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imageRef.current);
    faceapi.draw.drawFaceExpressions(canvasRef.current, scaled);
    faceapi.draw.drawDetections(canvasRef.current, scaled);
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
  },[url])



  return (

    <div className={styles.parentContainer}>

      
            <Link href="/camera">Real-Time Expression Detection</Link>
        

      <Form />
    <div className={styles.container}>

      


      <Image
        // src="/image4.webp"
        src={url}
        alt="Picture of the author"
        width={900}
        height={600}
        ref={imageRef}
        priority

      ></Image>

   
    
    
      
      <canvas ref={canvasRef} width="900" height="600" className={styles.canvas}></canvas>
    </div>

    </div>
  )
}
