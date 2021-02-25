import React from "react";
import _ from "lodash";

import WeatherCard from "../../components/WeatherCard";
import WeatherSearch from "../../components/WeatherSearch";

class WeatherContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      weatherData: "",
      searchInput: "",
      error: false,
      errorText: "",
      latitude: "",
      longitude: "",
    };
    this.getWeather = this.getWeather.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showPosition = this.showPosition.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }
  componentDidUpdate() {}
  componentDidMount() {
    this.getLocation();
  }
  getWeather(city) {
    const apiUrl = "http://api.weatherapi.com/v1/";
    const apiKey = "31d059311815419595f144452210902";
    const finalUrl =
      apiUrl + "forecast.json" + "?key=" + apiKey + "&q=" + city + "&days=3";
    fetch(finalUrl)
      //.then((response) => console.log(response.status))
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          this.setState({
            error: false,
            isLoading: true,
            weatherData: data,
          });
        } else {
          this.setState({
            errorText: data.error.message,
            error: true,
          });
          console.log(data.error.message);
        }
      });
    // .catch((error) => console.log(error));
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      console.log(this.state.latitude);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  showPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    this.setState({
      latitude: lat,
      longitude: long,
    });
    this.getWeather(this.state.latitude, this.state.longitude);
    console.log(position.coords.latitude, position.coords.longitude);
  }
  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  handleChange(e) {
    this.setState({
      searchInput: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.getWeather(this.state.searchInput);
  }

  render() {
    return (
      <div class="container">
        <WeatherCard
          error={this.state.error}
          errorMessage={this.state.errorText}
          data={this.state.weatherData}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        ></WeatherCard>
      </div>
    );
  }
}

export default WeatherContainer;
