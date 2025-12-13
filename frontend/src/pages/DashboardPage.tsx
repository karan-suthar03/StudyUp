import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLogout } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuthContext();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Study Up Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Study Buddies</CardTitle>
              <CardDescription>Your connected study partners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="text-sm text-gray-600">No connections yet</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Hours</CardTitle>
              <CardDescription>Total time spent studying</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0h</div>
              <p className="text-sm text-gray-600">Start your first session</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Rating</CardTitle>
              <CardDescription>Your study buddy rating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">-</div>
              <p className="text-sm text-gray-600">No ratings yet</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Complete these steps to find your perfect study buddy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <span>Create your account</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm">
                  2
                </div>
                <span>Complete your profile</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm">
                  3
                </div>
                <span>Find and connect with study buddies</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm">
                  4
                </div>
                <span>Schedule your first study session</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}