import { useParams, Link } from "react-router-dom";
import { Star } from "lucide-react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getPublicationBySlug, type Publication as PublicationByTopic } from "@/lib/contentLoader";
import { scholarSearchUrl } from "@/utils/scholar";
import { boldOkubo } from "@/utils/formatAuthors";

function doiLink(doi: string): string {
  if (!doi) return "";
  if (doi.startsWith("http")) return doi;
  return `https://doi.org/${doi.replace(/^https:\/\/doi\.org\/?/i, "")}`;
}

function formatApa(pub: PublicationByTopic): string {
  const parts = [
    `${pub.authors} (${pub.year}). ${pub.title}. `,
    pub.journal && `${pub.journal}`,
    pub.detail && `, ${pub.detail}`,
    pub.doi ? `. https://doi.org/${pub.doi.replace(/^https:\/\/doi\.org\/?/i, "")}` : ".",
  ];
  return parts.filter(Boolean).join("");
}

const PublicationDetailContent = () => {
  const { slug } = useParams<{ slug: string }>();
  const pub = slug ? getPublicationBySlug(slug) : undefined;

  if (!pub) {
    return (
      <main className="min-h-screen bg-background">
        <section className="py-16 container mx-auto px-6">
          <p className="text-muted-foreground">Publication not found.</p>
          <Link to="/" className="text-accent hover:underline mt-4 inline-block">
            Back to home
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 container mx-auto px-6 max-w-3xl">
        <Link to="/#publications" className="text-sm text-accent hover:underline mb-6 inline-block">
          ← Selected Publications
        </Link>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          {pub.top_journal && <><Star aria-hidden="true" className="w-5 h-5 fill-accent text-accent inline mr-2 -mt-1" /><span className="sr-only">Top journal</span></>}
          {pub.title}
        </h1>
        <p className="text-muted-foreground font-body">{boldOkubo(pub.authors)}</p>
        <p className="text-sm font-body text-foreground/80 mt-1">
          <span className="italic">{pub.journal}</span>
          {pub.detail && `, ${pub.detail}`} ({pub.year})
        </p>
        {pub.contribution_summary && (
          <p className="text-sm font-body text-muted-foreground/80 mt-2 italic">
            {pub.contribution_summary}
          </p>
        )}

        {pub.abstract && (
          <div className="mt-8">
            <h2 className="text-sm font-display font-semibold text-foreground mb-2">Abstract</h2>
            <p className="text-sm font-body text-muted-foreground leading-relaxed whitespace-pre-wrap">{pub.abstract}</p>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-sm font-display font-semibold text-foreground mb-2">Citation (APA)</h2>
          <p className="text-sm font-body text-muted-foreground leading-relaxed">{formatApa(pub)}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {pub.doi && (
            <a
              href={doiLink(pub.doi)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-body text-sm"
            >
              DOI
            </a>
          )}
          <a
            href={pub.scholar_url || scholarSearchUrl(pub.title, pub.authors)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline font-body text-sm"
          >
            Google Scholar
          </a>
          {pub.pdf_url && (
            <a href={pub.pdf_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-body text-sm">
              PDF
            </a>
          )}
          {pub.preprint_url && (
            <a href={pub.preprint_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-body text-sm">
              Preprint
            </a>
          )}
        </div>

        {(pub.citation_count != null || pub.citation_source) && (
          <p className="mt-6 text-sm font-body text-muted-foreground">
            {pub.citation_count != null && (
              <span>Citations: {pub.citation_count}</span>
            )}
            {pub.citation_source && (
              <span> ({pub.citation_source})</span>
            )}
          </p>
        )}
      </section>
    </main>
  );
};

const PublicationDetailPage = () => (
  <LanguageProvider>
    <div className="min-h-screen bg-background">
      <Navigation />
      <PublicationDetailContent />
      <Footer />
    </div>
  </LanguageProvider>
);

export default PublicationDetailPage;
