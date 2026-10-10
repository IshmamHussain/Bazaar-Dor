import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getProductIcon(slugOrName?: string, fallbackIcon: string = "🛒"): string {
  if (!slugOrName) return fallbackIcon;
  const key = slugOrName.toLowerCase();

  if (key.includes("chal") || key.includes("চাল")) return "🍚";

  if (key.includes("begun") || key.includes("বেগুন")) return "🍆";
  if (key.includes("peyaj") || key.includes("পেঁয়াজ")) return "🧅";
  if (key.includes("alu") || key.includes("আলু")) return "🥔";
  if (key.includes("dhenders") || key.includes("ঢেঁড়স")) return "🥒";
  if (key.includes("kaccha-moric") || key.includes("কাঁচামরিচ")) return "🌶️";

  if (key.includes("dim") || key.includes("ডিম")) return "🥚";
  if (key.includes("mokhhan") || key.includes("মাখন")) return "🧈";
  if (key.includes("doi") || key.includes("দই")) return "🥣";
  if (key.includes("dudh") || key.includes("দুধ")) return "🥛";

  if (key.includes("ada") || key.includes("আদা")) return "🫚";
  if (key.includes("roshun") || key.includes("রসুন")) return "🧄";
  if (key.includes("morich-gunda") || key.includes("মরিচ গুঁড়া")) return "🌶️";
  if (key.includes("dhanepata") || key.includes("ধনেপাতা")) return "🌿";

  if (key.includes("chingri") || key.includes("চিংড়ি")) return "🦐";
  if (key.includes("telapiya") || key.includes("তেলাপিয়া") || key.includes("mach") || key.includes("মাছ") || key.includes("rui") || key.includes("ilish") || key.includes("katla")) return "🐟";

  if (key.includes("murgi") || key.includes("মুরগি") || key.includes("hanser") || key.includes("হাঁস")) return "🍗";
  if (key.includes("goru") || key.includes("গরু") || key.includes("khasir") || key.includes("খাসি") || key.includes("mangsho") || key.includes("মাংস")) return "🥩";

  if (key.includes("tel") || key.includes("তেল")) return "🥫";

  if (key.includes("dal") || key.includes("ডাল") || key.includes("chola") || key.includes("ছোলা")) return "🫘";

  return fallbackIcon;
}
