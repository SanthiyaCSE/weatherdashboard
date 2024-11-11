
# Weather Dashboard

## Description

A weather dashboard app that allows users to view the current weather and a 5-day forecast for any city. It also includes a location-based weather feature that fetches weather data based on the user's current location using the browser's geolocation API. The app supports toggling between Celsius and Fahrenheit for temperature units, as well as a dark/light mode theme.

## Features
- **Search for City**: Enter the name of a city to view current weather and a 5-day forecast.
- **Location-based Weather**: Get weather data for your current location by clicking a button.
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit.
- **Dark/Light Mode**: Toggle between dark and light mode for better viewing.


## Getting Started

### Prerequisites

You need to have the following installed:
- Node.js v22.11.0
- npm (Node Package Manager)

### Installation

1. Clone this repository:

```bash
git clone https://github.com/SanthiyaCSE/weatherdashboard.git
```

2. Navigate to the project folder:

```bash
cd weatherdashboard
```

3. Install the necessary dependencies:

```bash
npm install
```

4. Create a `.env` file in the root of the project and add your OpenWeatherMap API key:

```plaintext
REACT_APP_API_KEY=your-api-key-here
```

You can sign up for an API key on [OpenWeatherMap](https://openweathermap.org/api).

### Running the Application

To run the application locally:

```bash
npm start
```

The app will be accessible at `http://localhost:3000`.

## Dependencies

- `axios`: For making HTTP requests to the OpenWeatherMap API.
- `react`: JavaScript library for building user interfaces.

## Additional Information

- The app fetches data from the [OpenWeatherMap API](https://openweathermap.org/api).
- The app uses geolocation to fetch weather data based on your current location.
