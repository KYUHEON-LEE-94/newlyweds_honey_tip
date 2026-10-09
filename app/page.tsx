import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getArticles } from "../lib/articles";
export const revalidate = 3600;
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default async function Home() {
  return <HomeClient articles={await getArticles()} />;
}
