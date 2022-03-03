const initialState = {
  cityName: 'Pune',
  currentWeatherData: {},
  forecastWeatherData: {},
  responseStatus: ''
};

const weatherReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SEARCH_NEW_CITY': 
      const cityName = action.payload;
      return {
        ...state,
        cityName
      };

    case 'CURRENT_WEATHER_DATA':
      const currentWeatherData = action.payload;
      return {
        ...state,
        currentWeatherData
      };

    case 'FORECAST_WEATHER_DATA':
      const forecastWeatherData = action.payload;
      return {
        ...state,
        forecastWeatherData
      }

    case 'RESPONSE_STATUS':
      const responseStatus = action.payload;
      return {
        ...state,
        responseStatus
      }

    default: return {
      state,
    };
  }
}

export default weatherReducer;