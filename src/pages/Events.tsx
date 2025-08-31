
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, TrendingUp, AlertCircle } from 'lucide-react';

const Events = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'Federal Reserve Interest Rate Decision',
      date: '2024-01-31',
      time: '19:00',
      impact: 'high',
      currency: 'USD',
      description: 'The Federal Reserve announces its decision on interest rates',
      forecast: '5.25%',
      previous: '5.25%'
    },
    {
      id: 2,
      title: 'Non-Farm Payrolls',
      date: '2024-02-02',
      time: '18:30',
      impact: 'high',
      currency: 'USD',
      description: 'Monthly employment data release',
      forecast: '175K',
      previous: '199K'
    },
    {
      id: 3,
      title: 'ECB Interest Rate Decision',
      date: '2024-02-05',
      time: '17:45',
      impact: 'high',
      currency: 'EUR',
      description: 'European Central Bank monetary policy decision',
      forecast: '4.50%',
      previous: '4.50%'
    },
    {
      id: 4,
      title: 'GDP Growth Rate (QoQ)',
      date: '2024-02-08',
      time: '14:30',
      impact: 'medium',
      currency: 'USD',
      description: 'Quarterly gross domestic product growth rate',
      forecast: '2.4%',
      previous: '2.1%'
    },
    {
      id: 5,
      title: 'Consumer Price Index',
      date: '2024-02-12',
      time: '18:30',
      impact: 'high',
      currency: 'USD',
      description: 'Monthly inflation rate measurement',
      forecast: '3.1%',
      previous: '3.2%'
    },
    {
      id: 6,
      title: 'Bank of England Rate Decision',
      date: '2024-02-15',
      time: '17:00',
      impact: 'high',
      currency: 'GBP',
      description: 'UK monetary policy committee rate decision',
      forecast: '5.25%',
      previous: '5.25%'
    }
  ]);

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'bg-red-900/30 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-900/30 text-green-400 border-green-500/30';
      default: return 'bg-gray-900/30 text-gray-400 border-gray-500/30';
    }
  };

  const getCurrencyColor = (currency) => {
    switch (currency) {
      case 'USD': return 'bg-blue-900/30 text-blue-400';
      case 'EUR': return 'bg-purple-900/30 text-purple-400';
      case 'GBP': return 'bg-green-900/30 text-green-400';
      case 'JPY': return 'bg-red-900/30 text-red-400';
      default: return 'bg-gray-900/30 text-gray-400';
    }
  };

  const groupEventsByDate = (events) => {
    return events.reduce((groups, event) => {
      const date = event.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {});
  };

  const groupedEvents = groupEventsByDate(events);

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
          <h1 className="text-4xl font-bold text-white mb-4">Economic Events Calendar</h1>
          <p className="text-gray-300 text-lg">Important forex and economic events that may impact the markets</p>
        </div>

        {/* Events Timeline */}
        <div className="space-y-8">
          {Object.entries(groupedEvents).map(([date, dayEvents]) => (
            <Card key={date} className="bg-black/60 backdrop-blur-lg border border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-green-400" />
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dayEvents.map((event) => (
                    <div key={event.id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white font-semibold text-lg">{event.title}</h3>
                            <Badge className={getImpactColor(event.impact)}>
                              {event.impact.toUpperCase()}
                            </Badge>
                            <Badge className={getCurrencyColor(event.currency)}>
                              {event.currency}
                            </Badge>
                          </div>
                          <p className="text-gray-300 mb-3">{event.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              Forecast: {event.forecast}
                            </div>
                            <div className="flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" />
                              Previous: {event.previous}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Event Legend */}
        <Card className="bg-black/60 backdrop-blur-lg border border-purple-500/30 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Impact Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-white">High Impact - Major market moving events</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-white">Medium Impact - Moderate market influence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-white">Low Impact - Minor market influence</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Events;
