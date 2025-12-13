import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { BuddyCard } from '@/components/buddies/BuddyCard';
import { FilterSidebar, FilterState } from '@/components/buddies/FilterSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockRecommendations, mockUsers } from '@/data/mockData';
import { Search, SlidersHorizontal, Grid3X3, List, Users, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Recommendation } from '@/types';

export default function Buddies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('match');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    subjects: [],
    learningStyles: [],
    minRating: 0,
    minMatchScore: 0,
    availability: [],
  });

  // Combine recommendations with additional users for more results
  const allRecommendations: Recommendation[] = [
    ...mockRecommendations,
    ...mockUsers.slice(2).map(user => ({
      user,
      compatibilityScore: Math.floor(Math.random() * 30) + 60,
      matchReasons: ['Shares common interests', 'Good availability match'],
    })),
  ];

  const filteredRecommendations = allRecommendations.filter(rec => {
    const user = rec.user;
    const profile = user.profile;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        profile?.subjects.some(s => s.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // Subject filter
    if (filters.subjects.length > 0) {
      const hasSubject = filters.subjects.some(s => 
        profile?.subjects.includes(s)
      );
      if (!hasSubject) return false;
    }

    // Learning style filter
    if (filters.learningStyles.length > 0) {
      if (!profile?.learningStyle || !filters.learningStyles.includes(profile.learningStyle)) {
        return false;
      }
    }

    // Rating filter
    if (filters.minRating > 0 && (profile?.avgRating || 0) < filters.minRating) {
      return false;
    }

    // Match score filter
    if (filters.minMatchScore > 0 && rec.compatibilityScore < filters.minMatchScore) {
      return false;
    }

    return true;
  });

  // Sort recommendations
  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.compatibilityScore - a.compatibilityScore;
      case 'rating':
        return (b.user.profile?.avgRating || 0) - (a.user.profile?.avgRating || 0);
      case 'sessions':
        return (b.user.profile?.totalSessions || 0) - (a.user.profile?.totalSessions || 0);
      case 'name':
        return a.user.name.localeCompare(b.user.name);
      default:
        return 0;
    }
  });

  const handleConnect = (userId: string) => {
    toast({
      title: "Connection request sent!",
      description: "They'll be notified and can accept your request.",
    });
  };

  const handleViewProfile = (userId: string) => {
    toast({
      title: "Profile view",
      description: "Full profile view coming soon!",
    });
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2">
                <Users className="h-8 w-8 text-primary" />
                Find Study Buddies
              </h1>
              <p className="text-muted-foreground mt-1">
                Discover compatible study partners based on your profile
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                {sortedRecommendations.length} matches found
              </Badge>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, username, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="sessions">Most Active</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant={showFilters ? 'default' : 'outline'}
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="shrink-0"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <div className="hidden sm:flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="hidden lg:block w-72 shrink-0 animate-slide-in-left">
              <FilterSidebar onFiltersChange={setFilters} />
            </div>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            {sortedRecommendations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No matches found</h3>
                <p className="text-muted-foreground max-w-md">
                  Try adjusting your filters or search query to find more study buddies
                </p>
              </div>
            ) : (
              <div className={cn(
                'grid gap-4',
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              )}>
                {sortedRecommendations.map((rec) => (
                  <BuddyCard
                    key={rec.user.id}
                    recommendation={rec}
                    onConnect={handleConnect}
                    onViewProfile={handleViewProfile}
                    className="animate-slide-up"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}