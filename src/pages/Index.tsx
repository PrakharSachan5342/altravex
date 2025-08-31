
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [marketData, setMarketData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'cunnkk9r01qokt72guf0cunnkk9r01qokt72gufg';

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      
      // Fetch forex data
      const forexPairs = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF'];
      const forexPromises = forexPairs.map(pair =>
        fetch(`https://finnhub.io/api/v1/quote?symbol=OANDA:${pair}&token=${API_KEY}`)
          .then(res => res.json())
          .then(data => ({ symbol: pair, ...data }))
      );

      // Fetch crypto data
      const cryptoPairs = ['BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'DOTUSDT', 'LINKUSDT'];
      const cryptoPromises = cryptoPairs.map(pair =>
        fetch(`https://finnhub.io/api/v1/quote?symbol=BINANCE:${pair}&token=${API_KEY}`)
          .then(res => res.json())
          .then(data => ({ symbol: pair.replace('USDT', '/USDT'), ...data }))
      );

      const [forexResults, cryptoResults] = await Promise.all([
        Promise.all(forexPromises),
        Promise.all(cryptoPromises)
      ]);

      setMarketData(forexResults);
      setCryptoData(cryptoResults);

      // Simulate top gainers/losers (in real app, use proper API endpoint)
      const allData = [...forexResults, ...cryptoResults];
      const sorted = allData.filter(item => item.dp !== undefined).sort((a, b) => b.dp - a.dp);
      setTopGainers(sorted.slice(0, 5));
      setTopLosers(sorted.slice(-5).reverse());

    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price ? price.toFixed(5) : '0.00000';
  };

  const formatChange = (change, changePercent) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change?.toFixed(5)} (${sign}${changePercent?.toFixed(2)}%)`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">
            Altravex.ai
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Advanced Virtual Trading Platform
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div className="bg-black/40 backdrop-blur-lg rounded-lg p-4 border border-green-500/30">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Live Prices</h3>
              <p className="text-gray-400 text-sm">Real-time market data</p>
            </div>
            <div className="bg-black/40 backdrop-blur-lg rounded-lg p-4 border border-purple-500/30">
              <Activity className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Virtual Trading</h3>
              <p className="text-gray-400 text-sm">₹10 Lakh virtual money</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Forex Pairs */}
            <Card className="bg-black/60 backdrop-blur-lg border border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Currency Pairs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketData.map((pair) => (
                    <div key={pair.symbol} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                      <h3 className="text-white font-semibold text-lg">{pair.symbol}</h3>
                      <p className="text-2xl font-bold text-green-400">{formatPrice(pair.c)}</p>
                      <p className={`text-sm ${pair.dp >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatChange(pair.d, pair.dp)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cryptocurrency */}
            <Card className="bg-black/60 backdrop-blur-lg border border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Cryptocurrency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cryptoData.map((crypto) => (
                    <div key={crypto.symbol} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                      <h3 className="text-white font-semibold text-lg">{crypto.symbol}</h3>
                      <p className="text-2xl font-bold text-purple-400">${formatPrice(crypto.c)}</p>
                      <p className={`text-sm ${crypto.dp >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatChange(crypto.d, crypto.dp)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Gainers & Losers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-black/60 backdrop-blur-lg border border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                    Top Gainers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topGainers.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                        <span className="text-white font-medium">{item.symbol}</span>
                        <span className="text-green-400 font-bold">+{item.dp?.toFixed(2)}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/60 backdrop-blur-lg border border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingDown className="h-6 w-6 text-red-400" />
                    Top Losers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topLosers.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-red-900/20 rounded-lg border border-red-500/20">
                        <span className="text-white font-medium">{item.symbol}</span>
                        <span className="text-red-400 font-bold">{item.dp?.toFixed(2)}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
