import styles from '../styles/Home.module.css'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addUrl } from '../formRed';



const Form = () => {
    const {url } = useSelector(state => state.form);
    const dispatch = useDispatch();
    const [formUrl, setFormUrl ] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        setFormUrl(e.target.value);
        console.log(formUrl)
        dispatch(addUrl(formUrl));
        
    }

    return ( 
        <form onSubmit={handleSubmit}>

            <label>
                <span className="label">Enter Image URL</span>
                
                <input type="text" onChange={(e)=>setFormUrl(e.target.value)} />
            </label>

            <button type="submit">Submit</button>
        </form>
     );
}
 
export default Form;