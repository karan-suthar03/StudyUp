import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecommendationCard } from '@/components/dashboard/RecommendationCard';
import { UpcomingSession } from '@/components/dashboard/UpcomingSession';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Clock,
  Star,
  Calendar,
  TrendingUp,
  ArrowRight,
  Plus,
  Sparkles,
} from 'lucide-react';
import { mockDashboardStats, mockRecommendations, mockSessions, currentUser } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleConnect = (userId: string) => {
    toast({
      title: "Connection request sent!",
      description: "They'll be notified of your request.",
    });
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="animate-slide-up">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Welcome back, {currentUser.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your study journey
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/buddies')}>
              <Users className="h-4 w-4 mr-2" />
              Find Buddies
            </Button>
            <Button onClick={() => navigate('/sessions')}>
              <Plus className="h-4 w-4 mr-2" />
              New Session
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Study Buddies"
            value={mockDashboardStats.totalBuddies}
            subtitle="Connected this month"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
          />
          <StatCard
            title="Study Hours"
            value={`${mockDashboardStats.studyHours}h`}
            subtitle="This week"
            icon={Clock}
            trend={{ value: 8, isPositive: true }}
            variant="secondary"
          />
          <StatCard
            title="Average Rating"
            value={mockDashboardStats.avgRating.toFixed(1)}
            subtitle="From 28 reviews"
            icon={Star}
            variant="success"
          />
          <StatCard
            title="Sessions Completed"
            value={mockDashboardStats.sessionsCompleted}
            subtitle="This month"
            icon={Calendar}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Sessions & Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Sessions */}
            <Card className="bg-white border">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Upcoming Sessions
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/sessions')}>
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockSessions.slice(0, 3).map((session) => (
                  <UpcomingSession
                    key={session.id}
                    session={session}
                    className="animate-slide-up"
                  />
                ))}
              </CardContent>
            </Card>

            {/* Activity Chart */}
            <ActivityChart />
          </div>

          {/* Right Column - Recommendations */}
          <div className="space-y-6">
            <Card className="bg-white border">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  Top Matches
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/buddies')}>
                  See All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRecommendations.slice(0, 3).map((rec) => (
                  <RecommendationCard
                    key={rec.user.id}
                    recommendation={rec}
                    onConnect={handleConnect}
                    className="animate-slide-up"
                  />
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white border">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Your Progress</h4>
                    <p className="text-sm text-gray-600">Keep up the great work!</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Profile Completion</span>
                      <span className="font-medium text-gray-900">
                        {currentUser.profile?.completionPercentage}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                        style={{ width: `${currentUser.profile?.completionPercentage}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Weekly Goal</span>
                      <span className="font-medium text-gray-900">75%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                        style={{ width: '75%' }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}