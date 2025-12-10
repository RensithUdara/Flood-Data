'use client';

import { useEffect, useState } from 'react';
import { GaugeRecord } from '@/lib/types';
import { fetchGaugeRecords } from '@/lib/api';
import DashboardHeader from '@/components/DashboardHeader';
import MapView from '@/components/MapView';
import WaterLevelChart from '@/components/WaterLevelChart';
import RainfallChart from '@/components/RainfallChart';
import AlertStations from '@/components/AlertStations';
import GaugesList from '@/components/GaugesList';
import { Loader } from 'lucide-react';

export default function Home() {
    const [records, setRecords] = useState<GaugeRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedBasin, setSelectedBasin] = useState<string | null>(null);
    const [selectedGauge, setSelectedGauge] = useState<GaugeRecord | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await fetchGaugeRecords();
                setRecords(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch data');
                console.error('Error loading gauge data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
        // Refresh every 5 minutes
        const interval = setInterval(loadData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const filteredRecords = selectedBasin
        ? records.filter((r) => r.basin === selectedBasin)
        : records;

    const basins = Array.from(
        new Set(records.map((r) => r.basin).filter(Boolean))
    ) as string[];

    const alertRecords = records.filter(
        (r) => r.water_level && r.water_level > 4.5
    );

    return (
        <main className="min-h-screen bg-slate-900 text-white">
            <DashboardHeader />

            {error && (
                <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 m-4 rounded">
                    Error: {error}
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center h-96">
                    <Loader className="w-8 h-8 animate-spin" />
                    <span className="ml-2">Loading gauge data...</span>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                        {/* Map Section */}
                        <div className="lg:col-span-2">
                            <MapView
                                records={filteredRecords}
                                selectedGauge={selectedGauge}
                                onSelectGauge={setSelectedGauge}
                            />
                        </div>

                        {/* Alert Stations */}
                        <div className="lg:col-span-1">
                            <AlertStations
                                records={alertRecords}
                                selectedGauge={selectedGauge}
                                onSelectGauge={setSelectedGauge}
                            />
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                        {selectedGauge ? (
                            <>
                                <WaterLevelChart gauge={selectedGauge} />
                                <RainfallChart gauge={selectedGauge} />
                            </>
                        ) : (
                            <>
                                <WaterLevelChart gauge={null} records={filteredRecords} />
                                <RainfallChart gauge={null} records={filteredRecords} />
                            </>
                        )}
                    </div>

                    {/* Gauges List Section */}
                    <div className="p-4">
                        <GaugesList
                            records={filteredRecords}
                            basins={basins}
                            selectedBasin={selectedBasin}
                            onSelectBasin={setSelectedBasin}
                            onSelectGauge={setSelectedGauge}
                            selectedGauge={selectedGauge}
                        />
                    </div>
                </>
            )}
        </main>
    );
}
