
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Award, TrendingUp, Users, Crown } from 'lucide-react';

const Leaderboard = () => {
  const [dailyLeaders] = useState([
    {
      rank: 1,
      name: 'TradeKing007',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      pnl: 25750,
      trades: 23,
      winRate: 87.5,
      totalReturn: 2.58
    },
    {
      rank: 2,
      name: 'ForexMaster',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      pnl: 18900,
      trades: 19,
      winRate: 82.1,
      totalReturn: 1.89
    },
    {
      rank: 3,
      name: 'CryptoNinja',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      pnl: 16420,
      trades: 31,
      winRate: 75.8,
      totalReturn: 1.64
    },
    {
      rank: 4,
      name: 'BullishTrader',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c9d5?w=100&h=100&fit=crop&crop=face',
      pnl: 14250,
      trades: 17,
      winRate: 88.2,
      totalReturn: 1.43
    },
    {
      rank: 5,
      name: 'MarketWizard',
      avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&crop=face',
      pnl: 12850,
      trades: 25,
      winRate: 76.0,
      totalReturn: 1.29
    },
    {
      rank: 6,
      name: 'PipHunter',
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop&crop=face',
      pnl: 11900,
      trades: 28,
      winRate: 71.4,
      totalReturn: 1.19
    },
    {
      rank: 7,
      name: 'GoldRush',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face',
      pnl: 10500,
      trades: 22,
      winRate: 77.3,
      totalReturn: 1.05
    },
    {
      rank: 8,
      name: 'SwingTrader',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
      pnl: 9750,
      trades: 15,
      winRate: 86.7,
      totalReturn: 0.98
    }
  ]);

  const [weeklyLeaders] = useState([
    {
      rank: 1,
      name: 'ForexMaster',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      pnl: 89500,
      trades: 87,
      winRate: 81.6,
      totalReturn: 8.95
    },
    {
      rank: 2,
      name: 'TradeKing007',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      pnl: 82300,
      trades: 94,
      winRate: 78.7,
      totalReturn: 8.23
    },
    {
      rank: 3,
      name: 'MarketWizard',
      avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&crop=face',
      pnl: 75600,
      trades: 102,
      winRate: 74.5,
      totalReturn: 7.56
    }
  ]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-300" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-400" />;
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'border-yellow-500/50 bg-yellow-900/20';
      case 2:
        return 'border-gray-400/50 bg-gray-900/20';
      case 3:
        return 'border-orange-500/50 bg-orange-900/20';
      default:
        return 'border-gray-700/50 bg-gray-900/50';
    }
  };

  const LeaderboardTable = ({ leaders, title }) => (
    <Card className="bg-black/60 backdrop-blur-lg border border-green-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="h-6 w-6 text-green-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaders.map((trader) => (
            <div
              key={trader.rank}
              className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${getRankColor(trader.rank)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12">
                    {getRankIcon(trader.rank)}
                  </div>
                  <img
                    src={trader.avatar}
                    alt={trader.name}
                    className="w-12 h-12 rounded-full border-2 border-green-400/50"
                  />
                  <div>
                    <h3 className="text-white font-semibold text-lg">{trader.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-900/30 text-blue-400">
                        {trader.trades} trades
                      </Badge>
                      <Badge className="bg-green-900/30 text-green-400">
                        {trader.winRate}% win rate
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">
                    +₹{trader.pnl.toLocaleString()}
                  </p>
                  <p className="text-green-300 text-sm">
                    +{trader.totalReturn}% return
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

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
          <h1 className="text-4xl font-bold text-white mb-4">Leaderboard</h1>
          <p className="text-gray-300 text-lg">Top performing virtual traders</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/60 backdrop-blur-lg border border-green-500/30">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Active Traders</h3>
              <p className="text-2xl font-bold text-green-400">106</p>
            </CardContent>
          </Card>
          <Card className="bg-black/60 backdrop-blur-lg border border-purple-500/30">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Total Trades</h3>
              <p className="text-2xl font-bold text-purple-400">764</p>
            </CardContent>
          </Card>
          <Card className="bg-black/60 backdrop-blur-lg border border-blue-500/30">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Top P&L Today</h3>
              <p className="text-2xl font-bold text-blue-400">₹25,750</p>
            </CardContent>
          </Card>
          <Card className="bg-black/60 backdrop-blur-lg border border-yellow-500/30">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Average Win Rate</h3>
              <p className="text-2xl font-bold text-yellow-400">76.8%</p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/60 border border-green-500/30">
            <TabsTrigger value="daily" className="data-[state=active]:bg-green-600">
              Daily Winners
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-purple-600">
              Weekly Winners
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="mt-6">
            <LeaderboardTable leaders={dailyLeaders} title="Today's Top Traders" />
          </TabsContent>

          <TabsContent value="weekly" className="mt-6">
            <LeaderboardTable leaders={weeklyLeaders} title="This Week's Champions" />
          </TabsContent>
        </Tabs>

        {/* Competition Info */}
        <Card className="bg-black/60 backdrop-blur-lg border border-green-500/30 mt-8">
          <CardHeader>
            <CardTitle className="text-white text-center">How Rankings Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Daily P&L</h4>
                <p className="text-gray-300 text-sm">
                  Rankings based on daily profit & loss performance in virtual trading
                </p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Win Rate</h4>
                <p className="text-gray-300 text-sm">
                  Consistency matters - higher win rates boost your ranking position
                </p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <Award className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Total Return</h4>
                <p className="text-gray-300 text-sm">
                  Percentage return on your virtual capital over the trading period
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
