import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'secondary' | 'success';
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}: StatCardProps) {
  const variants = {
    default: {
      card: 'bg-card',
      icon: 'bg-muted text-muted-foreground',
    },
    primary: {
      card: 'bg-gradient-primary text-primary-foreground',
      icon: 'bg-primary-foreground/20 text-primary-foreground',
    },
    secondary: {
      card: 'bg-gradient-secondary text-secondary-foreground',
      icon: 'bg-secondary-foreground/20 text-secondary-foreground',
    },
    success: {
      card: 'bg-success/10 border-success/20',
      icon: 'bg-success/20 text-success',
    },
  };

  const styles = variants[variant];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5',
        styles.card,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={cn(
            'text-sm font-medium',
            variant === 'default' ? 'text-muted-foreground' : 'opacity-80'
          )}>
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            {trend && (
              <span
                className={cn(
                  'text-xs font-medium px-1.5 py-0.5 rounded-full',
                  trend.isPositive
                    ? 'bg-success/20 text-success'
                    : 'bg-destructive/20 text-destructive'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className={cn(
              'text-xs',
              variant === 'default' ? 'text-muted-foreground' : 'opacity-70'
            )}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={cn('rounded-xl p-3', styles.icon)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      
      {/* Decorative element */}
      {variant !== 'default' && (
        <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
      )}
    </div>
  );
}
