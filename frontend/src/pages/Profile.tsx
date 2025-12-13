import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { currentUser, subjects, learningStyles } from '@/data/mockData';
import { 
  User, 
  Camera, 
  BookOpen, 
  Target, 
  Clock, 
  Brain, 
  Save,
  Star,
  Calendar,
  Users,
  X,
  Plus,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const availabilitySlots = [
  '08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00',
  '16:00-18:00', '18:00-20:00', '20:00-22:00'
];

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function Profile() {
  const [profile, setProfile] = useState({
    name: currentUser.name,
    username: currentUser.username,
    email: currentUser.email,
    bio: currentUser.profile?.bio || '',
    subjects: currentUser.profile?.subjects || [],
    learningStyle: currentUser.profile?.learningStyle || '',
    availability: currentUser.profile?.availability || {},
    goals: currentUser.profile?.goals || [],
  });

  const [newGoal, setNewGoal] = useState('');

  const completionPercentage = currentUser.profile?.completionPercentage || 0;

  const toggleSubject = (subject: string) => {
    setProfile(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const toggleAvailability = (day: string, slot: string) => {
    setProfile(prev => {
      const daySlots = prev.availability[day] || [];
      const newSlots = daySlots.includes(slot)
        ? daySlots.filter(s => s !== slot)
        : [...daySlots, slot];
      
      return {
        ...prev,
        availability: {
          ...prev.availability,
          [day]: newSlots.length > 0 ? newSlots : undefined,
        },
      };
    });
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setProfile(prev => ({
      ...prev,
      goals: [...prev.goals, { id: Date.now().toString(), title: newGoal }],
    }));
    setNewGoal('');
  };

  const removeGoal = (goalId: string) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== goalId),
    }));
  };

  const handleSave = () => {
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2">
              <User className="h-8 w-8 text-primary" />
              My Profile
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your profile to get better study buddy matches
            </p>
          </div>
          <Button variant="gradient" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Profile Completion */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Profile Completion</span>
              <span className="text-sm text-muted-foreground">
                {completionPercentage}% complete
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            {completionPercentage < 60 && (
              <p className="text-sm text-warning mt-2">
                Complete at least 60% of your profile to get recommendations
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar Card */}
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-28 w-28 border-4 border-primary/20">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-xl font-semibold">{currentUser.name}</h3>
                <p className="text-muted-foreground">@{currentUser.username}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 w-full mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-warning mb-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-bold">{currentUser.profile?.avgRating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-foreground mb-1">
                      {currentUser.profile?.totalSessions}
                    </div>
                    <p className="text-xs text-muted-foreground">Sessions</p>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-foreground mb-1">12</div>
                    <p className="text-xs text-muted-foreground">Buddies</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell others about yourself..."
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Study Preferences */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subjects */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Subjects
                </CardTitle>
                <CardDescription>
                  Select the subjects you want to study
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => {
                    const isSelected = profile.subjects.includes(subject);
                    return (
                      <Badge
                        key={subject}
                        variant={isSelected ? 'default' : 'outline'}
                        className={cn(
                          'cursor-pointer transition-all',
                          isSelected && 'bg-primary'
                        )}
                        onClick={() => toggleSubject(subject)}
                      >
                        {subject}
                        {isSelected && <X className="h-3 w-3 ml-1" />}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Learning Style */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Learning Style
                </CardTitle>
                <CardDescription>
                  How do you learn best?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {learningStyles.map((style) => {
                    const isSelected = profile.learningStyle === style.value;
                    return (
                      <button
                        key={style.value}
                        onClick={() => setProfile({ ...profile, learningStyle: style.value })}
                        className={cn(
                          'p-4 rounded-lg border text-left transition-all',
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        <div className="font-medium mb-1">{style.label}</div>
                        <p className="text-sm text-muted-foreground">{style.description}</p>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Study Goals
                </CardTitle>
                <CardDescription>
                  What are you working towards?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Add a new goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                  />
                  <Button onClick={addGoal}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {profile.goals.map((goal) => (
                    <div
                      key={goal.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <span>{goal.title}</span>
                      <Button
                        variant="ghost"
                        size="iconSm"
                        onClick={() => removeGoal(goal.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Availability
                </CardTitle>
                <CardDescription>
                  When are you available to study?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="text-left pb-3 font-medium text-muted-foreground">Day</th>
                        {availabilitySlots.slice(0, 5).map((slot) => (
                          <th key={slot} className="text-center pb-3 font-medium text-muted-foreground px-2">
                            {slot.split('-')[0]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {days.map((day) => (
                        <tr key={day}>
                          <td className="py-2 capitalize font-medium">{day.slice(0, 3)}</td>
                          {availabilitySlots.slice(0, 5).map((slot) => {
                            const isSelected = profile.availability[day]?.includes(slot);
                            return (
                              <td key={slot} className="text-center py-2 px-2">
                                <button
                                  onClick={() => toggleAvailability(day, slot)}
                                  className={cn(
                                    'h-8 w-8 rounded-md transition-colors',
                                    isSelected
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-muted hover:bg-muted/80'
                                  )}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}