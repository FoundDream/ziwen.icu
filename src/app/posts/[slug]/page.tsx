import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";

type Params = Promise<{ slug: string }>;

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);
  if (!post) throw new Error(`Post not found for slug: ${slug}`);
  return { title: post.title };
};

const PostLayout = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);
  if (!post) throw new Error(`Post not found for slug: ${slug}`);

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <div
        className="[&>*]:mb-3 [&>*:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      />
    </article>
  );
};

export default PostLayout;
