import React from "react";

class WeatherSearch extends React.Component {
  render() {
    return (
      <div className="weather-search">
        <h1 className="logo">
          WeatherY.com<i className="wi wi-day-sunny"></i>
        </h1>
        <form
          className="weather-search-form"
          onSubmit={this.props.handleSubmit}
        >
          <input
            className="search-input"
            type="text"
            onChange={this.props.handleChange}
            placeholder="Search city"
          />
          <button className="btn">Search</button>
        </form>
      </div>
    );
  }
}

export default WeatherSearch;
