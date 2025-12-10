// ========================== DATA FETCHING ========================== 
let allData = [];
let chartsInstance = {
    waterLevel: null,
    rainfall: null,
    basin: null,
    status: null
};

// ========================== INIT ========================== 
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadLocalData();
});

// ========================== LOAD LOCAL DATA ========================== 
function loadLocalData() {
    const spinner = document.getElementById('loadingSpinner');
    spinner.style.display = 'flex';

    // Try to load from local file
    fetch('./data/gauges_2_view.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            allData = data.records || [];
            renderAllViews();
            spinner.style.display = 'none';
        })
        .catch(error => {
            console.warn('Cannot load local file, using sample data:', error);
            // Use sample data if local file cannot be loaded
            loadSampleData();
            spinner.style.display = 'none';
        });
}

// ========================== SAMPLE DATA ========================== 
function loadSampleData() {
    // Sample data for testing when local file is not available
    allData = [
        {
            "objectid": 1,
            "gauge": "Giriulla",
            "basin": "Maha Oya",
            "water_level": 5.8,
            "rain_fall": 12.5,
            "alertpull": 5.5,
            "minorpull": 6.5,
            "majorpull": 7.5,
            "EditDate": new Date().toISOString()
        },
        {
            "objectid": 2,
            "gauge": "Deraniyagala",
            "basin": "Kelani Ganga",
            "water_level": 3.2,
            "rain_fall": 8.3,
            "alertpull": 4.8,
            "minorpull": 5.8,
            "majorpull": 6.4,
            "EditDate": new Date().toISOString()
        },
        {
            "objectid": 3,
            "gauge": "Urawa",
            "basin": "Nilwala Ganga",
            "water_level": 3.8,
            "rain_fall": 5.2,
            "alertpull": 2.5,
            "minorpull": 4,
            "majorpull": 6,
            "EditDate": new Date().toISOString()
        },
        {
            "objectid": 4,
            "gauge": "Baddegama",
            "basin": "Gin Ganga",
            "water_level": 4.2,
            "rain_fall": 15.8,
            "alertpull": 3.5,
            "minorpull": 4,
            "majorpull": 5,
            "EditDate": new Date().toISOString()
        },
        {
            "objectid": 5,
            "gauge": "Putupaula",
            "basin": "Kalu Ganga",
            "water_level": 2.1,
            "rain_fall": 3.5,
            "alertpull": 3,
            "minorpull": 4,
            "majorpull": 5,
            "EditDate": new Date().toISOString()
        },
        {
            "objectid": 6,
            "gauge": "Pitabeddara",
            "basin": "Nilwala Ganga",
            "water_level": 4.5,
            "rain_fall": 7.2,
            "alertpull": 4,
            "minorpull": 5,
            "majorpull": 6.5,
            "EditDate": new Date().toISOString()
        },
        {
            "objectid": 7,
            "gauge": "Kantalai",
            "basin": "Maduru Oya",
            "water_level": 6.2,
            "rain_fall": 2.1,
            "alertpull": 4.5,
            "minorpull": 5.5,
            "majorpull": 6.8,
            "EditDate": new Date().toISOString()
        },
        {
            "objectid": 8,
            "gauge": "Kotmale",
            "basin": "Mahaweli Ganga",
            "water_level": 2.8,
            "rain_fall": 22.5,
            "alertpull": 3.2,
            "minorpull": 4.2,
            "majorpull": 5.5,
            "EditDate": new Date().toISOString()
        }
    ];

    renderAllViews();
}

// ========================== EVENT LISTENERS ========================== 
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.currentTarget.dataset.tab;
            switchTab(tabName);
        });
    });

    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', (e) => {
        e.preventDefault();
        loadLocalData();
    });

    // Search and filter
    document.getElementById('searchInput').addEventListener('input', filterTable);
    document.getElementById('basinFilter').addEventListener('change', filterTable);

    // Alert filters
    document.getElementById('filterAlert').addEventListener('change', renderAlerts);
    document.getElementById('filterMinor').addEventListener('change', renderAlerts);
    document.getElementById('filterMajor').addEventListener('change', renderAlerts);

    // Modal close
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('stationModal');
        if (e.target === modal) closeModal();
    });
}

