import React, { Component } from 'react';

const KEY = 'f5672b9d8248bed28c43b00460aa62eb';
const URL = 'https://api.openweathermap.org/data/2.5';
const CITY = 'LVIV';

class Weather extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      temperature: undefined,
      weatherIcon: undefined,
      loading: true,
    };
  }

  componentDidMount() {
    this._isMounted = true;

    let url = `${URL}/weather?q=${CITY}&APPID=${KEY}&units=metric`;
    fetch(url)
      .then(data => data.json())
      .then(parsedData => {
        if (this._isMounted) {
          this.setState({
            temperature: parsedData.main.temp,
            weatherIcon: parsedData.weather[0].icon,
            loading: false,
          });
        }
      })
      .catch(() => {});
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let content;
    if (this.state.loading) {
      content = <div>Loading...</div>;
    } else {
      content = (
        <div className="weather-widget">
          <img
            src={`http://openweathermap.org/img/w/${
              this.state.weatherIcon
            }.png`}
            alt="weather icon"
          />
          <div className="temperature">
            {this.state.temperature.toFixed()}
            ºC
          </div>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

export default Weather;
