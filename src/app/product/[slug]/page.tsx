import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { fetchProductById, fetchProducts } from "@/lib/api";
import { ProductDetailView } from "@/components/ProductDetailView";

export const dynamic = "force-dynamic";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductDetail {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets?: Market[];
}

async function getProduct(slug: string): Promise<ProductDetail | null> {
  let targetId = slug;

  if (!/^\d+$/.test(slug)) {
    const allProducts = await fetchProducts();
    const found = allProducts.find(
      (p: { slug: string; id: number }) => p.slug === slug || p.id.toString() === slug
    );
    if (found) {
      targetId = found.id.toString();
    }
  }

  return await fetchProductById(targetId);
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/signin?redirect=protected");
  }

  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return <ProductDetailView product={product} />;
}
