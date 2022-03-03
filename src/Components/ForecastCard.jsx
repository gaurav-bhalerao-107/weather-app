import React from 'react'
import { useSelector } from "react-redux";

function ForecastCard() {
  const forecastWeatherData = useSelector((state) => state.weatherReducer.forecastWeatherData);
  let data = forecastWeatherData ? forecastWeatherData.daily : [];

  const unixTimestampConvert = (ut) => {
    var date_obj = new Date(ut * 1000);
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var year = date_obj.getFullYear();
    var month = monthArr[date_obj.getMonth()];
    var date = date_obj.getDate();
    var hour = date_obj.getHours();
    var min = date_obj.getMinutes();
    var sec = date_obj.getSeconds();
    var day = dayArr[date_obj.getDay()];
    // console.log(year + ' | ' + month + ' | ' + date + ' | '+ day + ' | ' + hour + ' | ' + min + ' | ' + sec);
    return {
      year,
      month,
      date,
      hour,
      min,
      sec,
      day
    }
  }

  return (
    <>
    {
      data.slice(1,7).map((item, key) => {
        return(
          <div className="mb-5" key={key}>
            <div className="card w-auto lg:w-4/5 mx-auto bg-base-200">
              <div className="card-body items-center text-center">
                <div className="text-xl">{key === 0 ? 'Tomorrow' : `${unixTimestampConvert(item.dt).date} | ${unixTimestampConvert(item.dt).month}`}</div>
                <img src={`http://openweathermap.org/img/wn/${item.weather ? item.weather[0].icon : '01d'}@2x.png`} height="auto" width="30%" className="mx-auto" alt="weatherIcon" />
                <h2 className="card-title">{item.weather ? item.weather[0].description : 'Clear Sky'}</h2>
                <div className="flex items-center justify-center">
                  <svg className="mt-1 swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                  &nbsp;&nbsp;
                  <span className='text-xl font-light'>{item.temp.day || '30.52' }° Cel</span>
                </div>
                <div className="flex items-center justify-center" style={{marginLeft: '-3px'}}>
                  <svg className="mt-1 swap-off fill-current w-7 h-7 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                  &nbsp;&nbsp;
                  <span className='text-xl font-light'>{item.temp.night || '23.91'}° Cel</span>
                </div>
              </div>
            </div>
          </div>
        )
      })
    }
    </>
  )
}

export default ForecastCard