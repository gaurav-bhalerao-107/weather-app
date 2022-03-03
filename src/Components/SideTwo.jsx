import React from "react";
import ForecastCard from "./ForecastCard";
import { useSelector } from "react-redux";

function SideTwo() {
  const currentWeatherData = useSelector((state) => state.weatherReducer.currentWeatherData);
  let cityName = currentWeatherData ? currentWeatherData.name : 'Pune';

  return (
    <section className="bg-base-content h-screen w-screen md:w-3/5 xl:w-9/12">
      {/* headline */}
      <div className="">
        <div
          className="font-sans text-2xl text-base-200 ml-5 font-thin mb-5"
          style={{ marginTop: '55px' }}
        >
          <span className="text-3xl font-medium">{ cityName }, </span>Weather
          Forecast 6 Days
        </div>
      </div>

      {/* forecast cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 px-5 mx-auto">
        <ForecastCard/>
      </div>
    </section>
  );
}

export default SideTwo;
