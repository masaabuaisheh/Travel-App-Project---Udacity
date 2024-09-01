# Travel App

## Project Overview

This Travel App allows users to plan their trips by providing weather forecasts and images for their destination. The app integrates data from multiple APIs to offer a comprehensive travel planning experience. Users can enter their travel location and date, and the app will fetch and display weather forecasts, location images, and more.

## Features

- **Location Input**: Enter the city you are traveling to and the departure date.
- **Weather Forecast**: Retrieve current or future weather data based on your travel date.
- **Location Images**: Display images of the entered location.
- **Service Workers**: Offline capabilities for a better user experience.

## APIs Used

- **Geonames API**: Converts location names to coordinates.
- **Weatherbit API**: Provides current and forecasted weather data.
- **Pixabay API**: Supplies images of the entered location.

## Development Setup

### Prerequisites

- **Node.js**: Version 20.11.1
- **npm**: Node Package Manager

> **Note**: The project is developed and tested on Node.js version 20.11.1. It is important to use this version or ensure compatibility to avoid any issues during setup and execution.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/travel-app.git
    cd travel-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add your API keys for Geonames, Weatherbit, and Pixabay.

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Build for production:
    ```bash
    npm run build
    ```

6. Start the production server:
    ```bash
    npm start
    ```

### Testing

- Run unit tests for the application:
    ```bash
    npm run test
    ```

### Documentation

- Detailed information on how to use and configure the APIs can be found in their respective documentation:
  - [Geonames API](http://www.geonames.org/)
  - [Weatherbit API](https://www.weatherbit.io/)
  - [Pixabay API](https://pixabay.com/api/)

## Roadmap

- Implement additional features like multiple destinations, hotel/flight data, and local storage.
- Enhance the user experience with improved UX and UI design.
- Optimize performance and refactor code for better maintainability.
