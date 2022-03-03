import './App.css';
import Homepage from './Pages/Homepage';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { searchNewCity, setCurrentWeatherData, setForecastWeatherData, setResponseStatus } from './Redux/actions/index';

function App() {
  const dispatch = useDispatch();
  
  const cityName = useSelector((state) => state.weatherReducer.cityName);
  const currentWeatherData = useSelector((state) => state.weatherReducer.currentWeatherData);

  useEffect(() => {
    const fetchCurrentWeatherData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName ? cityName : 'Pune'}&appid=${process.env.REACT_APP_PRIMARY_API_KEY}&units=metric`;
      try {
        const response = await axios.get(url)
        dispatch(setCurrentWeatherData(response.data));
        dispatch(setResponseStatus('OK'));
      } catch (error) {
        console.log("Error While Fetching Current Weather Data : ", error)
        dispatch(setResponseStatus('ERROR'));
      }
    }
    fetchCurrentWeatherData();
  },[cityName, dispatch])

  let coords = {
    lat: '18.5196',
    lon: '73.8553'
  }

  if(currentWeatherData !== undefined && Object.keys(currentWeatherData).length > 0){
    coords = {
      lat: currentWeatherData.coord.lat,
      lon: currentWeatherData.coord.lon
    }
  }
  
  useEffect(() => {
    const fetchForecaseWeatherData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=hourly,minutely&appid=35aaa5265dc2ee6e658ac365b86daaf0&units=metric`;
      try {
        const response = await axios.get(url)
        dispatch(setForecastWeatherData(response.data));
      } catch (error) {
        console.log("Error While Fetching Forecast Weather Data : ", error) 
      }
    }
    fetchForecaseWeatherData();
  },[coords.lat, coords.lon, cityName, dispatch])

  useEffect(() => {
    const getCurrentCity = async() => {
      let lat = '';
      let lon = '';
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          lat = position.coords.latitude;
          lon = position.coords.longitude;
        }, error => {
          console.log('Need access to get location.');
        });
      }

      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      try {
        const response = await axios.get(url)
        if(response.data !== undefined && Object.keys(response.data).length > 0){
          dispatch(searchNewCity(response.data.locality));
        }
      } catch (error) {
        console.log("Error While Fetching Forecast Weather Data : ", error) 
      }
    }
    getCurrentCity();
  },[dispatch])

  return (
    <div className="App">
      <Homepage />
    </div>
  );
}

export default App;
