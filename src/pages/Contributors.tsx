import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Eye, Calendar, Award, Linkedin, Github, Mail } from 'lucide-react';
import linkP from '../link_p.jpg'; // ✅ Correct path

const Contributors = () => {
  const [visitorCount, setVisitorCount] = useState(12847);

  useEffect(() => {
    // Simulate visitor count updates
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const contributors = [
    {
      id: 1,
      name: 'Prakhar Sachan',
      role: 'Full Stack Developer',
      avatar: linkP,
      bio: 'Passionate about creating innovative trading solutions and financial technologies. Specialized in React, Node.js, and algorithmic trading systems.',
      linkedin: 'https://www.linkedin.com/in/prakhar-sachan-817500219/',
      github: 'https://github.com/PrakharSachan5342',
    },
  ];

  const achievements = [
    { title: 'Platform Users', count: '1,000+', icon: Users, color: 'text-green-400' },
    { title: 'Trades Executed', count: '600+', icon: Award, color: 'text-purple-400' },
    { title: 'API Calls Daily', count: '1M+', icon: Eye, color: 'text-blue-400' },
    { title: 'Uptime', count: '99.9%', icon: Calendar, color: 'text-yellow-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Our Contributors</h1>
          {/* Visitor Counter */}
          <Card className="bg-black/60 backdrop-blur-lg border border-green-500/30 inline-block">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-green-400 text-sm">Total Visitors</p>
                  <p className="text-white text-2xl font-bold">
                    {visitorCount.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="bg-black/60 backdrop-blur-lg border border-gray-700/50 hover:border-green-500/50 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <achievement.icon
                  className={`h-8 w-8 mx-auto mb-3 ${achievement.color}`}
                />
                <h3 className="text-white font-semibold mb-1">{achievement.title}</h3>
                <p className={`text-2xl font-bold ${achievement.color}`}>
                  {achievement.count}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contributors - Centered */}
        <div className="flex justify-center mb-12">
          {contributors.map((contributor) => (
            <Card
              key={contributor.id}
              className="w-full max-w-xl bg-black/60 backdrop-blur-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="w-16 h-16 rounded-full border-2 border-purple-400/50"
                  />
                  <div>
                    <h3 className="text-white text-xl font-bold">{contributor.name}</h3>
                    <Badge className="bg-purple-900/30 text-purple-400">
                      {contributor.role}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">{contributor.bio}</p>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                    onClick={() => window.open(contributor.linkedin, '_blank')}
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-800"
                    onClick={() => window.open(contributor.github, '_blank')}
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Info */}
        <Card className="bg-black/60 backdrop-blur-lg border border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">
              About Altravex.ai
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300 text-lg mb-6">
              Altravex.ai is a cutting-edge virtual trading platform that provides
              real-time market data, advanced analytics, and risk-free trading
              experience. Our mission is to democratize access to financial markets
              through innovative technology and user-friendly interfaces.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Focus</h4>
                <p className="text-green-400">FinTech & Trading</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contributors;
