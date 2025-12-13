import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface OAuthProvider {
  name: string;
  icon: string;
  color: string;
  hoverColor: string;
}

const providers: OAuthProvider[] = [
  {
    name: 'Google',
    icon: '🔍',
    color: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
    hoverColor: 'hover:bg-gray-50',
  },
  {
    name: 'Microsoft',
    icon: '🪟',
    color: 'bg-[#0078d4] text-white hover:bg-[#106ebe]',
    hoverColor: 'hover:bg-[#106ebe]',
  },
  {
    name: 'GitHub',
    icon: '🐙',
    color: 'bg-[#24292e] text-white hover:bg-[#1a1e22]',
    hoverColor: 'hover:bg-[#1a1e22]',
  },
];

export function OAuthButtons() {
  const { loginWithOAuth, isLoading } = useAuth();

  const handleOAuthLogin = async (provider: string) => {
    try {
      await loginWithOAuth(provider.toLowerCase());
      toast({
        title: `${provider} login initiated`,
        description: "You'll be redirected to complete authentication.",
      });
    } catch (error) {
      toast({
        title: "OAuth login failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <Button
          key={provider.name}
          variant="outline"
          className={`w-full ${provider.color} transition-colors`}
          onClick={() => handleOAuthLogin(provider.name)}
          disabled={isLoading}
        >
          <span className="mr-2 text-lg">{provider.icon}</span>
          Continue with {provider.name}
        </Button>
      ))}
    </div>
  );
}