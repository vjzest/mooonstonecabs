import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

interface SimpleInfoProps {
  title: string;
  content: string;
}

export default function SimpleInfo({ title, content }: SimpleInfoProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb items={[{ label: title }]} />

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
            {title}
          </h1>
          <div className="prose max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {content}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
