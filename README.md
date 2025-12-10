# Sri Lanka Flood Monitoring Dashboard

**Repository**: https://github.com/RensithUdara/Flood-Data

A modern, interactive real-time flood monitoring dashboard for Sri Lanka with live water level and rainfall data visualization, risk assessment, and alert management.

## 🌊 Features

### Core Dashboard Capabilities
- **Real-time Data Monitoring** — Live water level and rainfall data from Sri Lanka's Disaster Management Centre (DMC)
- **Interactive Charts** — 5 different chart types for comprehensive data visualization
- **Risk Assessment Matrix** — Automated categorization of stations by flood risk severity
- **Advanced Statistics** — Extended metrics including percentages, safety margins, and threshold comparisons
- **Multi-Tab Interface** — Overview, Station Map, Alerts, and All Stations views
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile devices
- **Search & Filter** — Find stations by name, basin, or status
- **Modal Details** — Click any station for comprehensive details

### Data Visualization
- **Water Level Chart** — Bar chart of top 15 stations sorted by water level
- **Rainfall Chart** — Line chart showing top 15 rainfall measurements
- **Basin Distribution** — Doughnut chart of station distribution by river basin
- **Status Distribution** — Pie chart showing stations by alert status
- **Threshold Comparison** — Horizontal bar chart comparing water levels vs alert/flood thresholds for top 8 stations

### Metrics & Analytics
- **Key Metrics Cards** — Real-time counts of Normal, Alert, Minor Flood, and Major Flood stations with progress indicators
- **Statistics Cards** — Peak water level, peak rainfall, average water level, and total rainfall across all stations
- **Extended Statistics** — Percentage of stations at each alert level with progress bars
- **Safety Margin** — Average distance of stations below the alert threshold
- **Risk Categories** — Critical, High, Medium, and Low risk station counts

### Deployment Options
- **Server Mode** — Python HTTP server for localhost access (recommended)
- **Standalone Mode** — Works offline with sample data fallback
- **No Framework** — Pure HTML5, CSS3, and vanilla JavaScript (Chart.js 3.9.1 only)

---

## 🚀 Quick Start

### Prerequisites
- Python 3.6+ (for server mode) or just a modern web browser
- Latest Chrome, Firefox, Safari, or Edge browser

### Option 1: Server Mode (Recommended)

```bash
# Navigate to project directory
cd rise-lk-flood-data-main

# Start the local server
python server.py

# Open in browser
# http://localhost:8000
```

### Option 2: Standalone Mode

Simply open `index-standalone.html` directly in your browser. Works offline with sample data.

### Option 3: Deploy with Live Data

The dashboard automatically loads data from `data/gauges_2_view.json`. To use live data:

1. Set up the data collection script from the main repository
2. Run `python server.py` to serve the files
3. Dashboard updates when data changes

---

## 📊 Dashboard Sections

### Overview Tab (Default)
- **Metrics Section** — 4 metric cards showing station counts by status with colored indicators
- **Stats Cards** — 4 information cards with peak and average values
- **Extended Statistics** — 4 progress-based summary boxes with percentages and safety metrics
- **Risk Matrix** — 4 risk category cards showing critical/high/medium/low station counts
- **Charts Section** — Water level and rainfall bar/line charts for top 15 stations
- **Basin Distribution** — Doughnut and pie charts for geographic and status distribution
- **Threshold Comparison** — Horizontal bar chart comparing current levels with alert/flood thresholds
- **Top Alert Stations** — Quick access to highest priority stations

### Station Map Tab
Interactive grid view of all stations with:
- Station name and basin
- Current water level
- Status indicator (color-coded)
- Click for detailed modal view

### Alerts Tab
Comprehensive alerts view with:
- Filterable by status (Alert, Minor Flood, Major Flood)
- Station details and current measurements
- Threshold information
- Risk classification

### All Stations Tab
Complete station table with:
- Search by station name or basin
- Filter by basin dropdown
- Sortable columns
- Individual station details modal

---

## 📈 Data Format

Data is loaded from `data/gauges_2_view.json`:

```json
{
  "record_count": 1234,
  "timestamp": "2025-12-11T15:30:00Z",
  "records": [
    {
      "objectid": 1,
      "basin": "Kelani Ganga",
      "station_name": "Hanwella",
      "gauge": "Hanwella",
      "water_level": 3.45,
      "rain_fall": 25.5,
      "alertpull": 5.5,
      "minorpull": 6.5,
      "majorpull": 8.0,
      "CreationDate": "2025-12-11T15:00:00Z",
      "EditDate": "2025-12-11T15:30:00Z"
    }
    // ... more records
  ]
}
```

### Key Fields
- **water_level** — Current water level in meters
- **rain_fall** — Recent rainfall in millimeters
- **alertpull** — Alert threshold level
- **minorpull** — Minor flood threshold level
- **majorpull** — Major flood threshold level
- **basin** — River basin name
- **station_name** / **gauge** — Station identifier

---

## 🎨 Color Coding & Status System

