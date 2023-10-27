import { useState } from "react";

const Weathercard = ( { city, temp, tempMin, tempMax, feels } ) => {

    const icon = city?.weather?.[0].icon.charAt(0);
    const icon2 = city?.weather?.[0].icon.charAt(1);
    const iconDef = `${icon}${icon2}.gif`;
    const [isCelsius, setIsCelsius] = useState(true);

    const handleChangeTemp = () =>{
        setIsCelsius(!isCelsius);
    }
    
    console.log(city);

   return (
        <>
            <article>
                <div className="card__info">
                    <h2 className="card__name"> Current weather in <span> { city?.name }, {city?.sys?.country} </span>  </h2>
                    <img className="card__gif" src={iconDef} alt="Img Sun" />
                    <h2 className="card__name conditions"> { city?.weather?.[0].description.replace(/\w/, firstLetter => firstLetter.toUpperCase()) } </h2>
                    <button className="card__btn" onClick={handleChangeTemp}> <span className="textbtn">Change</span> <span className="textbtn2">{ isCelsius ? '°F' : '°C' } </span>   </button>
                    <h2 className="card__temp"> 
                        <span className="card__grados-desc"> Current temp: </span> 
                        <span className="card__grados"> {isCelsius ? `${ temp?.celsius }°C` : `${ temp?.farenheit  }°F`} </span>
                    </h2>
                </div>
                <div className="card__maxmin"> 
                    <h2 className="card__min"> <span className="span__maxmin"> Min: </span> {isCelsius ? `${ tempMin?.celsius2 }°C` : `${ tempMin?.farenheit2  }°F`} </h2>
                    <h2 className="card__max"> <span className="span__maxmin"> Max: </span> {isCelsius ? `${ tempMax?.celsius3 }°C` : `${ tempMax?.farenheit3  }°F`} </h2>
                    <h2 className="card__hum"> <span className="span__maxmin"> Hum: </span> { city?.main?.humidity } %</h2>
                </div>
                <h2 className="card__sens"> 
                    <span className="span__term"> Feels Like: </span> 
                    <span className="span__term-num"> {isCelsius ? `${ feels?.celsius4 }°C` : `${ feels?.farenheit4  }°F`}  </span>
                </h2>
            </article>

        </>
        
  )
}

export default Weathercard
