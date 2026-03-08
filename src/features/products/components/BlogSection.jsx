import { useState, useEffect } from "react";
import { fetchBlogPosts } from "../services/productService";

const FALLBACK_POSTS = [
  { id: 1, title: "Təzə məhsul necə saxlanılır?", excerpt: "Praktik məsləhətlər.", date: "2025-02-20" },
  { id: 2, title: "Üzüm yetişdirməyin əsasları", excerpt: "Bağçılıq təcrübələri.", date: "2025-02-18" },
  { id: 3, title: "Orqanik əkin üçün tövsiyələr", excerpt: "Peşəkar fermerlərdən.", date: "2025-02-15" },
];

export function BlogSection() {
  const [posts, setPosts] = useState(FALLBACK_POSTS);

  useEffect(() => {
    fetchBlogPosts()
      .then((data) => setPosts(Array.isArray(data) ? data : data?.items ?? FALLBACK_POSTS))
      .catch(() => {});
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="mb-6 text-xl font-semibold text-emerald-900">Kənd təsərrüfatı xəbərləri</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <article
            key={post.id}
            className="overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="aspect-video bg-emerald-100" />
            <div className="p-4">
              <time className="text-xs text-emerald-500">{post.date}</time>
              <h3 className="mt-1 font-semibold text-emerald-900">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-emerald-600">
                {post.excerpt || post.description}
              </p>
              <a
                href="#"
                className="mt-3 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-800"
              >
                Oxu
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
