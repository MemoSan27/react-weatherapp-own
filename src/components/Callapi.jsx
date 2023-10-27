import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Weathercard from './Weathercard';

const CallApi = () => {

    const [coords, setCoords] = useState();
    const [ city, setCity ] = useState();
    const [ inputValue, setInputValue] = useState();
    const [ hasError, setHasError ] = useState(false);
    const [isLoading, setsIsLoading] = useState(true);
    const id = 'f1be5c352ab1ed63c855e6f5c16d3a5c';

    const success = (position) => {
        const obj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      }
      setCoords(obj);
    }
    
    useEffect( () => {
      setsIsLoading(true)
      navigator.geolocation.getCurrentPosition(success)
    }, []);
  
    
    useEffect( () => {
      if(coords && !city){
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ coords.lat }&lon=${ coords.lon }&appid=${ id }`
        axios.get(url)
          .then( res => {
            /* const celsius = (res.data.main.temp - 273.15).toFixed(1)
            const farenheit = (celsius * 9/5 + 32).toFixed(1)
            setTemp({ celsius, farenheit }) */
            setCity(res.data)
          })
          .catch( (err) => {
            console.log(err);
          })
          .finally( () => {
            setsIsLoading(false);
          })
      }
    }, [coords])

    useEffect( () => {
        if(city){
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
        }
    }, [inputValue]);

    const inputCity = useRef();

    const handleSubmit = (e) =>{
        e.preventDefault();
        setInputValue(inputCity.current.value.toLowerCase().trim())
        inputCity.current.value = '';
    }

  return (
    <main>
        <div className='card'>
            <form className='form' onSubmit={handleSubmit}>
                <input ref={inputCity} className='card__input' type='text' placeholder='Name of your city...' />
                <i onClick={handleSubmit} className='btnSearch bx bx-search-alt-2'></i>
            </form>
            
            {
                isLoading
                ? <h2 className='loading'> Loading....</h2>
                : (
                    hasError
                    ? (<h2 className='error'> ⚠️ La ciudad de <span className='error__city'> {inputValue} </span>  no existe en nuestra base de datos</h2>)
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
