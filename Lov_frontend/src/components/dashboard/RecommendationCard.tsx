import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Recommendation } from '@/types';
import { Star, UserPlus, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onConnect: (userId: string) => void;
  className?: string;
}

export function RecommendationCard({ recommendation, onConnect, className }: RecommendationCardProps) {
  const { user, compatibilityScore, matchReasons } = recommendation;
  const profile = user.profile;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success bg-success/10 border-success/30';
    if (score >= 75) return 'text-primary bg-primary/10 border-primary/30';
    return 'text-warning bg-warning/10 border-warning/30';
  };

  return (
    <Card className={cn(
      'group relative overflow-hidden border bg-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1',
      className
    )}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-14 w-14 border-2 border-border">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className={cn(
              'absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-card text-xs font-bold',
              getScoreColor(compatibilityScore)
            )}>
              {compatibilityScore}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-semibold text-card-foreground truncate">{user.name}</h4>
              <div className="flex items-center gap-1 text-sm text-warning">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="font-medium">{profile?.avgRating.toFixed(1)}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">@{user.username}</p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {profile?.subjects.slice(0, 3).map((subject) => (
                <Badge key={subject} variant="secondary" className="text-xs px-2 py-0.5">
                  {subject}
                </Badge>
              ))}
              {profile?.subjects && profile.subjects.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{profile.subjects.length - 3}
                </Badge>
              )}
            </div>

            <div className="space-y-1 mb-4">
              {matchReasons.slice(0, 2).map((reason, idx) => (
                <p key={idx} className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-success" />
                  {reason}
                </p>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 gap-1.5"
                onClick={() => onConnect(user.id)}
              >
                <UserPlus className="h-3.5 w-3.5" />
                Connect
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" />
                View
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Score indicator bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
        <div
          className="h-full bg-gradient-primary transition-all duration-500"
          style={{ width: `${compatibilityScore}%` }}
        />
      </div>
    </Card>
  );
}
