import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StudySession } from '@/types';
import { Calendar, Clock, Users, Video, MoreHorizontal } from 'lucide-react';
import { format, formatDistanceToNow, isToday, isTomorrow } from 'date-fns';
import { cn } from '@/lib/utils';

interface UpcomingSessionProps {
  session: StudySession;
  className?: string;
}

export function UpcomingSession({ session, className }: UpcomingSessionProps) {
  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE, MMM d');
  };

  const getTimeUntil = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div
      className={cn(
        'group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all duration-200 hover:shadow-card-hover hover:border-primary/20',
        className
      )}
    >
      {/* Date Block */}
      <div className="flex flex-col items-center justify-center rounded-lg bg-primary/10 px-3 py-2 min-w-[60px]">
        <span className="text-xs font-medium text-primary uppercase">
          {getDateLabel(session.dateTime)}
        </span>
        <span className="text-lg font-bold text-primary">
          {format(session.dateTime, 'HH:mm')}
        </span>
      </div>

      {/* Session Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-card-foreground truncate">{session.title}</h4>
          {session.isRecurring && (
            <Badge variant="outline" className="text-xs">Recurring</Badge>
          )}
        </div>
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {session.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {session.participants.length}
          </span>
          <Badge variant="secondary" className="text-xs">
            {session.subject}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground mt-1">
          {getTimeUntil(session.dateTime)}
        </p>
      </div>

      {/* Participants Avatars */}
      <div className="flex -space-x-2">
        {session.participantUsers?.slice(0, 3).map((user) => (
          <Avatar key={user.id} className="h-8 w-8 border-2 border-card">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs bg-muted">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        ))}
        {session.participants.length > 3 && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-medium">
            +{session.participants.length - 3}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button size="sm" variant="gradient" className="gap-1.5">
          <Video className="h-3.5 w-3.5" />
          Join
        </Button>
        <Button size="iconSm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
