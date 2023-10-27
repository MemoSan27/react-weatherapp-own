import { useEffect, useState } from 'react'

const Datetime = () => {
    const [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <div className='time card__name'>
            <p> <span className='time2'> Current Date : </span>  {date.toLocaleDateString()}</p>
            <p> <span className='time2'> Current Time : </span> {date.toLocaleTimeString()}</p>
        </div>
    )
}

export default Datetime
