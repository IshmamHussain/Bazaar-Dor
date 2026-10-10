import fallbackProducts from "./fallback-products.json";

const PRIMARY_API = "https://api.abcz.workers.dev/api/bazardor";
const BACKUP_API = "https://api.api-store.workers.dev/api/bazardor";

export async function fetchProducts(): Promise<any[]> {
  try {
    const res = await fetch(`${PRIMARY_API}/products`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {
    console.warn("Primary API failed:", err);
  }

  try {
    const res = await fetch(`${BACKUP_API}/products`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {
    console.warn("Backup API failed:", err);
  }

  return fallbackProducts;
}

export async function fetchProductById(id: string | number): Promise<any> {
  try {
    const res = await fetch(`${PRIMARY_API}/products/${id}`, { next: { revalidate: 3600 } });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Primary API product fetch failed:", err);
  }

  try {
    const res = await fetch(`${BACKUP_API}/products/${id}`, { next: { revalidate: 3600 } });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Backup API product fetch failed:", err);
  }

  const found = fallbackProducts.find(
    (p: any) => p.id.toString() === id.toString() || p.slug === id
  );
  return found || null;
}
