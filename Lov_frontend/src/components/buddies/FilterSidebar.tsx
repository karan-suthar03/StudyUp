import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { subjects, learningStyles } from '@/data/mockData';
import { ChevronDown, Filter, RotateCcw, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  subjects: string[];
  learningStyles: string[];
  minRating: number;
  minMatchScore: number;
  availability: string[];
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function FilterSidebar({ onFiltersChange, className }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    subjects: [],
    learningStyles: [],
    minRating: 0,
    minMatchScore: 0,
    availability: [],
  });

  const [expandedSections, setExpandedSections] = useState<string[]>(['subjects', 'rating']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = (key: 'subjects' | 'learningStyles' | 'availability', value: string) => {
    const current = filters[key];
    const newValue = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilter(key, newValue);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      subjects: [],
      learningStyles: [],
      minRating: 0,
      minMatchScore: 0,
      availability: [],
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const activeFiltersCount = 
    filters.subjects.length + 
    filters.learningStyles.length + 
    filters.availability.length + 
    (filters.minRating > 0 ? 1 : 0) + 
    (filters.minMatchScore > 0 ? 1 : 0);

  return (
    <Card className={cn('sticky top-6', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Subjects */}
        <Collapsible 
          open={expandedSections.includes('subjects')}
          onOpenChange={() => toggleSection('subjects')}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <Label className="text-sm font-medium cursor-pointer">Subjects</Label>
            <ChevronDown className={cn(
              'h-4 w-4 text-muted-foreground transition-transform',
              expandedSections.includes('subjects') && 'rotate-180'
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto scrollbar-thin">
              {subjects.slice(0, 12).map((subject) => (
                <Badge
                  key={subject}
                  variant={filters.subjects.includes(subject) ? 'default' : 'outline'}
                  className="cursor-pointer transition-colors"
                  onClick={() => toggleArrayFilter('subjects', subject)}
                >
                  {subject}
                  {filters.subjects.includes(subject) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Learning Style */}
        <Collapsible 
          open={expandedSections.includes('learningStyle')}
          onOpenChange={() => toggleSection('learningStyle')}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <Label className="text-sm font-medium cursor-pointer">Learning Style</Label>
            <ChevronDown className={cn(
              'h-4 w-4 text-muted-foreground transition-transform',
              expandedSections.includes('learningStyle') && 'rotate-180'
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {learningStyles.map((style) => (
              <div key={style.value} className="flex items-start gap-2">
                <Checkbox
                  id={style.value}
                  checked={filters.learningStyles.includes(style.value)}
                  onCheckedChange={() => toggleArrayFilter('learningStyles', style.value)}
                />
                <div className="grid gap-0.5 leading-none">
                  <label htmlFor={style.value} className="text-sm font-medium cursor-pointer">
                    {style.label}
                  </label>
                  <p className="text-xs text-muted-foreground">{style.description}</p>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Rating */}
        <Collapsible 
          open={expandedSections.includes('rating')}
          onOpenChange={() => toggleSection('rating')}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <Label className="text-sm font-medium cursor-pointer">Minimum Rating</Label>
            <ChevronDown className={cn(
              'h-4 w-4 text-muted-foreground transition-transform',
              expandedSections.includes('rating') && 'rotate-180'
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 px-1">
            <Slider
              value={[filters.minRating]}
              onValueChange={([value]) => updateFilter('minRating', value)}
              max={5}
              step={0.5}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Any</span>
              <span className="font-medium text-foreground">{filters.minRating > 0 ? `${filters.minRating}+ ⭐` : 'Any'}</span>
              <span>5.0</span>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Match Score */}
        <Collapsible 
          open={expandedSections.includes('matchScore')}
          onOpenChange={() => toggleSection('matchScore')}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <Label className="text-sm font-medium cursor-pointer">Minimum Match Score</Label>
            <ChevronDown className={cn(
              'h-4 w-4 text-muted-foreground transition-transform',
              expandedSections.includes('matchScore') && 'rotate-180'
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 px-1">
            <Slider
              value={[filters.minMatchScore]}
              onValueChange={([value]) => updateFilter('minMatchScore', value)}
              max={100}
              step={5}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Any</span>
              <span className="font-medium text-foreground">{filters.minMatchScore > 0 ? `${filters.minMatchScore}%+` : 'Any'}</span>
              <span>100%</span>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Availability */}
        <Collapsible 
          open={expandedSections.includes('availability')}
          onOpenChange={() => toggleSection('availability')}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <Label className="text-sm font-medium cursor-pointer">Availability</Label>
            <ChevronDown className={cn(
              'h-4 w-4 text-muted-foreground transition-transform',
              expandedSections.includes('availability') && 'rotate-180'
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="grid grid-cols-2 gap-2">
              {days.map((day) => (
                <div key={day} className="flex items-center gap-2">
                  <Checkbox
                    id={day}
                    checked={filters.availability.includes(day.toLowerCase())}
                    onCheckedChange={() => toggleArrayFilter('availability', day.toLowerCase())}
                  />
                  <label htmlFor={day} className="text-sm cursor-pointer">
                    {day.slice(0, 3)}
                  </label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