### Status Colors
- 🟢 **Normal** — Below alert threshold (#10b981 - Green)
- 🟡 **Alert** — At or above alert threshold (#f59e0b - Amber)
- 🟠 **Minor Flood** — At or above minor flood threshold (#f97316 - Orange)
- 🔴 **Major Flood** — At or above major flood threshold (#ef4444 - Red)

### Risk Categories
- **Critical** — Major flood threshold exceeded
- **High Risk** — Minor flood threshold exceeded
- **Medium Risk** — Alert threshold exceeded
- **Low Risk** — Below alert threshold

---

## 🛠️ Technical Stack

### Frontend
- **HTML5** — Semantic markup with accessibility features
- **CSS3** — Modern styling with Grid, Flexbox, gradients, and animations
- **JavaScript ES6+** — Vanilla JS (no frameworks) for maximum compatibility
- **Chart.js 3.9.1** — UMD build for chart visualization
- **Font Awesome 6.4.0** — Icon library via CDN

### Backend/Server
- **Python 3** — Simple HTTP server using `http.server` module
- **No external dependencies** — Uses only standard library

### Architecture
- **Client-side Processing** — All calculations done in browser
- **Real-time Updates** — Auto-refresh every 30 seconds
- **Responsive Grid Layout** — Adapts to all screen sizes
- **CSS Variables** — Easy theme customization

---

## 📱 Responsive Design

### Breakpoints
- **Desktop** — 1200px and above (full multi-column layout)
- **Tablet** — 768px to 1199px (2-column grid)
- **Mobile** — Below 768px (single column stack)

### Mobile Features
- Optimized touch targets and spacing
- Simplified navigation with collapsible sections
- Readable font sizes and charts
- Full functionality on all devices

---

## ⚡ Performance

- **Fast Load Time** — Minimal CSS/JS, optimized images
- **No Build Step** — Open and run immediately
- **Efficient Updates** — Only re-render changed data
- **Smooth Animations** — Hardware-accelerated CSS transitions
- **Chart Optimization** — Efficient canvas rendering with Chart.js

---

## 📋 File Structure

```
rise-lk-flood-data-main/
├── index.html                 # Main dashboard (requires server)
├── index-standalone.html      # Offline version with sample data
├── styles.css                 # All styling (1152+ lines)
├── script.js                  # Main JavaScript (880+ lines)
├── script-standalone.js       # Standalone version script
├── server.py                  # Python HTTP server
├── data/
│   ├── gauges_2_view.json     # Live data (JSON)
│   └── gauges_2_view.csv      # Live data (CSV)
├── scripts/
│   └── update_flood_data.py   # Data collection script
└── README.md                  # This file
```

---

## 🔧 Configuration & Customization

### Modify Refresh Interval
In `script.js`, find the `setInterval` call and adjust:
```javascript
setInterval(loadData, 30000); // Change 30000 to desired milliseconds
```

### Change Color Scheme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #3b82f6;
    --alert-color: #f59e0b;
    --danger-color: #ef4444;
    /* ... etc */
}
```

### Update Data Source
Modify data loading in `script.js`:
```javascript
const response = await fetch('./data/gauges_2_view.json'); // Change URL
```

---

## 🎯 Usage Examples

### Local Development
```bash
# Terminal 1: Start server
python server.py

# Terminal 2: Watch data updates
# http://localhost:8000 in browser
```

### Production Deployment
1. Copy all files to web server
2. Configure data source URL in `script.js`
3. Set up automated data collection via cron or GitHub Actions
4. Access via your domain

### Data Processing
Use the dashboard to:
- Monitor flood risk in real-time
- Identify high-risk stations at a glance
- Track trends across basins
- Generate reports from displayed data

---

## 📊 Statistics & Calculations

### Extended Statistics
- **Alert Percentage** — (Stations at alert level / Total stations) × 100
- **Minor Flood Percentage** — (Stations with minor flooding / Total stations) × 100
- **Major Flood Percentage** — (Stations with major flooding / Total stations) × 100
- **Safety Margin** — Average distance of all stations below alert threshold

### Risk Assessment
Stations are categorized based on current water level:
- **Critical** — water_level ≥ majorpull
- **High Risk** — water_level ≥ minorpull
- **Medium Risk** — water_level ≥ alertpull
- **Low Risk** — water_level < alertpull

---

## 🔐 Data & Privacy

- **No Data Storage** — Dashboard reads data only; doesn't store user information
- **Local Processing** — All calculations happen in browser
- **Public Data Source** — Uses DMC's public ArcGIS services
- **No Authentication** — Open access to flood monitoring information

---

## 🐛 Troubleshooting

### Dashboard Shows "Loading..." Forever
- Check that `data/gauges_2_view.json` exists
- Verify server is running: `python server.py`
- Check browser console for errors (F12)

### Charts Not Displaying
- Ensure Chart.js CDN is accessible
- Check network tab for failed requests
- Try clearing browser cache

### Data Not Updating
- Verify data collection script is running
- Check that `gauges_2_view.json` file is being updated
- Inspect network requests in browser DevTools

### Mobile View Looks Off
- Force refresh (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Check viewport meta tag in HTML

---

## 🚀 Future Enhancements

Potential improvements for future versions:
- Historical data visualization and trends
- Weather forecast integration
- Email/SMS alert notifications
- Multi-user login with saved preferences
- API endpoint for data access
- Mobile app version
- Predictive flooding models
- Download reports functionality

---

## 📝 Data Source

Data is sourced from:
- **Service**: Sri Lanka Disaster Management Centre (DMC) ArcGIS Feature Service
- **Layer**: `gauges_2_view` Feature Layer
- **Update Frequency**: Every 5 minutes (configurable)
- **Access**: Public (no authentication required)

---

## 📞 Support & Contact

For issues or questions:
1. Check this README and QUICKSTART.md
2. Review browser console errors (F12 → Console tab)
3. Check network requests (F12 → Network tab)
4. Create an issue on GitHub repository

---

## 📄 License

This project is provided as-is for public use. Data is sourced from Sri Lanka's Disaster Management Centre public services.

---

## 🙏 Credits

**Dashboard Development**: Interactive visualization system with real-time flood monitoring
**Data Source**: Sri Lanka's Disaster Management Centre
**Libraries**: Chart.js, Font Awesome, HTML5/CSS3

---

**Last Updated**: December 11, 2025

For the latest version and updates, visit: https://github.com/RensithUdara/Flood-Data
