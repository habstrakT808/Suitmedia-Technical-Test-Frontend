# Suitmedia Ideas Portal

![Suitmedia Logo](/public/logo.png)

## 📱 Live Demo

[View Live Demo](https://suitmedia-technical-test-frontend.vercel.app/)

## 🌟 Overview

This project is a responsive web application showcasing Suitmedia's "Ideas" portal - a platform where great things begin. The application features a modern UI with interactive components, responsive design, and seamless API integration.

## ✨ Features

### 🔝 Header

- Fixed position header with scroll-aware behavior
- Disappears on scroll down, reappears on scroll up with semi-transparent background
- Active state highlighting for current page
- Responsive mobile menu

### 🖼️ Banner

- Dynamic banner with parallax scrolling effect
- Sloped bottom edge design without image modification
- Responsive text overlay

### 📋 Post List

- Dynamic post cards with consistent thumbnail ratios
- Lazy loading for optimized performance
- Sorting functionality (newest/oldest)
- Configurable items per page (10, 20, 50)
- Persistent state across page refreshes
- Truncated titles with ellipsis for titles exceeding 3 lines

### 🔄 API Integration

- Proxy configuration for API requests
- Pagination support
- Sorting capabilities
- Image size options

## 🛠️ Technologies

- React.js
- CSS3 with custom animations
- Axios for API requests
- HTTP-Proxy-Middleware for API proxying

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository

```bash
git clone https://github.com/habstrakT808/Suitmedia-Technical-Test-Frontend.git
```

2. Navigate to the project directory

```bash
cd Suitmedia-Technical-Test-Frontend
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm start
```

5. Open your browser and visit `http://localhost:3000`

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- Desktop screens
- Tablets
- Mobile devices

## 📝 API Documentation

The application uses the Suitmedia backend API:

- Base URL: `https://suitmedia-backend.suitdev.com/api`
- Endpoint: `/ideas`
- Parameters:
  - `page[number]`: Current page number
  - `page[size]`: Items per page (10, 20, or 50)
  - `append[]`: Image size options (small_image, medium_image)
  - `sort`: Sorting order (-published_at for newest, published_at for oldest)

Example API call:

```
https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=10&append[]=small_image&append[]=medium_image&sort=-published_at
```

## 🧪 Project Structure

```
suitmedia-ideas/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── Banner/       # Banner component
│   │   ├── Header/       # Header component
│   │   ├── Pagination/   # Pagination component
│   │   └── PostList/     # Post list and card components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── utils/            # Utility functions and constants
│   ├── App.js            # Main App component
│   └── index.js          # Application entry point
└── README.md             # Project documentation
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Developed as a technical test for Suitmedia.

---

⭐️ **Star this repository if you found it useful!** ⭐️
