import { getPosts } from "@/lib/sanity/queries/post";
import type { BlogPost } from "@/content/blog";
import type { Locale } from "@/lib/i18n/routing";

type RawPost = {
  _id: string;
  title?: { nl?: string; en?: string };
  slug?: { nl?: { current?: string }; en?: { current?: string } };
  publishedAt?: string;
  excerpt?: { nl?: string; en?: string };
  author?: { name?: string };
  category?: { title?: { nl?: string; en?: string } };
  coverImage?: { url?: string };
};

/**
 * Blog list from Sanity, mapped to the BlogPost shape the blog pages render.
 * The first (most recent) post is marked featured. Returns [] when Sanity has
 * no published posts — the blog page then noindexes and shows an empty state.
 */
export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  const raw = ((await getPosts().catch(() => null)) ?? []) as RawPost[];

  return raw
    .map((post, index) => ({
      slug: post.slug?.[locale]?.current ?? post.slug?.nl?.current ?? "",
      title: post.title?.[locale] ?? post.title?.nl ?? "",
      excerpt: post.excerpt?.[locale] ?? post.excerpt?.nl ?? "",
      category: post.category?.title?.[locale] ?? post.category?.title?.nl ?? "",
      author: post.author?.name ?? "",
      date: post.publishedAt ?? "",
      readingTime: "",
      image: post.coverImage?.url ?? "",
      featured: index === 0,
    }))
    .filter((post) => post.slug !== "" && post.title !== "");
}
