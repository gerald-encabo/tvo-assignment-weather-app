import { useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
const clear_icon = "https://s3-weather-app.s3.us-east-2.amazonaws.com/clear.png";
const cloud_icon = "https://s3-weather-app.s3.us-east-2.amazonaws.com/cloudy.png";
const drizzle_icon = "https://s3-weather-app.s3.us-east-2.amazonaws.com/drizzle.png";
const rain_icon = "https://s3-weather-app.s3.us-east-2.amazonaws.com/rain.png";
const snow_icon = "https://s3-weather-app.s3.us-east-2.amazonaws.com/snow.png";
const wind_icon = "https://s3-weather-app.s3.us-east-2.amazonaws.com/wind.png";
const temperature_icon = "https://s3-weather-app.s3.us-east-2.amazonaws.com/temperature.png";
const humidity_icon = "https://s3-weather-app.s3.us-east-2.amazonaws.com/humidity.png";

const WeatherCard = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const searchLocation = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }

    try {
      const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&mode=json&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;

      const response = await fetch(urlAPI);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        speed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch {
      setWeatherData(false);
      console.error("Error: Fetching API Weather data not working!");
    }
  };

  return (
    <section className="flex flex-col justify-center text-center items-center p-[40px] m-[20px] rounded-[10px] place-self-center bg-gradient-to-r from-gray-500 to-gray-600 tablet:h-full tablet:w-full tablet:rounded-none tablet:m-0">
      <h1 className="text-lightColor text-[2.5rem] pb-[20px]">Weather App</h1>
      <div className="flex align-middle gap-3 mobile:flex items-center">
        <input 
            type="text" 
            placeholder="Enter a city" 
            ref={inputRef} 
            className="h-[50px] border-none outline-none rounded-[40px] pl-[25px] text-[1.375rem] text-darkColor bg-lightColor mobile:w-[240px]"
        />
        <button
          onClick={() => searchLocation(inputRef.current.value)}
          className="cursor-pointer bg-lightColor p-3 rounded-[50%] mobile:w-[50px]"
        >
          <SearchIcon />
        </button>
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="w-[150px] my-[30px]" />
          <p className="text-lightColor text-[4rem] leading-none">
            {weatherData.temperature}°C
          </p>
          <p className="text-lightColor text-[2rem]">{weatherData.location}</p>
          <div className="flex w-full text-lightColor mt-10 justify-between flex-wrap content-center gap-5 mobile:flex-col">
            <div className="flex self-center gap-[12px] text-[1.375rem] align-middle">
              <img src={temperature_icon} alt="" className="w-[60px] mobile:w-[50px]" />
              <div>
                <p>{weatherData.feels_like} °C</p>
                <span className="block text-[1rem]">Feel like</span>
              </div>
            </div>
            <div className="flex self-center gap-[12px] text-[1.375rem] align-middle">
              <img src={humidity_icon} alt="" className="w-[60px] mobile:w-[50px]" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span className="block text-[1rem]">Humidity</span>
              </div>
            </div>
            <div className="flex self-center gap-[12px] text-[1.375rem] align-middle">
              <img src={wind_icon} alt="" className="w-[60px] mobile:w-[50px]" />
              <div>
                <p>{weatherData.speed} km/h</p>
                <span className="block text-[1rem]">Wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default WeatherCard;
