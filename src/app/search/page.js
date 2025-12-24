import SearchClient from "./SearchClient";

export const metadata = {
  robots: {
    index: false,
    follow: true,
  },
  title: "搜索 - IMWIND",
  description: "搜索 IMWIND 技术博客文章",
};

export default async function Search({ searchParams }) {
  const { q = "" } = await searchParams;
  
  return <SearchClient initialQuery={q} />;
}

