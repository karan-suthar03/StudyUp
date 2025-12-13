import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SessionCard } from '@/components/sessions/SessionCard';
import { CreateSessionModal, SessionFormData } from '@/components/sessions/CreateSessionModal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Plus, CalendarDays, ListChecks, Clock } from 'lucide-react';
import { mockSessions } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { StudySession } from '@/types';

export default function Sessions() {
  const [sessions, setSessions] = useState(mockSessions);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingSessions = sessions.filter(s => s.status === 'scheduled');
  const completedSessions = sessions.filter(s => s.status === 'completed');

  const handleCreateSession = (data: SessionFormData) => {
    const newSession: StudySession = {
      id: `session-${Date.now()}`,
      creatorId: 'user-1',
      title: data.title,
      subject: data.subject,
      description: data.description,
      dateTime: new Date(`${data.date}T${data.time}`),
      duration: data.duration,
      participants: ['user-1', ...data.participants],
      status: 'scheduled',
      isRecurring: data.isRecurring,
      recurringPattern: data.recurringPattern,
      createdAt: new Date(),
    };

    setSessions([newSession, ...sessions]);
    toast({
      title: "Session created!",
      description: "Your study session has been scheduled.",
    });
  };

  const handleJoin = (sessionId: string) => {
    toast({
      title: "Joining session...",
      description: "Video call feature coming soon!",
    });
  };

  const handleEdit = (session: StudySession) => {
    toast({
      title: "Edit session",
      description: "Edit functionality coming soon!",
    });
  };

  const handleDelete = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    toast({
      title: "Session cancelled",
      description: "The study session has been cancelled.",
    });
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2">
              <Calendar className="h-8 w-8 text-primary" />
              Study Sessions
            </h1>
            <p className="text-muted-foreground mt-1">
              Schedule and manage your study sessions
            </p>
          </div>
          <Button variant="gradient" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Session
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingSessions.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-success/10 p-3">
                <ListChecks className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedSessions.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="rounded-lg bg-warning/10 p-3">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-bold">
                  {Math.round(sessions.reduce((acc, s) => acc + s.duration, 0) / 60)}h
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions List */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming" className="gap-2">
              <CalendarDays className="h-4 w-4" />
              Upcoming ({upcomingSessions.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <ListChecks className="h-4 w-4" />
              Completed ({completedSessions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingSessions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No upcoming sessions</h3>
                  <p className="text-muted-foreground mb-4">
                    Create a study session to start collaborating with your buddies
                  </p>
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Session
                  </Button>
                </CardContent>
              </Card>
            ) : (
              upcomingSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onJoin={handleJoin}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  className="animate-slide-up"
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedSessions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <ListChecks className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No completed sessions yet</h3>
                  <p className="text-muted-foreground">
                    Your completed study sessions will appear here
                  </p>
                </CardContent>
              </Card>
            ) : (
              completedSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  className="animate-slide-up"
                />
              ))
            )}
          </TabsContent>
        </Tabs>

        <CreateSessionModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onSubmit={handleCreateSession}
        />
      </div>
    </AppLayout>
  );
}
