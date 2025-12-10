'use client';

import { GaugeRecord } from '@/lib/types';
import { AlertTriangle, TrendingUp } from 'lucide-react';

interface AlertStationsProps {
    records: GaugeRecord[];
    selectedGauge: GaugeRecord | null;
    onSelectGauge: (gauge: GaugeRecord) => void;
}

export default function AlertStations({
    records,
    selectedGauge,
    onSelectGauge,
}: AlertStationsProps) {
    return (
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Alert Stations
            </h2>

            <div className="space-y-2 max-h-96 overflow-y-auto">
                {records.length > 0 ? (
                    records.slice(0, 10).map((record) => (
                        <div
                            key={record.objectid}
                            onClick={() => onSelectGauge(record)}
                            className={`p-3 rounded border transition-colors cursor-pointer ${selectedGauge?.objectid === record.objectid
                                    ? 'bg-red-900 border-red-600'
                                    : 'bg-slate-700 border-slate-600 hover:border-red-500'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <p className="font-semibold text-sm">{record.gauge}</p>
                                <TrendingUp className="w-4 h-4 text-red-400" />
                            </div>
                            <p className="text-xs text-slate-300 mb-1">{record.basin}</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-slate-400">Water Level</p>
                                    <p className="text-lg font-bold text-red-400">
                                        {record.water_level?.toFixed(2) || 'N/A'}m
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400">Rainfall</p>
                                    <p className="text-lg font-bold text-blue-400">
                                        {record.rain_fall?.toFixed(1) || 'N/A'}mm
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-slate-400 text-sm p-4 text-center">
                        <p>✓ No alert stations detected</p>
                        <p className="text-xs text-slate-500 mt-1">All stations are safe</p>
                    </div>
                )}
            </div>
        </div>
    );
}
