# Flood Data Dashboard

A real-time water level and rainfall monitoring dashboard for Sri Lanka's river basins, built with Next.js, TypeScript, Tailwind CSS, and Recharts.

## Features

- **Real-time Data Visualization** — Live water level and rainfall charts
- **Interactive Station Selection** — View detailed metrics for specific gauge stations
- **Alert Monitoring** — Highlight stations exceeding safe water levels
- **River Basin Filtering** — Filter stations by river basin (Kelani Ganga, Kalu Ganga, etc.)
- **Responsive Design** — Works on desktop, tablet, and mobile devices
- **Auto-refresh** — Updates every 5 minutes automatically

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Runtime**: Node.js 18+

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Navigate to the project directory:

```bash
cd flood-data-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Available Scripts

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Data Source

The dashboard fetches real-time data from the Flood-Data repository:

- **URL**: `https://raw.githubusercontent.com/RensithUdara/Flood-Data/main/data/gauges_2_view.json`
- **Update Frequency**: Every 5 minutes
- **Data Format**: JSON with metadata and gauge records

## Project Structure

```
flood-data-dashboard/
├── app/
│   ├── page.tsx                 # Main dashboard page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── DashboardHeader.tsx       # Header with title
│   ├── MapView.tsx              # Station map visualization
│   ├── WaterLevelChart.tsx       # Bar chart for water levels
│   ├── RainfallChart.tsx         # Line chart for rainfall
│   ├── AlertStations.tsx         # Alert-level stations list
│   └── GaugesList.tsx            # Full stations table
├── lib/
│   ├── api.ts                   # API calls to GitHub
│   └── types.ts                 # TypeScript type definitions
└── public/                      # Static assets
```

## Components

### DashboardHeader
Top navigation bar with title and description.

### MapView
Displays gauge stations in a grid layout. Click to select a station for detailed view.

### WaterLevelChart
Bar chart showing current water levels for selected gauge or top 10 stations.

### RainfallChart
Line chart displaying rainfall measurements across stations.

### AlertStations
Sidebar showing stations with elevated water levels, ranked by severity.

### GaugesList
Complete table of all stations with filtering, sorting, and quick select buttons.

## Usage Guide

1. **Main View**: See all gauge stations with current water levels
2. **Filter by Basin**: Click on a river basin button to filter stations
3. **Select Station**: Click on a gauge to view detailed information
4. **Sort Options**: Sort stations by name or water level
5. **View Charts**: Automatically generated charts for selected station

## Deployment

Deploy to Vercel, Netlify, or any Node.js hosting:

```bash
npm run build
npm start
```

## Future Enhancements

- Interactive map with geographic coordinates
- Historical data trends (24h, 7d, 30d)
- Email/SMS alerts for critical levels
- Export data to CSV/PDF
- Dark/Light theme toggle
- Multi-language support

## License

Data sourced from Sri Lanka's Disaster Management Centre public services.

---

**Version**: 1.0.0  
**Last Updated**: December 10, 2025
