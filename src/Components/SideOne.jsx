import { React, useState } from "react";
import { useSelector ,useDispatch } from "react-redux";
import { searchNewCity, setResponseStatus } from "./../Redux/actions/index";
import ErrorBox from "./ErrorBox";

function SideOne() {
  const [cityName, setCityName] = useState('');
  const dispatch = useDispatch();

  const currentCityName = useSelector((state) => state.weatherReducer.cityName);
  const currentWeatherData = useSelector((state) => state.weatherReducer.currentWeatherData);
  const responseStatus = useSelector((state) => state.weatherReducer.responseStatus);

  let data = {
    name: 'Pune',
    icon: '01d',
    temp: '69',
    description: 'Clear Sky',
    date: '28 | February',
    sunrise: '06 : 56 : 04 am',
    sunset: '06 : 56 : 04 pm',
  }

  if(currentWeatherData !== undefined && Object.keys(currentWeatherData).length > 0){
    data = {
      name: currentWeatherData.name,
      icon: currentWeatherData.weather[0].icon,
      temp: currentWeatherData.main.temp,
      description: currentWeatherData.weather[0].description,
      date: currentWeatherData.dt,
      sunrise: currentWeatherData.sys.sunrise,
      sunset: currentWeatherData.sys.sunset,
    }
  }

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

  const sunrise_sunset_time_modifier = (unixTime) => {
    var converted_time = unixTimestampConvert(unixTime);
    var ampm = '';
    if (converted_time.hour > 12) {
        ampm = 'pm';
    }
    else {
        ampm = 'am';
    }

    converted_time.hour = converted_time.hour % 12;
    if(converted_time.hour < 10) {
        converted_time.hour = '0'+converted_time.hour;
    }
    if(converted_time.min < 10) {
        converted_time.min = '0'+converted_time.min;
    }
    if(converted_time.sec < 10) {
        converted_time.sec = '0'+converted_time.sec;
    }
    var modified_time = converted_time.hour + ' : ' + converted_time.min + ' : ' + converted_time.sec + ' ' + ampm;
    return modified_time
}

  return (
    <section className="bg-base-200 h-full md:h-screen w-screen md:w-2/5 xl:w-3/12">
      {/* alert box */}
      {
        responseStatus === 'ERROR' ?
        <ErrorBox />
        :
        ''
      }   
      
      {/* city name card */}
      <div className="card bg-base-content text-neutral-content w-11/12 mx-auto mt-5 mb-5">
        <div className="card-body items-center text-center">
          <div className="font-sans text-5xl"> {data.name} </div>
        </div>
      </div>

      {/* search bar */}
      <div className="relative text-center">
        <input
          type="search"
          placeholder="Search any city..."
          className="input w-11/12 h-12 focus:shadow-xl"
          onChange={(event) => setCityName(event.target.value)}
          value={cityName}
        />
        <button
          className="btn btn-sm btn-square absolute"
          style={{ top: "8px", right: "23px" }}
          onClick={() => {
            dispatch(searchNewCity(cityName === '' ? currentCityName : cityName));
            if(cityName === ''){
              dispatch(setResponseStatus('ERROR'))
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* weather card */}
      <div className="text-center mb-5">
        <img
          src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt="weatherIcon"
          height="auto"
          width="55%"
          className="mx-auto"
        />
        <div className="font-sans text-6xl font-bold mb-5"> { data.temp }° Cel </div>
        <div className="font-sans text-lg font-light">
          {unixTimestampConvert(data.date).day} | {unixTimestampConvert(data.date).date} {unixTimestampConvert(data.date).month}
        </div>
      </div>

      {/* weather description and sunrise and sunset */}
      <div className="mb-5" style={{ marginTop: "40px", marginLeft: "20px" }}>
        <table>
          <tbody>
            <tr>
              <td className="px-2 py-2">
                <img
                  src={`http://openweathermap.org/img/wn/${ data.icon }@2x.png`}
                  alt="weatherIcon"
                  height="40px"
                  width="40px"
                />
              </td>
              <td className="px-2 py-2">
                <span className="text-lg"> { data.description } </span>
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2">
                <svg
                  className="swap-on fill-current w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
              </td>
              <td className="px-2 py-2">
                <span className="text-lg"> {sunrise_sunset_time_modifier(data.sunrise)} </span>
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2">
                <svg
                  className="swap-off fill-current w-8 h-8 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </td>
              <td className="px-2 py-2">
                <span className="text-lg"> { sunrise_sunset_time_modifier(data.sunset)} </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default SideOne;
