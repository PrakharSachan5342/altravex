
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Newspaper, TrendingUp, DollarSign } from 'lucide-react';

const MarketNews = () => {
  const [cryptoNews, setCryptoNews] = useState([]);
  const [generalNews, setGeneralNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const CRYPTOPANIC_API = '09385b3ce71483dbdfc4f9979d81e5bde07fa1ff';
  const FINNHUB_API = 'cunnkk9r01qokt72guf0cunnkk9r01qokt72gufg';

  useEffect(() => {
    fetchMarketNews();
  }, []);

  const fetchMarketNews = async () => {
    try {
      setLoading(true);

      // Fetch crypto news from CryptoPanic
      const cryptoResponse = await fetch(
        `https://cryptopanic.com/api/v1/posts/?auth_token=${CRYPTOPANIC_API}&public=true&kind=news`
      );
      const cryptoData = await cryptoResponse.json();
      setCryptoNews(cryptoData.results?.slice(0, 12) || []);

      // Fetch general financial news from Finnhub
      const generalResponse = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API}`
      );
      const generalData = await generalResponse.json();
      setGeneralNews(generalData.slice(0, 12) || []);

    } catch (error) {
      console.error('Error fetching market news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCryptoDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
          <h1 className="text-4xl font-bold text-white mb-4">Market News</h1>
          <p className="text-gray-300 text-lg">Stay updated with the latest financial market news</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
          </div>
        ) : (
          <Tabs defaultValue="crypto" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/60 border border-green-500/30">
              <TabsTrigger value="crypto" className="data-[state=active]:bg-green-600">
                Cryptocurrency News
              </TabsTrigger>
              <TabsTrigger value="general" className="data-[state=active]:bg-purple-600">
                General Market News
              </TabsTrigger>
            </TabsList>

            {/* Crypto News Tab */}
            <TabsContent value="crypto" className="mt-6">
              <Card className="bg-black/60 backdrop-blur-lg border border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                    Cryptocurrency News
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cryptoNews.map((news, index) => (
                      <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                          <Badge className="bg-green-900/30 text-green-400">
                            {news.currencies?.[0]?.code || 'CRYPTO'}
                          </Badge>
                          <span className="text-gray-400 text-xs">
                            {formatCryptoDate(news.published_at)}
                          </span>
                        </div>
                        <h3 className="text-white font-semibold mb-3 line-clamp-3 leading-tight">
                          {news.title}
                        </h3>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-green-400 text-sm font-medium">
                            {news.domain || 'News Source'}
                          </span>
                          <div className="flex items-center gap-1">
                            <Newspaper className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400 text-xs">
                              {news.kind || 'News'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* General News Tab */}
            <TabsContent value="general" className="mt-6">
              <Card className="bg-black/60 backdrop-blur-lg border border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-purple-400" />
                    General Market News
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {generalNews.map((news, index) => (
                      <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                        {news.image && (
                          <img 
                            src={news.image} 
                            alt={news.headline} 
                            className="w-full h-32 object-cover rounded-lg mb-3"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        <div className="flex items-start justify-between mb-3">
                          <Badge className="bg-purple-900/30 text-purple-400">
                            {news.category?.toUpperCase() || 'MARKET'}
                          </Badge>
                          <span className="text-gray-400 text-xs">
                            {formatDate(news.datetime)}
                          </span>
                        </div>
                        <h3 className="text-white font-semibold mb-3 line-clamp-2 leading-tight">
                          {news.headline}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                          {news.summary}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-purple-400 text-sm font-medium">
                            {news.source}
                          </span>
                          <div className="flex items-center gap-1">
                            <Newspaper className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400 text-xs">Article</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default MarketNews;
