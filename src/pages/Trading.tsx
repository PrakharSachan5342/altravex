
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Activity, X } from 'lucide-react';

const Trading = () => {
  const [balance, setBalance] = useState(1000000); // 10 lakh virtual money
  const [activeTrades, setActiveTrades] = useState([]);
  const [dailyPnL, setDailyPnL] = useState(0);
  const [monthlyPnL, setMonthlyPnL] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [tradeType, setTradeType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [showTradeModal, setShowTradeModal] = useState(false);

  const symbols = [
    { symbol: 'EURUSD', price: 1.0850, change: 0.0025 },
    { symbol: 'GBPUSD', price: 1.2650, change: -0.0015 },
    { symbol: 'USDJPY', price: 148.50, change: 0.25 },
    { symbol: 'BTCUSD', price: 43250.00, change: 125.00 },
    { symbol: 'ETHUSD', price: 2650.00, change: -45.00 },
  ];

  const openTrade = () => {
    if (!selectedSymbol || !quantity || !tradeType) return;

    const newTrade = {
      id: Date.now(),
      symbol: selectedSymbol.symbol,
      type: tradeType,
      quantity: parseFloat(quantity),
      openPrice: selectedSymbol.price,
      currentPrice: selectedSymbol.price,
      stopLoss: stopLoss ? parseFloat(stopLoss) : null,
      takeProfit: takeProfit ? parseFloat(takeProfit) : null,
      pnl: 0,
      timestamp: new Date().toLocaleString(),
    };

    setActiveTrades([...activeTrades, newTrade]);
    setShowTradeModal(false);
    setQuantity('');
    setStopLoss('');
    setTakeProfit('');
  };

  const closeTrade = (tradeId) => {
    setActiveTrades(activeTrades.filter(trade => trade.id !== tradeId));
  };

  const calculatePnL = (trade) => {
    const priceDiff = trade.type === 'BUY' 
      ? trade.currentPrice - trade.openPrice 
      : trade.openPrice - trade.currentPrice;
    return priceDiff * trade.quantity;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Trading Dashboard Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Virtual Trading</h1>
          <div className="flex justify-center space-x-8">
            <div className="bg-black/60 backdrop-blur-lg rounded-lg p-4 border border-green-500/30">
              <h3 className="text-green-400 text-sm">Account Balance</h3>
              <p className="text-white text-2xl font-bold">₹{balance.toLocaleString()}</p>
            </div>
            <div className="bg-black/60 backdrop-blur-lg rounded-lg p-4 border border-blue-500/30">
              <h3 className="text-blue-400 text-sm">Daily P&L</h3>
              <p className={`text-2xl font-bold ${dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ₹{dailyPnL.toLocaleString()}
              </p>
            </div>
            <div className="bg-black/60 backdrop-blur-lg rounded-lg p-4 border border-purple-500/30">
              <h3 className="text-purple-400 text-sm">Monthly P&L</h3>
              <p className={`text-2xl font-bold ${monthlyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ₹{monthlyPnL.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Market Symbols */}
          <Card className="bg-black/60 backdrop-blur-lg border border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white">Market Symbols</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {symbols.map((symbol) => (
                  <div key={symbol.symbol} className="flex justify-between items-center p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                    <div>
                      <h3 className="text-white font-semibold">{symbol.symbol}</h3>
                      <p className="text-gray-400 text-sm">{symbol.price}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          setSelectedSymbol(symbol);
                          setTradeType('BUY');
                          setShowTradeModal(true);
                        }}
                      >
                        BUY
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedSymbol(symbol);
                          setTradeType('SELL');
                          setShowTradeModal(true);
                        }}
                      >
                        SELL
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Trades */}
          <Card className="bg-black/60 backdrop-blur-lg border border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Active Trades</CardTitle>
            </CardHeader>
            <CardContent>
              {activeTrades.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No active trades</p>
              ) : (
                <div className="space-y-4">
                  {activeTrades.map((trade) => {
                    const pnl = calculatePnL(trade);
                    return (
                      <div key={trade.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-white font-semibold">{trade.symbol}</h3>
                            <Badge variant={trade.type === 'BUY' ? 'default' : 'destructive'}>
                              {trade.type}
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => closeTrade(trade.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-400">Quantity:</span>
                            <span className="text-white ml-2">{trade.quantity}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Open Price:</span>
                            <span className="text-white ml-2">{trade.openPrice}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">P&L:</span>
                            <span className={`ml-2 font-bold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              ₹{pnl.toFixed(2)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Time:</span>
                            <span className="text-white ml-2 text-xs">{trade.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Trade Modal */}
        {showTradeModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-green-500/30">
              <h3 className="text-white text-xl font-bold mb-4">
                {tradeType} {selectedSymbol?.symbol}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Quantity (Lots)</label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="bg-black/60 border-gray-700 text-white"
                    placeholder="Enter quantity"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Stop Loss (Optional)</label>
                  <Input
                    type="number"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="bg-black/60 border-gray-700 text-white"
                    placeholder="Enter stop loss price"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Take Profit (Optional)</label>
                  <Input
                    type="number"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    className="bg-black/60 border-gray-700 text-white"
                    placeholder="Enter take profit price"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={openTrade} className="flex-1 bg-green-600 hover:bg-green-700">
                    Open Trade
                  </Button>
                  <Button onClick={() => setShowTradeModal(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trading;
