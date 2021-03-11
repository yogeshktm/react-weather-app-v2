import React from "react";
import _ from "lodash";
import WeatherSearch from "../WeatherSearch";
import cloudy from "../../assets/cloudy.gif";
import sunny from "../../assets/sunny.gif";
import thunder from "../../assets/thunder.gif";
import heavy_rain from "../../assets/heavy-rain.gif";
import mist from "../../assets/mist.gif";
import overcast from "../../assets/overcast.gif";
import defaultBG from "../../assets/default.jpg";

class WeatherCard extends React.Component {
  render() {
    const { data } = this.props;
    console.log(data);
    let location_data = _.values(data);
    // let display = location_data.map(function (item) {
    //   return <p>{item}</p>;
    // });
    let bg = defaultBG;
    if (data) {
      if (
        location_data[1].condition.code === 1003 ||
        location_data[1].condition.code === 1006
      ) {
        bg = cloudy;
      } else if (location_data[1].condition.code === 1000) {
        bg = sunny;
      } else if (location_data[1].condition.code === 1276) {
        bg = thunder;
      } else if (location_data[1].condition.code === 1030) {
        bg = mist;
      } else if (
        location_data[1].condition.code === 1192 ||
        location_data[1].condition.code === 1243 ||
        location_data[1].condition.code === 1195
      ) {
        bg = heavy_rain;
      } else if (
        location_data[1].condition.code === 1063 ||
        location_data[1].condition.code === 1009
      ) {
        bg = overcast;
      } else {
        bg = sunny;
      }
    }
    let hourWeather;
    if (data) {
      hourWeather = location_data[2].forecastday[0].hour.map(function (
        item,
        key
      ) {
        return (
          <div key={key} className="panel panel-sm">
            <p>{item.time}</p>
            <p>{item.condition.text}</p>
            <p>
              Feels like: {item.feelslike_c}
              <sup>oc</sup>
            </p>
            <img className="m-top-20" src={item.condition.icon} />
          </div>
        );
      });
    }
    return (
      <div className="wrapper" style={{ background: `url(${bg}) no-repeat` }}>
        <WeatherSearch
          handleChange={this.props.handleChange}
          handleSubmit={this.props.handleSubmit}
        ></WeatherSearch>
        {this.props.error ? (
          <p className="error-message">{this.props.errorMessage}</p>
        ) : null}
        {data ? (
          <div className="panel-wrapper">
            <div className="panel main-panel">
              <div className="panel-info">
                <h3>
                  <strong>{location_data[0].name}</strong>
                </h3>
                <p>
                  {location_data[0].region} - {location_data[0].country}
                </p>
                <p className="m-top-20">{location_data[1].condition.text}</p>
                <p>
                  Temperature: {location_data[1].feelslike_c} <sup>oc</sup>
                </p>
                <p>Humidity: {location_data[1].humidity}</p>
                <p>Wind Direction: {location_data[1].wind_dir}</p>
                <p>Wind: {location_data[1].wind_kph} kph</p>
              </div>
              <div className="panel-icon">
                <img src={location_data[1].condition.icon} />
              </div>
            </div>
            <div className="panel sun-moon-info">
              <div className="panel-info">
                <p>
                  <i className="wi wi-sunrise" title="sunrise"></i>
                  {location_data[2].forecastday[0].astro.sunrise}
                </p>
                <p>
                  <i className="wi wi-sunset"></i>
                  {location_data[2].forecastday[0].astro.sunset}
                </p>
                <p>
                  <i className="wi wi-moonrise" title="sunrise"></i>
                  {location_data[2].forecastday[0].astro.moonrise}
                </p>
                <p>
                  <i className="wi wi-moonset"></i>
                  {location_data[2].forecastday[0].astro.moonset}
                </p>
              </div>
            </div>
            <div className="today-weather-hour">{hourWeather}</div>
            <div className="forecast m-top-20">
              <div className="panel">
                <div className="panel-info">
                  <p>Today</p>
                  <p className="m-top-20">
                    {location_data[2].forecastday[0].date}
                  </p>
                  <p>{location_data[2].forecastday[0].day.condition.text}</p>
                </div>
                <div className="panel-icon">
                  <img
                    src={location_data[2].forecastday[0].day.condition.icon}
                  />
                </div>
              </div>
              <div className="panel">
                <div className="panel-info">
                  <p>Tommorow</p>
                  <p className="m-top-20">
                    {location_data[2].forecastday[1].date}
                  </p>
                  <p>{location_data[2].forecastday[1].day.condition.text}</p>
                </div>
                <div className="panel-icon">
                  <img
                    src={location_data[2].forecastday[1].day.condition.icon}
                  />
                </div>
              </div>
              <div className="panel">
                <div className="panel-info">
                  <p>Day after tommorow</p>
                  <p className="m-top-20">
                    {location_data[2].forecastday[2].date}
                  </p>
                  <p>{location_data[2].forecastday[2].day.condition.text}</p>
                </div>
                <div className="panel-icon">
                  <img
                    src={location_data[2].forecastday[2].day.condition.icon}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default WeatherCard;
