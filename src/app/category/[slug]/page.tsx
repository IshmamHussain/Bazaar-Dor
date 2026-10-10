import { CategoryProductList } from "@/components/CategoryProductList";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="min-h-screen">
      <CategoryProductList slug={slug} />
    </div>
  );
}
