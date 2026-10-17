import { HomeView } from "@/components/HomeView";
import { fetchProducts } from "@/lib/api";

export default async function Home() {
  const products = await fetchProducts();
  return <HomeView products={products} />;
}