// ========================== TAB SWITCHING ========================== 
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');

    // Re-render charts on overview tab
    if (tabName === 'overview') {
        setTimeout(() => {
            if (chartsInstance.waterLevel) chartsInstance.waterLevel.resize();
            if (chartsInstance.rainfall) chartsInstance.rainfall.resize();
        }, 100);
    }
}

// ========================== RENDER ALL VIEWS ========================== 
function renderAllViews() {
    renderMetrics();
    renderEnhancedStats();
    renderCharts();
    renderBasinAndStatusCharts();
    renderTopAlerts();
    renderStationMap();
    renderAlerts();
    renderStationsTable();
    populateBasinFilter();
}

// ========================== METRICS ========================== 
function renderMetrics() {
    document.getElementById('totalStations').textContent = allData.length;
    document.getElementById('lastUpdated').textContent =
        new Date().toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC'
        }) + ' UTC';

    let normalCount = 0, alertCount = 0, minorCount = 0, majorCount = 0;

    allData.forEach(station => {
        const status = getStationStatus(station);
        switch (status) {
            case 'normal': normalCount++; break;
            case 'alert': alertCount++; break;
            case 'minor': minorCount++; break;
            case 'major': majorCount++; break;
        }
    });

    document.getElementById('normalCount').textContent = normalCount;
    document.getElementById('alertCountMetric').textContent = alertCount;
    document.getElementById('minorCount').textContent = minorCount;
    document.getElementById('majorCount').textContent = majorCount;
    document.getElementById('alertCount').textContent = alertCount + minorCount + majorCount;
}

// ========================== ENHANCED STATS ========================== 
function renderEnhancedStats() {
    if (allData.length === 0) return;

    // Calculate statistics
    const waterLevels = allData.map(s => s.water_level);
    const rainfalls = allData.map(s => s.rain_fall);

    const maxWater = Math.max(...waterLevels);
    const maxRain = Math.max(...rainfalls);
    const avgWater = (waterLevels.reduce((a, b) => a + b, 0) / waterLevels.length).toFixed(2);
    const totalRain = rainfalls.reduce((a, b) => a + b, 0).toFixed(1);

    const maxWaterStation = allData.find(s => s.water_level === maxWater);
    const maxRainfallStation = allData.find(s => s.rain_fall === maxRain);

    document.getElementById('maxWaterLevel').textContent = maxWater.toFixed(2) + ' m';
    document.getElementById('maxWaterStation').textContent = maxWaterStation?.gauge || '--';
    document.getElementById('maxRainfall').textContent = maxRain.toFixed(1) + ' mm';
    document.getElementById('maxRainfallStation').textContent = maxRainfallStation?.gauge || '--';
    document.getElementById('avgWaterLevel').textContent = avgWater + ' m';
    document.getElementById('totalRainfall').textContent = totalRain + ' mm';
}

// ========================== STATUS LOGIC ========================== 
function getStationStatus(station) {
    const level = station.water_level;
    const majorThreshold = station.majorpull;
    const minorThreshold = station.minorpull;
    const alertThreshold = station.alertpull;

    if (level >= majorThreshold) return 'major';
    if (level >= minorThreshold) return 'minor';
    if (level >= alertThreshold) return 'alert';
    return 'normal';
}

// ========================== CHARTS ========================== 
function renderCharts() {
    // Sort by water level and rainfall
    const topByWater = [...allData].sort((a, b) => b.water_level - a.water_level).slice(0, 15);
    const topByRain = [...allData].sort((a, b) => b.rain_fall - a.rain_fall).slice(0, 15);

    renderWaterLevelChart(topByWater);
    renderRainfallChart(topByRain);
}

