import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Weathercard from './Weathercard';
import Loading from './Loading';

const CallApi = () => {

    const [coords, setCoords] = useState();
    const [ city, setCity ] = useState();
    const [ inputValue, setInputValue] = useState();
    const [ hasError, setHasError ] = useState(false);
    const [isLoading, setsIsLoading] = useState(true);
    const [ temp, setTemp ] = useState();
    const [ tempMin, setTempMin ] = useState();
    const [ tempMax, setTempMax ] = useState();
    const [ feels, setFeels ] = useState();
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

    const celFar = (res) => {
        const celsius = (res.data.main.temp - 273.15).toFixed(1);
        const farenheit = (celsius * 9/5 + 32).toFixed(1);
        setTemp({ celsius, farenheit });
        const celsius2 = (res.data.main.temp_min - 273.15).toFixed(1);
        const farenheit2 = (celsius2 * 9/5 + 32).toFixed(1);
        setTempMin({ celsius2, farenheit2 });
        const celsius3 = (res.data.main.temp_max - 273.15).toFixed(1);
        const farenheit3 = (celsius3 * 9/5 + 32).toFixed(1);
        setTempMax({ celsius3, farenheit3 });
        const celsius4 = (res.data.main.feels_like - 273.15).toFixed(1);
        const farenheit4 = (celsius4 * 9/5 + 32).toFixed(1);
        setFeels({ celsius4, farenheit4 });
    }
  
    
    useEffect( () => {
      if(coords && !city){
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ coords.lat }&lon=${ coords.lon }&appid=${ id }`
        axios.get(url)
          .then( res => {
            celFar(res);
            setCity(res.data)
            setHasError(false)
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
                    celFar(res);
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
    <main className='bg'>
        <div className='card'>
            <form className='form' onSubmit={handleSubmit}>
                <input ref={inputCity} className='card__input' type='text' placeholder='Name of your city...' />
                <i onClick={handleSubmit} className='btnSearch bx bx-search-alt-2'></i>
            </form>
            
            {
                isLoading
                ? (<Loading />)
                : (
                    hasError
                    ? (<h2 className='error'> ⚠️ City with name <span className='error__city'> {inputValue} </span> that you're trying to find doesn't exist in our database.</h2>)
                    :(
                        <Weathercard 
                            city={city}
                            temp={temp}
                            tempMin={tempMin}
                            tempMax={tempMax}
                            feels={feels}
                        />
                    )
                )
            }
        </div>
    </main>
  )
}

export default CallApi
