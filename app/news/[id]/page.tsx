import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { news } from "@/lib/data"

type NewsArticlePageProps = {
  params: Promise<{ id: string }>
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { id } = await params
  const article = news.find((item) => item.id === decodeURIComponent(id))

  if (!article) {
    notFound()
  }

  const articleText = article.content === "Full article content here..."
    ? `${article.excerpt ?? "This story captures the people, partnerships, and practical work behind Hope For Changes."} Our teams continue listening to communities, adapting with local partners, and building support that lasts beyond a single response.`
    : article.content

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article>
        <section className="border-b border-border bg-secondary/30 pt-32 pb-12 lg:pt-40 lg:pb-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Button asChild variant="ghost" className="mb-8 -ml-3">
              <Link href="/news"><ArrowLeft className="mr-2 h-4 w-4" />Back to News</Link>
            </Button>
            <Badge>{article.category}</Badge>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">{article.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{article.excerpt ?? "A story from the Hope For Changes community."}</p>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><User className="h-4 w-4" />{article.author}</span>
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" />{new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />{article.readTime} read</span>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image src={article.image} alt={article.title} fill priority className="object-cover" />
            </div>
            <div className="mx-auto mt-12 max-w-3xl">
              <p className="whitespace-pre-line text-lg leading-9 text-muted-foreground">{articleText}</p>
              <div className="mt-12 border-t border-border pt-8">
                <Button asChild>
                  <Link href="/donate">Support this work</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </article>
      <Footer />
    </main>
  )
}
