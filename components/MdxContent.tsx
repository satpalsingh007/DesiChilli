import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { AdSlot } from "./AdSlot";
import { MdxImage } from "./MdxImage";

const components = {
  AdSlot,
  img: MdxImage,
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="table-scroll">
      <table {...props} />
    </div>
  ),
};

/** GFM is what makes pipe tables in post bodies compile to real `<table>` markup. */
const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} options={options} />;
}
