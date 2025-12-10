# 🚀 Quick Start Guide - Flood Dashboard

## ⚡ 30-Second Setup

### For Windows Users

**Option 1: Server Mode (Recommended)**
```powershell
# Open PowerShell in the project directory
cd "C:\Users\USER\Downloads\rise-lk-flood-data-main\rise-lk-flood-data-main"

# Start server
python server.py

# Open browser and go to:
# http://localhost:8000
```

**Option 2: Standalone (No Server Needed)**
```
Just double-click or right-click:
→ Open with → Your Browser
→ index-standalone.html
```

## 📊 What You'll See

### Dashboard Overview
```
┌─────────────────────────────────────────┐
│  🌊 FLOOD MONITORING DASHBOARD          │
│  Real-time Data from Sri Lanka DMC      │
├─────────────────────────────────────────┤
│  Stats: Total | Alert | Minor | Major   │
├─────────────────────────────────────────┤
│  [OVERVIEW] [MAP] [ALERTS] [STATIONS]   │
├─────────────────────────────────────────┤
│                                         │
│  📈 Highest Water Level: 6.2m           │
│  🌧️ Highest Rainfall: 22.5mm            │
│  ≈ Avg Water Level: 3.45m               │
│  💧 Total Rainfall: 156.8mm             │
│                                         │
│  ┌─────────────────┬─────────────────┐  │
│  │ Water Levels    │ Rainfall        │  │
│  │ Bar Chart       │ Line Chart      │  │
│  └─────────────────┴─────────────────┘  │
│                                         │
│  ┌─────────────────┬─────────────────┐  │
│  │ By Basin        │ By Status       │  │
│  │ Doughnut Chart  │ Pie Chart       │  │
│  └─────────────────┴─────────────────┘  │
│                                         │
│  🚨 Top Alert Stations                  │
│  [Station Cards with Status]            │
│                                         │
└─────────────────────────────────────────┘
```

## 🎯 Features at a Glance

### Four Main Tabs

| Tab | What It Shows |
|-----|--------------|
| 📊 **Overview** | Statistics, key metrics, all charts, top alerts |
| 🗺️ **Station Map** | Grid cards of top 12 stations with color status |
| 🚨 **Alerts** | Filter by alert level, see exceeding stations |
| 📋 **Stations** | Search, filter by basin, sort all data |

### Color Legend
- 🟢 **Green** = Normal (below alert level)
- 🟡 **Amber** = Alert (approaching danger)
- 🟠 **Orange** = Minor Flood (water above minor threshold)
- 🔴 **Red** = Major Flood (water above major threshold)

## 📊 Charts Explained

### 1. Water Levels (Bar Chart)
- Shows top 15 stations with highest water levels
- Color indicates status (green → red)
- Helps identify critical areas

### 2. Rainfall (Line Chart)
- Top 15 stations by rainfall
- Trend visualization
- Cyan colored for easy identification

### 3. Station Distribution (Doughnut)
- Breakdown of stations by river basin
- Shows geographic distribution
- Helps understand coverage

### 4. Alert Status (Pie)
- Overall system health
- Count of stations in each status
- Quick status overview

## 🔍 How to Use Each Tab

### Overview Tab
1. **Check Metrics** - See overall stats at top
2. **Enhanced Stats** - See highest/average values
3. **Review Charts** - Understand data distribution
4. **Check Top Alerts** - See which stations are critical

### Station Map Tab
1. **View Stations** - See top 12 by water level
2. **Click Cards** - Get detailed info in popup
3. **Check Color** - Understand status at glance
4. **Review Values** - See exact water/rainfall

### Alerts Tab
1. **Use Filters** - Choose which alerts to show
2. **Review List** - See detailed alert info
3. **Check Levels** - See how much above threshold
4. **Monitor Status** - Track critical situations

### Stations Tab
1. **Search** - Type station or basin name
2. **Filter Basin** - Select from dropdown
3. **Review Table** - See all data
4. **Check Status** - Color badge shows condition

## 💾 Data Information

**Source:** Sri Lanka Disaster Management Centre (DMC)

**Update Frequency:** Every 5 minutes (via GitHub Actions)

**Data Location:** `data/gauges_2_view.json`

**Stations Tracked:** 6000+ gauge locations

## ⚙️ Server Management

### Start Server
```powershell
python server.py
```

### Access Dashboard
```
Browser: http://localhost:8000
```

### Stop Server
```
Press Ctrl+C in PowerShell
```

### Change Port (if needed)
Edit `server.py`:
```python
PORT = 8000  # Change this to 9000, etc.
```

## 🔧 Troubleshooting

### Issue: "Cannot find file"
**Solution:** Make sure you're in the correct directory
```powershell
cd "C:\Users\USER\Downloads\rise-lk-flood-data-main\rise-lk-flood-data-main"
```

### Issue: "Port 8000 already in use"
**Solution:** Change PORT in `server.py` or close other apps using port 8000

### Issue: Charts not showing
**Solution:** 
- Refresh page (Ctrl+R)
- Check browser console (F12)
- Verify data file exists

### Issue: No data displaying
**Solution:**
- Check if `data/gauges_2_view.json` exists
- Standalone version shows sample data automatically
- Use "Refresh Data" button to reload

## 📱 Mobile/Tablet Usage

Dashboard is **fully responsive**:
- **Desktop:** Full multi-column layouts
- **Tablet:** 2-column grid
- **Mobile:** Single column, optimized touch

Just open in your mobile browser - works great on all devices!

## 🔄 Refreshing Data

### Automatic
- Data refreshes every 5 minutes (configured in script)

### Manual
- Click "Refresh Data" link in footer
- Or press F5 to reload page

## 📞 Need Help?

1. **Check Logs**
   - Open browser console: F12
   - Look for errors/warnings

2. **Check Data File**
   - Ensure `data/gauges_2_view.json` exists
   - Verify it's valid JSON
   - Check file permissions

3. **Verify Setup**
   - Python 3.7+ installed? `python --version`
   - All files in correct location?
   - Running from correct directory?

## 🎓 Learning More

Read the detailed documentation:
- `FRONTEND_README.md` - Complete feature guide
- `README.md` - Project overview
- `DASHBOARD_SUMMARY.md` - Architecture details

## 🎉 You're Ready!

Your flood monitoring dashboard is now live. Start exploring the data and monitoring Sri Lanka's water levels in real-time!

---

**Questions?** Check the troubleshooting section or review the full documentation files.

**Last Updated:** December 11, 2025
