import { useMemo } from "react";
import { useLocation } from "../hook/useLocation";
import { fetchCoordinate, getDateString, getImageURL } from "../utils/utils";
import { useQuery } from "@tanstack/react-query";
import {
  FutureForecastResponse,
  FutureForecastResponseList,
} from "../types/response";

const today = new Date();
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export function FutureForecast() {
  const { location } = useLocation();

  const targetContry = useMemo(() => {
    return fetchCoordinate(location);
  }, [location, fetchCoordinate]);

  const futureForecast = useQuery({
    queryKey: ["futureForecast", location],
    queryFn: async (): Promise<FutureForecastResponse> => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${targetContry[0].latitude.toString()}&lon=${targetContry[0].longitude.toString()}&appid=${API_KEY}`
      );
      return await response.json();
    },
  });

  const renderFutureForecast = useMemo(() => {
    const renderFutureForecast: {
      [key: string]: FutureForecastResponseList[];
    } = {};

    futureForecast.data?.list.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000);
      if (!renderFutureForecast[date.getDate()]) {
        renderFutureForecast[date.getDate()] = [];
        renderFutureForecast[date.getDate()].push(forecast);
      } else {
        renderFutureForecast[date.getDate()].push(forecast);
      }
    });
    return renderFutureForecast;
  }, [futureForecast]);

  return (
    <div id="container" className="flex flex-col">
      <p className="font-bold">{`5-day Forecast(3 Hours)`}</p>
      <div
        id="future-forecast"
        className="bg-white shadow-md rounded-lg p-4 my-2 text-sm"
      >
        {Object?.entries(renderFutureForecast).map(([key, value]) => {
          const date = new Date(value[0].dt * 1000);
          const isToday = today.getDate() === date.getDate();
          return (
            <div key={key} className="">
              <p className="py-4 text-gray-500">
                {isToday ? "Today" : getDateString(date)}
              </p>
              {value.map((forecast) => {
                const time = new Date(forecast.dt * 1000).getHours();

                return (
                  <div key={forecast.dt} className="flex items-center my-2">
                    <p className="w-12 font-semibold">{time}:00</p>
                    <img
                      className="w-10 h-10"
                      src={getImageURL(forecast.weather[0].icon)}
                    />
                    <p className="text-gray-500">
                      {(forecast.main.temp_min - 273).toFixed(2)} /{" "}
                      {(forecast.main.temp_max - 273).toFixed(2)}°C
                    </p>
                    <p className="ml-auto font-semibold">
                      {forecast.weather[0].description}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
