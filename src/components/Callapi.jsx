import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Weathercard from './Weathercard';

const CallApi = () => {

    const [ city, setCity ] = useState();
    const [ inputValue, setInputValue] = useState('mazatlan');
    const [ hasError, setHasError ] = useState(false);
    const [isLoading, setsIsLoading] = useState(true);
    const id = 'f1be5c352ab1ed63c855e6f5c16d3a5c';

    useEffect( () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ inputValue }&appid=${ id }`;
        setsIsLoading(true)
        axios.get(url)
            .then( res => {
                setCity(res.data)
                setHasError(false)
            })
            .catch( err => {
                console.log(err)
                setHasError(true)
            })
            .finally( () => {
                setsIsLoading(false)
            })
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
            {
                isLoading
                ? <h2 className='loading'> Loading....</h2>
                : (
                    hasError
                    ? (<h2 className='error'> La ciudad de <span className='error__city'> {inputValue} </span>  no existe en nuestra base de datos</h2>)
                    :(
                        <Weathercard 
                            city={city}
                        />
                    )
                )
            }
        </div>
    </main>
  )
}

export default CallApi
