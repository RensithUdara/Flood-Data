import { Droplets } from 'lucide-react';

export default function DashboardHeader() {
    return (
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 border-b border-blue-800 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-2">
                    <Droplets className="w-8 h-8 text-blue-400" />
                    <h1 className="text-3xl font-bold">Flood Data Dashboard</h1>
                </div>
                <p className="text-slate-300">
                    Real-time water level and rainfall monitoring for Sri Lanka's river basins
                </p>
            </div>
        </div>
    );
}
