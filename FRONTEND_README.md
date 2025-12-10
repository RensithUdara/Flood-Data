# 🌊 Sri Lanka Flood Monitoring Dashboard

A modern, responsive web-based dashboard for real-time flood monitoring using Sri Lanka's DMC gauge data.

## 📋 Features

### Data Visualizations
- **Enhanced Statistics Cards**
  - Highest water level with station name
  - Highest rainfall with station name
  - Average water level across all stations
  - Total rainfall sum
  
- **Multiple Charts**
  - Top 15 Water Levels (Bar Chart)
  - Top 15 Rainfall Measurements (Line Chart)
  - Station Distribution by Basin (Doughnut Chart)
  - Alert Distribution by Status (Pie Chart)

- **Interactive Tables**
  - Complete station listing with search & filter
  - Search by station name or basin
  - Filter by basin
  - Sort by water level, rainfall, or status

### Alert System
- Color-coded status indicators
  - 🟢 Normal (green)
  - 🟡 Alert (amber)
  - 🟠 Minor Flood (orange)
  - 🔴 Major Flood (red)

- Alert Stations View with filters
- Top alert stations widget
- Clickable station cards for details

### Tabs/Sections
1. **Overview** - Metrics, stats, and charts
2. **Station Map** - Grid view of top 12 stations
3. **Alerts** - Filterable critical alert list
4. **All Stations** - Complete searchable/sortable table

## 🚀 Getting Started

### Option 1: With Local Server (Recommended)

**Requirements:**
- Python 3.7+
- Latest flood data in `data/gauges_2_view.json`

**Steps:**
```powershell
# Navigate to project directory
cd "path\to\rise-lk-flood-data-main"

# Run the server
python server.py

# Open in browser
# http://localhost:8000
```

### Option 2: Standalone HTML (No Server)

Simply open `index-standalone.html` directly in your browser. This version:
- Works offline (no web server needed)
- Loads local data automatically
- Falls back to sample data if needed
- Full dashboard functionality

## 📁 Project Structure

```
rise-lk-flood-data-main/
├── index.html                  # Main dashboard (requires server)
├── index-standalone.html       # Standalone version (no server needed)
├── styles.css                  # Responsive styling
├── script.js                   # Dashboard logic (main version)
├── script-standalone.js        # Dashboard logic (standalone)
├── server.py                   # Simple Python HTTP server
├── data/
│   ├── gauges_2_view.json     # Current flood data
│   └── gauges_2_view.csv      # CSV export
└── FRONTEND_README.md          # This file
```

## 🎨 Design Features

### Responsive Layout
- Desktop: Multi-column grid layouts
- Tablet: Adaptive grid (2 columns)
- Mobile: Single column with optimized spacing
- Touch-friendly interactive elements

### Color Scheme
- Primary: Blue (#3b82f6)
- Secondary: Cyan (#06b6d4)
- Success: Green (#10b981)
- Alert: Amber (#f59e0b)
- Danger: Red (#ef4444)
- Dark: #1f2937
- Light: #f3f4f6

### Interactive Features
- Smooth tab switching with animations
- Hover effects on cards and buttons
- Modal popups for detailed station info
- Real-time data refresh capability
- Responsive charts with Chart.js

## 📊 Data Fields

Each station displays:
- **Gauge Name** - Station identifier
- **Basin** - River basin name
- **Water Level** (m) - Current water level in meters
- **Alert Level** (m) - Alert threshold
- **Minor Flood Level** (m) - Minor flood threshold
- **Major Flood Level** (m) - Major flood threshold
- **Rainfall** (mm) - Current rainfall in millimeters
- **Last Updated** - Timestamp of last reading

## 🔄 Data Integration

### Local File Usage
- Place `gauges_2_view.json` in the `data/` folder
- Dashboard auto-loads on page load
- Refreshes via "Refresh Data" button

### Data Format Required
```json
{
  "last_updated_utc": "2025-12-10T17:04:26.357477+00:00",
  "source": "rise_lk_gauges_scraper",
  "record_count": 6054,
  "records": [
    {
      "gauge": "Station Name",
      "basin": "Basin Name",
      "water_level": 1.35,
      "rain_fall": 0,
      "alertpull": 5.5,
      "minorpull": 6.5,
      "majorpull": 7.5,
      "EditDate": "2025-12-10T16:44:21.103000+00:00"
    }
  ]
}
```

## 🛠️ Customization

### Change Data Source
Edit in `script.js` or `script-standalone.js`:
```javascript
const DATA_URL = './data/gauges_2_view.json';
// Or for remote:
// const DATA_URL = 'https://example.com/data.json';
```

### Modify Colors
Update CSS variables in `styles.css`:
```css
:root {
    --primary-color: #3b82f6;
    --danger-color: #ef4444;
    /* ... other colors ... */
}
```

### Adjust Chart Data
Modify `renderCharts()` to change number of stations displayed:
```javascript
.slice(0, 15)  // Change 15 to desired number
```

## 📈 Performance

- Lightweight CSS (no frameworks)
- Efficient JavaScript (vanilla, no dependencies except Chart.js)
- Optimized for various network speeds
- Lazy loading on chart render
- Minimal DOM manipulation

## 🔐 Security Features

- Client-side processing only
- No sensitive data transmission
- CORS-safe local file loading
- Sanitized data display
- No external dependencies (except Chart.js from CDN)

## 🐛 Troubleshooting

### "Cannot load local file" Error
- Use `Option 1` (server) instead of standalone version
- Or place all files in a web server directory

### Charts Not Displaying
- Check browser console for errors
- Ensure Chart.js CDN is accessible
- Verify canvas elements exist in HTML

### Data Not Loading
- Check if `data/gauges_2_view.json` exists and is valid JSON
- Use browser dev tools (F12) to check network requests
- Verify file path is correct

### Server Won't Start
```powershell
# Check Python is installed
python --version

# Try with explicit path
python C:\path\to\server.py

# Use alternative port if 8000 is busy
# (Modify server.py PORT variable)
```

## 📱 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Opera: ✅ Full support
- IE 11: ⚠️ Partial support

## 📝 License

Part of the Flood-Data project
GitHub: https://github.com/RensithUdara/Flood-Data

## 👨‍💻 Development

### Files Modified/Created for Frontend
- `index.html` - Main dashboard HTML
- `index-standalone.html` - Standalone version
- `styles.css` - Complete styling
- `script.js` - Enhanced dashboard logic
- `script-standalone.js` - Standalone logic
- `server.py` - Python HTTP server
- `FRONTEND_README.md` - This documentation

### Technologies Used
- HTML5
- CSS3 (with CSS Grid & Flexbox)
- JavaScript (ES6+)
- Chart.js 3.9.1
- Font Awesome 6.4.0
- No frontend frameworks (vanilla implementation)

## 🚦 Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Historical data graph trends
- [ ] Export data to PDF/Excel
- [ ] Map visualization with geographic markers
- [ ] SMS/Email alerts for critical levels
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Advanced filtering & aggregation
- [ ] User preferences storage

## 📞 Support

For issues or questions:
1. Check browser console (F12)
2. Review troubleshooting section above
3. Visit GitHub repository
4. Check data file format

---

**Last Updated:** December 11, 2025
**Version:** 1.0
