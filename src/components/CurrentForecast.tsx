import { useMemo } from "react";
import { useLocation } from "../hook/useLocation";
import { fetchCoordinate, getImageURL } from "../utils/utils";
import { useQuery } from "@tanstack/react-query";
import { CurrentForecastResponse } from "../types/response";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

const today = new Date();
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export function CurrentForecast() {
  const { location } = useLocation();

  const targetContry = useMemo(() => {
    return fetchCoordinate(location);
  }, [location]);

  const currentForecast = useQuery({
    queryKey: ["currentForecast", location],
    queryFn: async (): Promise<CurrentForecastResponse> => {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${targetContry[0].latitude.toString()}&lon=${targetContry[0].longitude.toString()}&appid=${API_KEY}`
      );
      return await response.json();
    },
  });

  return (
    <div
      className="bg-white shadow-md rounded-lg py-3 px-6 flex flex-col"
      id="container"
    >
      <div className="flex justify-self-start">{today.toDateString()}</div>
      <div className="flex gap-8 justify-around">
        <div>
          <img
            src={
              currentForecast.data?.current.weather[0].icon &&
              getImageURL(currentForecast.data?.current.weather[0].icon)
            }
          />
        </div>
        <div className="flex-col content-center ">
          <div className="font-semibold text-3xl">
            {currentForecast?.data?.current?.feels_like
              ? (currentForecast?.data?.current?.feels_like - 273).toFixed(1) +
                "°C"
              : 0}
          </div>
          <div className="font-semibold">
            {currentForecast.data?.current.weather[0].description
              .split(" ")
              .map(
                (text) =>
                  text[0].toUpperCase() + text.slice(1, text.length) + " "
              )}
          </div>
        </div>
      </div>
      <div className="flex flex-shrink gap-6 text-center justify-around text-sm">
        <div className="flex-col">
          <p className="text-gray-500">Humidity</p>
          <p className="font-bold">
            {currentForecast.data?.current.humidity} %
          </p>
        </div>
        <div className="flex-col">
          <p className="text-gray-500">Winds</p>
          <p className="font-bold flex items-center gap-1">
            <CallReceivedIcon style={{ fontSize: "14px" }} />
            {currentForecast.data?.current.wind_speed} m/s
          </p>
        </div>
        <div className="flex-col">
          <p className="text-gray-500">Visibility</p>
          <p className="font-bold">
            {currentForecast.data?.current.visibility &&
              currentForecast.data?.current.visibility / 1000}{" "}
            km
          </p>
        </div>
      </div>
    </div>
  );
}
