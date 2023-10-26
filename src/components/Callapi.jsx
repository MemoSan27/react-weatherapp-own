import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Weathercard from './Weathercard';

const CallApi = () => {

    const [ city, setCity ] = useState();
    const [ inputValue, setInputValue] = useState('pamplona');
    const id = 'f1be5c352ab1ed63c855e6f5c16d3a5c';

    useEffect( () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ inputValue }&appid=${ id }`;
        axios.get(url)
            .then( res => setCity(res.data))
            .catch( err => console.log(err))
    }, [inputValue]);

    const inputCity = useRef();

    const handleSubmit = (e) =>{
        e.preventDefault();
        setInputValue(inputCity.current.value.toLowerCase().trim())
    }

  return (
    <main>
        <div className='card'>
            <form onSubmit={handleSubmit}>
                <input ref={inputCity} className='card__input' type='text' placeholder='Name of your city...' />
            </form>
            <Weathercard 
                city={city}
            />
        </div>
    </main>
  )
}

export default CallApi
