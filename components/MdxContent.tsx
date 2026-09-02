import { MDXRemote } from "next-mdx-remote/rsc";
import { AdSlot } from "./AdSlot";
import { MdxImage } from "./MdxImage";

const components = {
  AdSlot,
  img: MdxImage,
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
