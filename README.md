# Balloon Over-Water Tracker

A responsive web app that displays balloon positions with land/ocean backgrounds using live API data.

---

## Table of Contents

1. [Description](#description)
2. [Tech Stack](#tech-stack)
3. [How to Roll Your Own](#how-to-roll-your-own)
4. [Contributing](#contributing)

---

## Description

**Balloon Tracker** is a React-based frontend served by a lightweight Express backend proxy.  
It fetches balloon position data from the [Windborne Systems API](https://a.windbornesystems.com/treasure/00.json) and checks location context (land or water) using the [Is On Water API](https://is-on-water.balbona.me/).

Each balloon card displays latitude, longitude, and altitude along with a background image indicating whether the balloon is currently above land or water.  
The UI is responsive and adapts to different viewport sizes.

**Note**

This project relies on the Windborne API (`https://a.windbornesystems.com/treasure/00.json`) as a source of balloon latitude, longitude, and altitude data.

**Important:** The Windborne API is not guaranteed to be persistent. If the API becomes unavailable, the app may not display balloon data correctly. For long-term use or development, consider storing a local copy of the balloon data JSON or mocking the API responses.

---

## Tech Stack

- **Frontend**

  - [Vite](https://vitejs.dev/) – lightning-fast build tool
  - [React](https://react.dev/) – component-based UI library
  - [Bootstrap](https://getbootstrap.com/) – layout and component styling
  - Custom CSS for responsive grid and overlay text

- **Backend**

  - [Express.js](https://expressjs.com/) – simple proxy server for API requests

- **Languages**
  - JavaScript (ES6+)
  - HTML5
  - CSS3

---

## How to Roll Your Own

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 16.x recommended)

### Setup Instructions

1. **Fork** this repository to your own GitHub account.

1. **Clone** your fork locally:

   ```bash
   git clone https://github.com/your-username/balloon-tracker.git
   cd balloon-tracker
   ```

1. **Install dependencies**

   ```bash
   npm install
   ```

1. **Set up .env**

   Create a `.env` file in the root directory, and enter `VITE_API_BASE=""` & `TREASURE_BASE_URL=https://a.windbornesystems.com/treasure` into this file.

1. **Run the proxy and front-end dev environments**

   ```bash
   npm start # proxy
   ```

   &

   ```bash
   npm run dev # React
   ```

1. Happy balloon tracking!

## Contributing

Pull requests are welcome. For major changes, please open an issue first.
