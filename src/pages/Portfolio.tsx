
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

const Portfolio = () => {
  const [performanceData] = useState([
    { date: '2024-01-01', value: 1000000 },
    { date: '2024-01-02', value: 1005000 },
    { date: '2024-01-03', value: 998000 },
    { date: '2024-01-04', value: 1012000 },
    { date: '2024-01-05', value: 1018000 },
    { date: '2024-01-06', value: 1025000 },
    { date: '2024-01-07', value: 1022000 },
  ]);

  const [monthlyPnL] = useState([
    { month: 'Jan', profit: 25000, loss: -5000 },
    { month: 'Feb', profit: 18000, loss: -8000 },
    { month: 'Mar', profit: 32000, loss: -12000 },
    { month: 'Apr', profit: 28000, loss: -7000 },
  ]);

  const [closedTrades] = useState([
    { id: 1, symbol: 'EURUSD', type: 'BUY', pnl: 1250, closeTime: '2024-01-07 14:30' },
    { id: 2, symbol: 'GBPUSD', type: 'SELL', pnl: -850, closeTime: '2024-01-07 13:15' },
    { id: 3, symbol: 'BTCUSD', type: 'BUY', pnl: 2100, closeTime: '2024-01-07 12:45' },
  ]);

  const totalPortfolio = 1025000;
  const totalPnL = 25000;
  const dailyPnL = 3000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Portfolio Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Portfolio Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-black/60 backdrop-blur-lg rounded-lg p-4 border border-green-500/30">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-green-400 text-sm">Total Portfolio</h3>
              <p className="text-white text-2xl font-bold">₹{totalPortfolio.toLocaleString()}</p>
            </div>
            <div className="bg-black/60 backdrop-blur-lg rounded-lg p-4 border border-blue-500/30">
              <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="text-blue-400 text-sm">Total P&L</h3>
              <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ₹{totalPnL.toLocaleString()}
              </p>
            </div>
            <div className="bg-black/60 backdrop-blur-lg rounded-lg p-4 border border-purple-500/30">
              <Activity className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="text-purple-400 text-sm">Daily P&L</h3>
              <p className={`text-2xl font-bold ${dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ₹{dailyPnL.toLocaleString()}
              </p>
            </div>
            <div className="bg-black/60 backdrop-blur-lg rounded-lg p-4 border border-yellow-500/30">
              <TrendingDown className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="text-yellow-400 text-sm">ROI</h3>
              <p className="text-white text-2xl font-bold">+2.5%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Chart */}
          <Card className="bg-black/60 backdrop-blur-lg border border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white">Performance Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #10B981',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly P&L Chart */}
          <Card className="bg-black/60 backdrop-blur-lg border border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Monthly P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyPnL}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #8B5CF6',
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Bar dataKey="profit" fill="#10B981" />
                  <Bar dataKey="loss" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Closed Trades Today */}
        <Card className="bg-black/60 backdrop-blur-lg border border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white">Closed Trades Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {closedTrades.map((trade) => (
                <div key={trade.id} className="flex justify-between items-center p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-white font-semibold">{trade.symbol}</h3>
                      <p className="text-gray-400 text-sm">{trade.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Closed at</p>
                      <p className="text-white text-sm">{trade.closeTime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.pnl >= 0 ? '+' : ''}₹{trade.pnl.toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-sm">P&L</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