function renderWaterLevelChart(data) {
    const ctx = document.getElementById('waterLevelChart').getContext('2d');

    if (chartsInstance.waterLevel) {
        chartsInstance.waterLevel.destroy();
    }

    const chartData = {
        labels: data.map(d => d.gauge),
        datasets: [{
            label: 'Water Level (m)',
            data: data.map(d => d.water_level),
            backgroundColor: data.map(d => {
                const status = getStationStatus(d);
                switch (status) {
                    case 'normal': return '#10b981';
                    case 'alert': return '#f59e0b';
                    case 'minor': return '#f97316';
                    case 'major': return '#ef4444';
                }
            }),
            borderRadius: 4,
            borderSkipped: false
        }]
    };

    chartsInstance.waterLevel = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#6b7280'
                    },
                    grid: {
                        color: '#e5e7eb'
                    }
                },
                x: {
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function renderRainfallChart(data) {
    const ctx = document.getElementById('rainfallChart').getContext('2d');

    if (chartsInstance.rainfall) {
        chartsInstance.rainfall.destroy();
    }

    const chartData = {
        labels: data.map(d => d.gauge),
        datasets: [{
            label: 'Rainfall (mm)',
            data: data.map(d => d.rain_fall),
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointBackgroundColor: '#06b6d4',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };

    chartsInstance.rainfall = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#6b7280'
                    },
                    grid: {
                        color: '#e5e7eb'
                    }
                },
                x: {
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ========================== BASIN AND STATUS CHARTS ========================== 
function renderBasinAndStatusCharts() {
    renderBasinChart();
    renderStatusChart();
}

function renderBasinChart() {
    // Count stations by basin
    const basinCounts = {};
    allData.forEach(station => {
        basinCounts[station.basin] = (basinCounts[station.basin] || 0) + 1;
    });

    const basins = Object.keys(basinCounts).sort();
    const counts = basins.map(b => basinCounts[b]);

    const ctx = document.getElementById('basinChart').getContext('2d');

    if (chartsInstance.basin) {
        chartsInstance.basin.destroy();
    }

    const colors = [
        '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444',
        '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4'
    ];

    chartsInstance.basin = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: basins,
            datasets: [{
                data: counts,
                backgroundColor: colors.slice(0, basins.length),
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#6b7280',
                        font: {
                            size: 12
                        },
                        padding: 15
                    }
                }
            }
        }
    });
}

