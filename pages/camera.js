import React, { useState, useRef } from "react";
import Image from 'next/image';
import {Camera} from "react-camera-pro";
import styles from '@/styles/Camera.module.css';

const CameraPage = () => {

    const camera = useRef(null);
    const [image, setImage] = useState(null);

    return ( 
        <div style={{width: "400px"}}>
            <Camera ref={camera}/>
            <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
            <img src={image} alt='Taken photo'/>
      </div>
     );
}
 
export default CameraPage;