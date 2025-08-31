
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle, BarChart } from 'lucide-react';

const MarketInsights = () => {
  const [cryptoSentiment, setCryptoSentiment] = useState([]);
  const [marketNews, setMarketNews] = useState([]);
  const [economicData, setEconomicData] = useState([]);
  const [loading, setLoading] = useState(true);

  const CRYPTOPANIC_API = '09385b3ce71483dbdfc4f9979d81e5bde07fa1ff';
  const FINNHUB_API = 'cunnkk9r01qokt72guf0cunnkk9r01qokt72gufg';

  useEffect(() => {
    fetchMarketInsights();
  }, []);

  const fetchMarketInsights = async () => {
    try {
      setLoading(true);

      // Fetch crypto sentiment from CryptoPanic
      const cryptoResponse = await fetch(
        `https://cryptopanic.com/api/v1/posts/?auth_token=${CRYPTOPANIC_API}&public=true&kind=news&filter=hot`
      );
      const cryptoData = await cryptoResponse.json();
      setCryptoSentiment(cryptoData.results?.slice(0, 10) || []);

      // Fetch market news from Finnhub
      const newsResponse = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API}`
      );
      const newsData = await newsResponse.json();
      setMarketNews(newsData.slice(0, 8) || []);

      // Mock economic data (replace with actual API call)
      setEconomicData([
        { indicator: 'GDP Growth', value: '2.4%', change: '+0.2%', status: 'positive' },
        { indicator: 'Inflation Rate', value: '3.2%', change: '-0.1%', status: 'negative' },
        { indicator: 'Unemployment', value: '4.1%', change: '+0.3%', status: 'negative' },
        { indicator: 'Interest Rate', value: '5.25%', change: '0.0%', status: 'neutral' },
      ]);

    } catch (error) {
      console.error('Error fetching market insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Market Insights</h1>
          <p className="text-gray-300 text-lg">Real-time market analysis and sentiment data</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Crypto Sentiment Analysis */}
            <Card className="bg-black/60 backdrop-blur-lg border border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  Cryptocurrency Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cryptoSentiment.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                      <h3 className="text-white font-semibold mb-2 line-clamp-2">{item.title}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="secondary" className="bg-green-900/30 text-green-400">
                          {item.currencies?.[0]?.code || 'CRYPTO'}
                        </Badge>
                        <span className="text-gray-400 text-sm">
                          {new Date(item.published_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-3">{item.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Economic Indicators */}
            <Card className="bg-black/60 backdrop-blur-lg border border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart className="h-6 w-6 text-purple-400" />
                  Economic Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {economicData.map((indicator, index) => (
                    <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                      <h3 className="text-white font-semibold mb-2">{indicator.indicator}</h3>
                      <p className="text-2xl font-bold text-purple-400 mb-1">{indicator.value}</p>
                      <p className={`text-sm ${getSentimentColor(indicator.status)}`}>
                        {indicator.change}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market News */}
            <Card className="bg-black/60 backdrop-blur-lg border border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-blue-400" />
                  Latest Market News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {marketNews.map((news, index) => (
                    <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                      {news.image && (
                        <img 
                          src={news.image} 
                          alt={news.headline} 
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      )}
                      <h3 className="text-white font-semibold mb-2 line-clamp-2">{news.headline}</h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-3">{news.summary}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-400 text-sm">{news.source}</span>
                        <span className="text-gray-400 text-sm">
                          {new Date(news.datetime * 1000).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technical Indicators */}
            <Card className="bg-black/60 backdrop-blur-lg border border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingDown className="h-6 w-6 text-yellow-400" />
                  Technical Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                    <h3 className="text-white font-semibold mb-2">Market Trend</h3>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      <span className="text-green-400 font-medium">Bullish</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">Overall market showing upward momentum</p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                    <h3 className="text-white font-semibold mb-2">Volatility Index</h3>
                    <p className="text-2xl font-bold text-yellow-400">23.5</p>
                    <p className="text-gray-400 text-sm mt-2">Moderate volatility expected</p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                    <h3 className="text-white font-semibold mb-2">Market Sentiment</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 font-medium">Optimistic</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">62% bullish sentiment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketInsights;