function renderStatusChart() {
    // Count stations by status
    let normalCount = 0, alertCount = 0, minorCount = 0, majorCount = 0;

    allData.forEach(station => {
        const status = getStationStatus(station);
        switch(status) {
            case 'normal': normalCount++; break;
            case 'alert': alertCount++; break;
            case 'minor': minorCount++; break;
            case 'major': majorCount++; break;
        }
    });

    const ctx = document.getElementById('statusChart').getContext('2d');

    if (chartsInstance.status) {
        chartsInstance.status.destroy();
    }

    chartsInstance.status = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Normal', 'Alert', 'Minor Flood', 'Major Flood'],
            datasets: [{
                data: [normalCount, alertCount, minorCount, majorCount],
                backgroundColor: ['#10b981', '#f59e0b', '#f97316', '#ef4444'],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#6b7280',
                        font: {
                            size: 12
                        },
                        padding: 15
                    }
                }
            }
        }
    });
} 
function renderTopAlerts() {
    const alertStations = allData
        .filter(s => getStationStatus(s) !== 'normal')
        .sort((a, b) => b.water_level - a.water_level)
        .slice(0, 6);

    const container = document.getElementById('topAlerts');

    if (alertStations.length === 0) {
        container.innerHTML = '<p class="loading">No alerts at this time</p>';
        return;
    }

    container.innerHTML = alertStations.map(station => {
        const status = getStationStatus(station);
        const threshold = getThreshold(station, status);
        const exceedance = (station.water_level - threshold).toFixed(2);

        return `
            <div class="alert-item ${status}">
                <div class="alert-item-header">
                    <span class="alert-item-name">${station.gauge}</span>
                    <span class="alert-badge ${status}">${status}</span>
                </div>
                <div class="alert-item-info">${station.basin}</div>
                <div class="alert-item-stats">
                    <div class="stat-box">
                        <span class="stat-box-label">Water Level</span>
                        <span class="stat-box-value">${station.water_level.toFixed(2)} m</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-box-label">Exceeds by</span>
                        <span class="stat-box-value">+${exceedance} m</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function getThreshold(station, status) {
    switch (status) {
        case 'major': return station.majorpull;
        case 'minor': return station.minorpull;
        case 'alert': return station.alertpull;
        default: return 0;
    }
}

// ========================== STATION MAP ========================== 
function renderStationMap() {
    const topStations = [...allData]
        .sort((a, b) => b.water_level - a.water_level)
        .slice(0, 12);

    const container = document.getElementById('stationMap');

    container.innerHTML = topStations.map(station => {
        const status = getStationStatus(station);
        return `
            <div class="station-card ${status}" onclick="showStationModal('${station.gauge}')">
                <div class="station-card-header">
                    <div class="station-name">${station.gauge}</div>
                    <div class="station-basin">${station.basin}</div>
                </div>
                <div class="station-card-stats">
                    <div class="station-stat">
                        <span class="station-stat-label">Water Level</span>
                        <span class="station-stat-value">${station.water_level.toFixed(2)}m</span>
                    </div>
                    <div class="station-stat">
                        <span class="station-stat-label">Rainfall</span>
                        <span class="station-stat-value">${station.rain_fall.toFixed(1)}mm</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ========================== ALERTS SECTION ========================== 
function renderAlerts() {
    const showAlert = document.getElementById('filterAlert').checked;
    const showMinor = document.getElementById('filterMinor').checked;
    const showMajor = document.getElementById('filterMajor').checked;

    const alertStations = allData.filter(station => {
        const status = getStationStatus(station);
        if (status === 'normal') return false;
        if (status === 'alert' && !showAlert) return false;
        if (status === 'minor' && !showMinor) return false;
        if (status === 'major' && !showMajor) return false;
        return true;
    }).sort((a, b) => b.water_level - a.water_level);

    const container = document.getElementById('alertsList');

    if (alertStations.length === 0) {
        container.innerHTML = '<p class="loading">No matching alerts</p>';
        return;
    }

    container.innerHTML = alertStations.map(station => {
        const status = getStationStatus(station);
        return `
            <div class="alert-item ${status}">
                <div class="alert-item-header">
                    <span class="alert-item-name">${station.gauge}</span>
                    <span class="alert-badge ${status}">${status.toUpperCase()}</span>
                </div>
                <div class="alert-item-info">
                    <strong>Basin:</strong> ${station.basin}
                </div>
                <div class="alert-item-stats">
                    <div class="stat-box">
                        <span class="stat-box-label">Water Level</span>
                        <span class="stat-box-value">${station.water_level.toFixed(2)} m</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-box-label">Rainfall</span>
                        <span class="stat-box-value">${station.rain_fall.toFixed(1)} mm</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-box-label">Alert Level</span>
                        <span class="stat-box-value">${station.alertpull} m</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-box-label">Major Level</span>
                        <span class="stat-box-value">${station.majorpull} m</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ========================== STATIONS TABLE ========================== 
function renderStationsTable() {
    const container = document.getElementById('stationsTable');

    if (allData.length === 0) {
        container.innerHTML = '<p class="loading">No data available</p>';
        return;
    }

    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Station</th>
                    <th>Basin</th>
                    <th>Water Level (m)</th>
                    <th>Alert Level (m)</th>
                    <th>Rainfall (mm)</th>
                    <th>Status</th>
                    <th>Updated</th>
                </tr>
            </thead>
            <tbody>
                ${allData.map(station => {
        const status = getStationStatus(station);
        const updated = new Date(station.EditDate).toLocaleTimeString();
        return `
                        <tr>
                            <td><strong>${station.gauge}</strong></td>
                            <td>${station.basin}</td>
                            <td>${station.water_level.toFixed(2)}</td>
                            <td>${station.alertpull}</td>
                            <td>${station.rain_fall.toFixed(1)}</td>
                            <td><span class="status-badge ${status}">${status}</span></td>
                            <td>${updated}</td>
                        </tr>
                    `;
    }).join('')}
            </tbody>
        </table>
    `;
}

function filterTable() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const basinFilter = document.getElementById('basinFilter').value;

    let filtered = allData.filter(station => {
        const matchesSearch = station.gauge.toLowerCase().includes(searchTerm) ||
            station.basin.toLowerCase().includes(searchTerm);
        const matchesBasin = !basinFilter || station.basin === basinFilter;
        return matchesSearch && matchesBasin;
    });

    const container = document.getElementById('stationsTable');

    if (filtered.length === 0) {
        container.innerHTML = '<p class="loading">No stations match your filters</p>';
        return;
    }

    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Station</th>
                    <th>Basin</th>
                    <th>Water Level (m)</th>
                    <th>Alert Level (m)</th>
                    <th>Rainfall (mm)</th>
                    <th>Status</th>
                    <th>Updated</th>
                </tr>
            </thead>
            <tbody>
                ${filtered.map(station => {
        const status = getStationStatus(station);
        const updated = new Date(station.EditDate).toLocaleTimeString();
        return `
                        <tr>
                            <td><strong>${station.gauge}</strong></td>
                            <td>${station.basin}</td>
                            <td>${station.water_level.toFixed(2)}</td>
                            <td>${station.alertpull}</td>
                            <td>${station.rain_fall.toFixed(1)}</td>
                            <td><span class="status-badge ${status}">${status}</span></td>
                            <td>${updated}</td>
                        </tr>
                    `;
    }).join('')}
            </tbody>
        </table>
    `;
}

function populateBasinFilter() {
    const basins = [...new Set(allData.map(s => s.basin))].sort();
    const select = document.getElementById('basinFilter');

    select.innerHTML = '<option value="">All Basins</option>';
    basins.forEach(basin => {
        const option = document.createElement('option');
        option.value = basin;
        option.textContent = basin;
        select.appendChild(option);
    });
}

// ========================== MODAL ========================== 
function showStationModal(gaugeName) {
    const station = allData.find(s => s.gauge === gaugeName);
    if (!station) return;

    const status = getStationStatus(station);
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <h2>${station.gauge}</h2>
        <div class="modal-item">
            <span class="modal-label">Basin</span>
            <span class="modal-value">${station.basin}</span>
        </div>
        <div class="modal-item">
            <span class="modal-label">Status</span>
            <span class="modal-value">
                <span class="status-badge ${status}">${status}</span>
            </span>
        </div>
        <div class="modal-item">
            <span class="modal-label">Water Level</span>
            <span class="modal-value">${station.water_level.toFixed(2)} m</span>
        </div>
        <div class="modal-item">
            <span class="modal-label">Alert Threshold</span>
            <span class="modal-value">${station.alertpull} m</span>
        </div>
        <div class="modal-item">
            <span class="modal-label">Minor Flood Threshold</span>
            <span class="modal-value">${station.minorpull} m</span>
        </div>
        <div class="modal-item">
            <span class="modal-label">Major Flood Threshold</span>
            <span class="modal-value">${station.majorpull} m</span>
        </div>
        <div class="modal-item">
            <span class="modal-label">Rainfall</span>
            <span class="modal-value">${station.rain_fall.toFixed(1)} mm</span>
        </div>
        <div class="modal-item">
            <span class="modal-label">Last Updated</span>
            <span class="modal-value">${new Date(station.EditDate).toLocaleString()}</span>
        </div>
    `;

    document.getElementById('stationModal').classList.add('show');
}

function closeModal() {
    document.getElementById('stationModal').classList.remove('show');
}
