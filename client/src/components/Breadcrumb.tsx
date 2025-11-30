import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-accent/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-primary transition-colors" data-testid="breadcrumb-home">
            Home
          </Link>
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              {item.path ? (
                <Link href={item.path} className="text-muted-foreground hover:text-primary transition-colors" data-testid={`breadcrumb-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium" data-testid={`breadcrumb-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
