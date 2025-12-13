import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Recommendation } from '@/types';
import { Star, UserPlus, MessageCircle, Clock, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BuddyCardProps {
  recommendation: Recommendation;
  onConnect: (userId: string) => void;
  onViewProfile: (userId: string) => void;
  className?: string;
}

export function BuddyCard({ recommendation, onConnect, onViewProfile, className }: BuddyCardProps) {
  const { user, compatibilityScore, matchReasons } = recommendation;
  const profile = user.profile;

  const getScoreGradient = (score: number) => {
    if (score >= 90) return 'from-success to-success/80';
    if (score >= 75) return 'from-primary to-primary/80';
    return 'from-warning to-warning/80';
  };

  const getLearningStyleIcon = (style?: string) => {
    switch (style) {
      case 'visual': return '👁️';
      case 'auditory': return '👂';
      case 'reading': return '📖';
      case 'kinesthetic': return '🤚';
      default: return '📚';
    }
  };

  return (
    <Card className={cn(
      'group relative overflow-hidden border bg-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1',
      className
    )}>
      {/* Match Score Banner */}
      <div className={cn(
        'absolute top-0 right-0 px-3 py-1.5 rounded-bl-xl text-sm font-bold text-white bg-gradient-to-r',
        getScoreGradient(compatibilityScore)
      )}>
        {compatibilityScore}% Match
      </div>

      <CardContent className="p-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 border-4 border-primary/20 mb-3">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <h3 className="text-lg font-semibold text-card-foreground">{user.name}</h3>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="font-medium">{profile?.avgRating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">
              ({profile?.totalSessions} sessions)
            </span>
          </div>
        </div>

        {/* Subjects */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Subjects</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {profile?.subjects.slice(0, 4).map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
            {profile?.subjects && profile.subjects.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{profile.subjects.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Learning Style & Availability */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-base">{getLearningStyleIcon(profile?.learningStyle)}</span>
            <span className="capitalize">{profile?.learningStyle || 'Flexible'}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{Object.keys(profile?.availability || {}).length} days/week</span>
          </div>
        </div>

        {/* Match Reasons */}
        <div className="space-y-1.5 mb-5">
          {matchReasons.slice(0, 2).map((reason, idx) => (
            <p key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success mt-1.5 shrink-0" />
              {reason}
            </p>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            className="flex-1 gap-1.5"
            onClick={() => onConnect(user.id)}
          >
            <UserPlus className="h-4 w-4" />
            Connect
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onViewProfile(user.id)}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}