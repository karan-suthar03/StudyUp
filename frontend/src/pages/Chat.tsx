import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { MessageCircle } from 'lucide-react';
import { mockUsers } from '@/data/mockData';

export default function Chat() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(mockUsers[0].id);

  return (
    <AppLayout>
      <div className="h-[calc(100vh-0px)] flex">
        {/* Sidebar */}
        <div className="w-80 shrink-0">
          <ChatSidebar
            selectedUserId={selectedUserId}
            onSelectUser={setSelectedUserId}
          />
        </div>

        {/* Chat Window */}
        <div className="flex-1 bg-background">
          {selectedUserId ? (
            <ChatWindow userId={selectedUserId} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="rounded-full bg-muted p-6 mb-4">
                <MessageCircle className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Select a conversation
              </h3>
              <p className="text-muted-foreground max-w-md">
                Choose a study buddy from the sidebar to start chatting and planning your next study session
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}