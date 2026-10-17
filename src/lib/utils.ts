import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getProductIcon(slugOrName?: string, fallbackIcon: string = "🛒"): string {
  if (!slugOrName) return fallbackIcon;
  const key = slugOrName.toLowerCase();

  if (key.includes("chal") || key.includes("চাল") || key.includes("rice")) return "🍚";

  if (key.includes("begun") || key.includes("বেগুন") || key.includes("eggplant")) return "🍆";
  if (key.includes("peyaj") || key.includes("পেঁয়াজ") || key.includes("onion")) return "🧅";
  if (key.includes("alu") || key.includes("আলু") || key.includes("potato")) return "🥔";
  if (key.includes("dhenders") || key.includes("ঢেঁড়স") || key.includes("okra") || key.includes("lady")) return "🥒";
  if (key.includes("kaccha-moric") || key.includes("কাঁচামরিচ") || key.includes("green chili")) return "🌶️";

  if (key.includes("dim") || key.includes("ডিম") || key.includes("egg")) return "🥚";
  if (key.includes("mokhhan") || key.includes("মাখন") || key.includes("butter")) return "🧈";
  if (key.includes("doi") || key.includes("দই") || key.includes("yogurt")) return "🥣";
  if (key.includes("dudh") || key.includes("দুধ") || key.includes("milk")) return "🥛";

  if (key.includes("ada") || key.includes("আদা") || key.includes("ginger")) return "🫚";
  if (key.includes("roshun") || key.includes("রসুন") || key.includes("garlic")) return "🧄";
  if (key.includes("morich") || key.includes("মরিচ") || key.includes("chili")) return "🌶️";
  if (key.includes("dhanepata") || key.includes("ধনেপাতা") || key.includes("coriander")) return "🌿";

  if (key.includes("chingri") || key.includes("চিংড়ি") || key.includes("shrimp") || key.includes("prawn")) return "🦐";
  if (key.includes("telapiya") || key.includes("তেলাপিয়া") || key.includes("mach") || key.includes("মাছ") || key.includes("rui") || key.includes("ilish") || key.includes("katla") || key.includes("fish")) return "🐟";

  if (key.includes("murgi") || key.includes("মুরগি") || key.includes("hanser") || key.includes("হাঁস") || key.includes("chicken") || key.includes("duck")) return "🍗";
  if (key.includes("goru") || key.includes("গরু") || key.includes("khasir") || key.includes("খাসি") || key.includes("mangsho") || key.includes("মাংস") || key.includes("beef") || key.includes("mutton") || key.includes("meat")) return "🥩";

  if (key.includes("tel") || key.includes("তেল") || key.includes("oil")) return "🥫";

  if (key.includes("dal") || key.includes("ডাল") || key.includes("chola") || key.includes("ছোলা") || key.includes("lentil") || key.includes("chickpea")) return "🫘";

  return fallbackIcon;
}
