import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";

type Props = {
  posts: {
    frontMatter: any
    slug: string
  }[]
}

const CONTENTS_DIR_PATH = "./contents"

export const getStaticProps: GetStaticProps<Props> = () => {
  const files = fs.readdirSync(CONTENTS_DIR_PATH);
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(`${CONTENTS_DIR_PATH}/${fileName}`, "utf-8");
    const { data } = JSON.parse(JSON.stringify(matter(fileContent)));
    return {
      frontMatter: data,
      slug,
    };
  });

  return {
    props: {
      posts,
    },
  };
};


import Link from "next/link";

const Blog = ({ posts }: Props) => {
  return (
    <div>
      <p>一覧</p>
      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`/blog/${post.slug}`}>
            {post.frontMatter.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blog;
