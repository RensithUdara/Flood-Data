# Flood-Data

**Repository**: https://github.com/RensithUdara/Flood-Data

Real-time water level and rainfall data scraper for Sri Lanka's Disaster Management Centre (DMC) flood monitoring system.

This project fetches live gauge readings from the DMC's public ArcGIS Feature Service and exports the data in both JSON and CSV formats. Data is automatically updated every 5 minutes via GitHub Actions.

## Features

- **Real-time data collection** — Fetches latest water levels and rainfall measurements from Sri Lanka's DMC gauges layer
- **Multiple output formats** — Exports data as both JSON (with metadata) and CSV (for spreadsheet/data analysis tools)
- **Automated updates** — Runs on a 5-minute schedule via GitHub Actions (configurable)
- **Fail-safe** — Prevents committing empty datasets; only commits when data is valid and changed
- **Production-ready** — Retries on network failures, normalizes timestamps to ISO 8601, includes proper error handling

## Quick Start

### Prerequisites
- Python 3.11+
- pip (Python package manager)

### Local Setup

```bash
# Clone and navigate to the project
git clone <repository-url>
cd rise-lk-flood-data

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install requests

# Run the data collection script
python scripts/update_flood_data.py

# View the results
cat data/gauges_2_view.json
head data/gauges_2_view.csv
```

### Configuration

You can override the default data source by setting environment variables:

```bash
# Custom feature layer URL
export GAUGE_FEATURE_LAYER_URL="https://services3.arcgis.com/J7ZFXmR8rSmQ3FGf/arcgis/rest/services/gauges_2_view/FeatureServer/0"

# Custom filter (SQL WHERE clause)
export GAUGE_WHERE="1=1"  # Fetch all records
# export GAUGE_WHERE="basin='Kelani Ganga'"  # Example: filter by river basin
```

## Automated Updates (GitHub Actions)

This repository includes a GitHub Actions workflow that:
- Runs every 5 minutes (configurable via cron schedule)
- Can be manually triggered via `workflow_dispatch`
- Automatically commits changes to `data/gauges_2_view.json` and `data/gauges_2_view.csv`
- Only commits when data is valid (record count > 0) and files have changed

### Configure the Workflow

Edit `.github/workflows/update_flood_data.yml` to:
1. Change the cron schedule (currently `*/5 * * * *` for every 5 minutes)
2. Set repository variables for custom data sources:
   - `GAUGE_FEATURE_LAYER_URL` — Override the default feature layer
   - `GAUGE_WHERE` — Apply custom SQL WHERE filtering

## Data Format

### JSON Output (`gauges_2_view.json`)

```json
{
  "record_count": 6051,
  "timestamp": "2025-12-10T12:32:56Z",
  "records": [
    {
      "objectid": 1,
      "basin": "Kelani Ganga",
      "gauge": "Hanwella",
      "water_level": 3.45,
      "rain_fall": 25.5,
      "CreationDate": "2025-12-10T12:00:00Z",
      "EditDate": "2025-12-10T12:30:00Z"
    }
    // ... more records
  ]
}
```

### CSV Output (`gauges_2_view.csv`)

Same data as JSON, exported in tabular format for use in Excel, data analysis tools, or databases.

## Using the Data

### TypeScript/React Example

```typescript
export type GaugeRecord = {
  objectid: number;
  basin: string | null;
  gauge: string | null;
  water_level: number | null;
  rain_fall: number | null;
  CreationDate?: string;
  EditDate?: string;
  [key: string]: unknown;
};

export async function getGaugeRecords(): Promise<GaugeRecord[]> {
  const res = await fetch(
    "https://raw.githubusercontent.com/<owner>/<repo>/main/data/gauges_2_view.json",
    { next: { revalidate: 120 } } // ISR-friendly (Next.js)
  );
  if (!res.ok) throw new Error("Failed to fetch gauge data");
  const data = await res.json();
  return data.records ?? [];
}
```

### Python Example

```python
import json
from pathlib import Path

data = json.loads(Path("data/gauges_2_view.json").read_text())
for record in data["records"]:
    print(f"{record['gauge']}: {record['water_level']}m")
```

## Data Notes

- All timestamps (e.g., `CreationDate`, `EditDate`) are normalized to ISO 8601 format
- Water levels are in meters; rainfall in millimeters
- The `basin` field indicates the river basin (e.g., "Kelani Ganga", "Kalu Ganga")
- Data is sourced directly from Sri Lanka's DMC ArcGIS Online platform
- Records are typically updated by DMC staff; update frequency depends on the source service

## License

This project is provided as-is for public use. Data is sourced from Sri Lanka's Disaster Management Centre public services.
