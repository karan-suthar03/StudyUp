import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { subjects, mockUsers } from '@/data/mockData';
import { Calendar, Clock, Users, Repeat, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SessionFormData) => void;
}

export interface SessionFormData {
  title: string;
  subject: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  participants: string[];
  isRecurring: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
}

const durations = [
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
  { value: 180, label: '3 hours' },
];

export function CreateSessionModal({ open, onOpenChange, onSubmit }: CreateSessionModalProps) {
  const [formData, setFormData] = useState<SessionFormData>({
    title: '',
    subject: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    participants: [],
    isRecurring: false,
  });

  const connectedUsers = mockUsers.slice(0, 4);

  const toggleParticipant = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.includes(userId)
        ? prev.participants.filter(id => id !== userId)
        : [...prev.participants, userId],
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      title: '',
      subject: '',
      description: '',
      date: '',
      time: '',
      duration: 60,
      participants: [],
      isRecurring: false,
    });
    onOpenChange(false);
  };

  const isValid = formData.title && formData.subject && formData.date && formData.time && formData.participants.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Create Study Session
          </DialogTitle>
          <DialogDescription>
            Schedule a new study session with your connected buddies
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="title">Session Title</Label>
            <Input
              id="title"
              placeholder="e.g., Calculus Problem Solving"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Subject */}
          <div className="grid gap-2">
            <Label>Subject</Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => setFormData({ ...formData, subject: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="What will you be studying?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          {/* Duration */}
          <div className="grid gap-2">
            <Label className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Duration
            </Label>
            <Select
              value={formData.duration.toString()}
              onValueChange={(value) => setFormData({ ...formData, duration: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {durations.map((d) => (
                  <SelectItem key={d.value} value={d.value.toString()}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recurring */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="recurring"
              checked={formData.isRecurring}
              onCheckedChange={(checked) => setFormData({ 
                ...formData, 
                isRecurring: checked as boolean,
                recurringPattern: checked ? 'weekly' : undefined,
              })}
            />
            <Label htmlFor="recurring" className="flex items-center gap-1.5 cursor-pointer">
              <Repeat className="h-4 w-4" />
              Make this a recurring session
            </Label>
          </div>

          {formData.isRecurring && (
            <Select
              value={formData.recurringPattern}
              onValueChange={(value: 'daily' | 'weekly' | 'monthly') => 
                setFormData({ ...formData, recurringPattern: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Participants */}
          <div className="grid gap-2">
            <Label className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              Invite Buddies
            </Label>
            <div className="space-y-2">
              {connectedUsers.map((user) => {
                const isSelected = formData.participants.includes(user.id);
                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => toggleParticipant(user.id)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-lg border transition-colors',
                      isSelected 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                    <Checkbox checked={isSelected} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Participants */}
          {formData.participants.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.participants.map((id) => {
                const user = connectedUsers.find(u => u.id === id);
                if (!user) return null;
                return (
                  <Badge key={id} variant="secondary" className="gap-1.5 py-1.5 px-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-[10px]">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {user.name.split(' ')[0]}
                    <button
                      type="button"
                      onClick={() => toggleParticipant(id)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Create Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
