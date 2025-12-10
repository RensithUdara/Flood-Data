'use client';

import { GaugeRecord } from '@/lib/types';
import { AlertCircle } from 'lucide-react';

interface MapViewProps {
    records: GaugeRecord[];
    selectedGauge: GaugeRecord | null;
    onSelectGauge: (gauge: GaugeRecord) => void;
}

export default function MapView({
    records,
    selectedGauge,
    onSelectGauge,
}: MapViewProps) {
    // Simple text-based map showing gauge locations
    const basins = Array.from(new Set(records.map((r) => r.basin)));

    return (
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Gauge Stations Map
            </h2>

            <div className="bg-slate-900 rounded p-4 mb-4 min-h-96 border border-slate-700">
                <div className="text-slate-400 mb-4">
                    <p className="text-sm">Total Stations: {records.length}</p>
                    <p className="text-sm">River Basins: {basins.length}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {records.slice(0, 8).map((record) => (
                        <div
                            key={record.objectid}
                            onClick={() => onSelectGauge(record)}
                            className={`p-2 rounded cursor-pointer transition-colors ${selectedGauge?.objectid === record.objectid
                                    ? 'bg-blue-600'
                                    : 'bg-slate-700 hover:bg-slate-600'
                                }`}
                        >
                            <p className="font-semibold text-sm">{record.gauge}</p>
                            <p className="text-xs text-slate-300">{record.basin}</p>
                            {record.water_level !== null && (
                                <p className="text-xs font-mono text-blue-300">
                                    {record.water_level.toFixed(2)}m
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {records.length > 8 && (
                    <p className="text-xs text-slate-400 mt-2">
                        +{records.length - 8} more stations
                    </p>
                )}
            </div>

            <p className="text-xs text-slate-400">
                💡 Tip: Click on stations below to see detailed charts
            </p>
        </div>
    );
}
