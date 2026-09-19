import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-accent text-[#FF6B6C] capitalize mb-6">
        {resolvedParams.slug.replace(/-/g, ' ')}
      </h1>
      <p className="text-gray-600 max-w-lg mb-8">
        This page is a placeholder for the static frontend. In a full production application, this would contain the necessary content or forms.
      </p>
      <Link href="/" className="bg-[#8B263E] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-opacity-90 transition-colors">
        Return Home
      </Link>
    </div>
  );
}
