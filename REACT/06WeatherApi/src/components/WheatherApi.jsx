import axios from "axios";
import React, { useState } from "react";
import "../App.css"
function WheatherApi() {
  let [place, setPlace] = useState("");
  let [data, setData] = useState("");
  let [err, setErr] = useState("");
  let fun = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=21950584c361496db0f65725250408&q=${place}&aqi=no`
      )
      .then((res) => {
        setData(res.data);
        setErr("");
        console.log(res.data);
      })
      .catch(() => {
        setErr("Data not found");
        setData("");
      });
  };
  return (
  <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
    <h1 className="text-3xl font-semibold text-center mb-4 text-blue-600">
      Weather App
    </h1>

    {/* Input + Button */}
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Enter Location"
        className="flex-1 border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setPlace(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? fun() : null)}
        value={place}
      />

      <button
        onClick={fun}
        className="bg-blue-500 text-white px-5 py-2 rounded-xl hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>

    {/* Error Message */}
    {err && (
      <p className="text-red-500 text-center font-medium mb-3">{err}</p>
    )}

    {/* Weather Data */}
    {data && (
      <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
        <p className="text-lg font-semibold">
          📍 Place: <span className="font-normal">{data.location.name}</span>
        </p>
        <p className="text-lg font-semibold">
          🏙 State: <span className="font-normal">{data.location.region}</span>
        </p>

        <div className="flex items-center gap-4 my-3">
          <p className="text-xl font-bold">
            🌡 {data.current.temp_c}°C
          </p>
          <img
            src={data.current.condition.icon}
            alt="weather icon"
            className="w-14"
          />
        </div>

        <p className="text-lg">
          🤏 Feels Like: <span className="font-medium">{data.current.feelslike_c}°C</span>
        </p>

        <p className="text-lg">
          🌥 Condition:{" "}
          <span className="font-medium">{data.current.condition.text}</span>
        </p>
      </div>
    )}
  </div>
);

}

export default WheatherApi;
