export const instant = false;
import { CategoryProductList } from "@/components/CategoryProductList";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="min-h-screen">
      <CategoryProductList slug={slug} />
    </div>
  );
}
