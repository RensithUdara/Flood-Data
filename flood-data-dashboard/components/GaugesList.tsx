'use client';

import { GaugeRecord } from '@/lib/types';
import { List } from 'lucide-react';
import { useState } from 'react';

interface GaugesListProps {
    records: GaugeRecord[];
    basins: string[];
    selectedBasin: string | null;
    onSelectBasin: (basin: string | null) => void;
    onSelectGauge: (gauge: GaugeRecord) => void;
    selectedGauge: GaugeRecord | null;
}

export default function GaugesList({
    records,
    basins,
    selectedBasin,
    onSelectBasin,
    onSelectGauge,
    selectedGauge,
}: GaugesListProps) {
    const [sortBy, setSortBy] = useState<'name' | 'level'>('name');

    const sorted = [...records].sort((a, b) => {
        if (sortBy === 'level') {
            return (b.water_level || 0) - (a.water_level || 0);
        }
        return (a.gauge || '').localeCompare(b.gauge || '');
    });

    return (
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <List className="w-5 h-5" />
                All Gauge Stations ({records.length})
            </h2>

            {/* Filters */}
            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    onClick={() => onSelectBasin(null)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${selectedBasin === null
                            ? 'bg-blue-600'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                >
                    All Basins
                </button>
                {basins.map((basin) => (
                    <button
                        key={basin}
                        onClick={() => onSelectBasin(basin)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${selectedBasin === basin
                                ? 'bg-blue-600'
                                : 'bg-slate-700 hover:bg-slate-600'
                            }`}
                    >
                        {basin}
                    </button>
                ))}
            </div>

            {/* Sort Options */}
            <div className="mb-4 flex gap-2">
                <button
                    onClick={() => setSortBy('name')}
                    className={`px-3 py-1 rounded text-sm transition-colors ${sortBy === 'name'
                            ? 'bg-blue-600'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                >
                    Sort by Name
                </button>
                <button
                    onClick={() => setSortBy('level')}
                    className={`px-3 py-1 rounded text-sm transition-colors ${sortBy === 'level'
                            ? 'bg-blue-600'
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                >
                    Sort by Level
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-700">
                            <th className="text-left p-2 font-semibold">Gauge</th>
                            <th className="text-left p-2 font-semibold">Basin</th>
                            <th className="text-right p-2 font-semibold">Water Level (m)</th>
                            <th className="text-right p-2 font-semibold">Rainfall (mm)</th>
                            <th className="text-center p-2 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((record) => (
                            <tr
                                key={record.objectid}
                                className="border-b border-slate-700 hover:bg-slate-700 transition-colors"
                            >
                                <td className="p-2 font-semibold">{record.gauge || 'N/A'}</td>
                                <td className="p-2">{record.basin || 'N/A'}</td>
                                <td className="p-2 text-right">
                                    {record.water_level !== null ? (
                                        <span
                                            className={`font-mono ${record.water_level > 4
                                                    ? 'text-red-400'
                                                    : record.water_level > 3
                                                        ? 'text-yellow-400'
                                                        : 'text-green-400'
                                                }`}
                                        >
                                            {record.water_level.toFixed(2)}
                                        </span>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td className="p-2 text-right">
                                    {record.rain_fall !== null ? (
                                        <span className="font-mono text-blue-400">
                                            {record.rain_fall.toFixed(1)}
                                        </span>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td className="p-2 text-center">
                                    <button
                                        onClick={() => onSelectGauge(record)}
                                        className={`px-2 py-1 rounded text-xs transition-colors ${selectedGauge?.objectid === record.objectid
                                                ? 'bg-blue-600'
                                                : 'bg-slate-600 hover:bg-blue-600'
                                            }`}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
