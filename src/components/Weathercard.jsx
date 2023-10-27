
const Weathercard = ( { city } ) => {

    const icon = city?.weather?.[0].icon.charAt(0);
    const icon2 = city?.weather?.[0].icon.charAt(1);
    const iconDef = `${icon}${icon2}.gif`;
    
    console.log(city);

   return (
        <>
            <article>
                <div className="card__info">
                    <h2 className="card__name"> Clima actual en <span> { city?.name }, {city?.sys?.country} </span>  </h2>
                    <img className="card__gif" src={iconDef} alt="Img Sun" />
                    <h2 className="card__temp"> 
                        <span className="card__grados-desc"> Temperatura actual: </span> 
                        <span className="card__grados"> { Math.round(city?.main?.temp - 273.15) }°C </span>
                    </h2>
                </div>
                <div className="card__maxmin"> 
                    <h2 className="card__min"> <span className="span__maxmin"> Min: </span> { Math.round(city?.main?.temp_min - 273.15) } °C </h2>
                    <h2 className="card__max"> <span className="span__maxmin"> Max: </span> { Math.round(city?.main?.temp_max - 273.15) } °C </h2>
                    <h2 className="card__hum"> <span className="span__maxmin"> Hum: </span> { city?.main?.humidity } %</h2>
                </div>
                <h2 className="card__sens"> 
                    <span className="span__term"> Sensacion termica: </span> 
                    <span className="span__term-num"> { Math.round(city?.main?.feels_like - 273.15) }°C </span>
                </h2>
            </article>

        </>
        
  )
}

export default Weathercard
