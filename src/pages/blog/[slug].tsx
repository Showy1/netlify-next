import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

type Props = {
    frontMatter: any,
    content: any
}

export async function getStaticPaths() {
    const files = fs.readdirSync("./contents");
    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace(/\.md$/, ""),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    const file = fs.readFileSync(`./contents/${params.slug}.md`, "utf-8");
    const { data, content } = JSON.parse(JSON.stringify(matter(file)));
    return { props: { frontMatter: data, content } };
}

const Detail = ({ frontMatter, content }: Props) => {
    return (
        <div>
            <h1>{frontMatter.title}</h1>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
export default Detail