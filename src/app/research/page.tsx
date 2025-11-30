// src/app/research/[slug]/page.tsx
import { getPostBySlug, getPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const posts = await getPosts(); // Add await here
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug); // Add await here too

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.meta.title}</h1>
        <div className="flex gap-4 text-sm text-gray-400">
          <span>{post.meta.category}</span>
          <span>•</span>
          <span>{post.meta.date}</span>
          <span>•</span>
          <span>{post.meta.author}</span>
        </div>
      </header>

      <div className="prose prose-invert prose-lg max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}