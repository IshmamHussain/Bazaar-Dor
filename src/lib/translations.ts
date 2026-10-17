export type Language = "bn" | "en";

export interface Translations {
  appName: string;
  tagline: string;
  todayPricesGlance: string;
  heroBadgeDate: string;
  heroTitle: string;
  heroDescription: string;
  heroCta: string;
  risersTitle: string;
  fallersTitle: string;
  allProductsTitle: string;
  allProductsSubtitle: string;
  productsFound: (count: number) => string;
  sortLabel: string;
  sortDefault: string;
  sortAsc: string;
  sortDesc: string;
  todayPrice: string;
  todayAvgPrice: string;
  currency: string;
  unitPerKg: string;
  unitPerLitre: string;
  unitPerDozen: string;
  unitPerPiece: string;
  unitKg: string;
  unitLitre: string;
  unitDozen: string;
  unitPiece: string;
  noProductsTitle: string;
  noProductsDesc: string;
  backToHome: string;
  productSubtitle: string;
  priceSummary: string;
  lowestPrice: string;
  lowestPriceMarket: string;
  highestPrice: string;
  highestPriceMarket: string;
  avgPrice: string;
  avgPriceUnitDesc: (unitLabel: string) => string;
  marketWisePrices: string;
  thMarket: string;
  thDivision: string;
  thLowest: string;
  thHighest: string;
  profileTitle: string;
  signInTitle: string;
  signUpTitle: string;
  signIn: string;
  signUp: string;
  myProfile: string;
  signOut: string;
  signInSubtitle: string;
  signUpSubtitle: string;
  labelName: string;
  placeholderName: string;
  labelEmail: string;
  placeholderEmail: string;
  labelPassword: string;
  placeholderPassword: string;
  or: string;
  continueGoogle: string;
  continueGithub: string;
  noAccount: string;
  signUpLink: string;
  haveAccount: string;
  signInLink: string;
  profileSubtitle: string;
  userDefault: string;
  updateInfo: string;
  infoTitle: string;
  updateBtn: string;
  pleaseWait: string;
  notFoundTitle: string;
  notFoundDesc: string;
  footerLine1: string;
  footerLine2: string;
  toastProtected: string;
  toastLoginFailed: string;
  toastLoginSuccess: string;
  toastSocialFailed: (provider: string) => string;
  toastPassLength: string;
  toastRegFailed: string;
  toastRegSuccess: string;
  toastSignOutSuccess: string;
  toastSignOutFailed: string;
  toastNameEmpty: string;
  toastProfileSuccess: string;
  toastProfileError: string;
  toggleLangBtn: string;
  toggleLangTitle: string;
}

export const translations: Record<Language, Translations> = {
  bn: {
    appName: "বাজার দর",
    tagline: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।",
    todayPricesGlance: "আজকের বাজারের দাম এক নজরে",
    heroBadgeDate: "মঙ্গলবার, ৬ অক্টোবর, ২০২৬",
    heroTitle: "আজকের বাজারের দাম এক নজরে",
    heroDescription:
      "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।",
    heroCta: "সব পণ্য দেখুন",
    risersTitle: "আজ দাম বেড়েছে",
    fallersTitle: "আজ দাম কমেছে",
    allProductsTitle: "সব পণ্য",
    allProductsSubtitle: "নিত্যপ্রয়োজনীয় সকল পণ্যের বর্তমান বাজার দর",
    productsFound: (count) => `${count.toLocaleString("bn-BD")} টি পণ্য পাওয়া গেছে`,
    sortLabel: "সাজান:",
    sortDefault: "ডিফল্ট",
    sortAsc: "দাম: কম থেকে বেশি",
    sortDesc: "দাম: বেশি থেকে কম",
    todayPrice: "আজকের দাম",
    todayAvgPrice: "আজকের গড় দাম",
    currency: "টাকা",
    unitPerKg: "প্রতি কেজি",
    unitPerLitre: "প্রতি লিটার",
    unitPerDozen: "প্রতি ডজন",
    unitPerPiece: "প্রতি পিস",
    unitKg: "কেজি",
    unitLitre: "লিটার",
    unitDozen: "ডজন",
    unitPiece: "পিস",
    noProductsTitle: "কোনো পণ্য পাওয়া যায়নি",
    noProductsDesc: "আপনি যে ক্যাটাগরিটি খুঁজছেন তাতে কোনো পণ্য নেই বা এটি ভুল।",
    backToHome: "হোম পেজে ফিরে যান",
    productSubtitle:
      "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন ও সর্বোচ্চ হিসাব।",
    priceSummary: "দামের সারসংক্ষেপ",
    lowestPrice: "সর্বনিম্ন দাম",
    lowestPriceMarket: "সবচেয়ে কম দামের বাজার",
    highestPrice: "সর্বোচ্চ দাম",
    highestPriceMarket: "সবচেয়ে বেশি দামের বাজার",
    avgPrice: "গড় দাম",
    avgPriceUnitDesc: (unitLabel) => `${unitLabel} গড় হিসাব`,
    marketWisePrices: "বাজারভিত্তিক আজকের দাম",
    thMarket: "বাজার",
    thDivision: "বিভাগ",
    thLowest: "সর্বনিম্ন",
    thHighest: "সর্বোচ্চ",
    profileTitle: "আমার প্রোফাইল",
    signInTitle: "সাইন ইন",
    signUpTitle: "অ্যাকাউন্ট তৈরি করুন",
    signIn: "সাইন ইন",
    signUp: "সাইন আপ",
    myProfile: "আমার প্রোফাইল",
    signOut: "সাইন আউট",
    signInSubtitle: "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।",
    signUpSubtitle: "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন",
    labelName: "নাম",
    placeholderName: "আপনার নাম",
    labelEmail: "ইমেইল",
    placeholderEmail: "you@example.com",
    labelPassword: "পাসওয়ার্ড",
    placeholderPassword: "কমপক্ষে ৮ অক্ষর",
    or: "অথবা",
    continueGoogle: "Google দিয়ে চালিয়ে যান",
    continueGithub: "GitHub দিয়ে চালিয়ে যান",
    noAccount: "অ্যাকাউন্ট নেই?",
    signUpLink: "সাইন আপ করুন",
    haveAccount: "আগে থেকে অ্যাকাউন্ট আছে?",
    signInLink: "সাইন ইন করুন",
    profileSubtitle: "আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।",
    userDefault: "ইউজার",
    updateInfo: "তথ্য আপডেট করুন",
    infoTitle: "তথ্য",
    updateBtn: "আপডেট",
    pleaseWait: "অপেক্ষা করুন...",
    notFoundTitle: "৪০৪ - পৃষ্ঠা পাওয়া যায়নি",
    notFoundDesc:
      "আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ।",
    footerLine1: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।",
    footerLine2: "সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।",
    toastProtected: "পণ্য বিস্তারিত তথ্য দেখতে অনুগ্রহ করে আগে সাইন ইন করুন",
    toastLoginFailed: "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে",
    toastLoginSuccess: "লগইন সফল হয়েছে!",
    toastSocialFailed: (provider) => `${provider} সাইন ইন ব্যর্থ হয়েছে`,
    toastPassLength: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
    toastRegFailed: "রেজিস্ট্রেশন ব্যর্থ হয়েছে",
    toastRegSuccess: "রেজিস্ট্রেশন সফল হয়েছে!",
    toastSignOutSuccess: "সাইন আউট সফল হয়েছে",
    toastSignOutFailed: "সাইন আউট ব্যর্থ হয়েছে",
    toastNameEmpty: "নাম খালি রাখা যাবে না",
    toastProfileSuccess: "প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!",
    toastProfileError: "আপডেট করার সময় ত্রুটি হয়েছে",
    toggleLangBtn: "English",
    toggleLangTitle: "Switch to English",
  },
  en: {
    appName: "Bazar Dor",
    tagline: "Bazar Dor — Daily essential market prices at a glance.",
    todayPricesGlance: "Today's Market Prices at a Glance",
    heroBadgeDate: "Tuesday, October 6, 2026",
    heroTitle: "Today's Market Prices at a Glance",
    heroDescription:
      "Prices of rice, lentils, oil, vegetables, fish, meat, eggs, and spices — market-wise breakdown, average, min-max, and price trends all in one place.",
    heroCta: "View All Products",
    risersTitle: "Price Increased Today",
    fallersTitle: "Price Decreased Today",
    allProductsTitle: "All Products",
    allProductsSubtitle: "Current market prices of all daily essentials",
    productsFound: (count) => `${count.toLocaleString("en-US")} products found`,
    sortLabel: "Sort:",
    sortDefault: "Default",
    sortAsc: "Price: Low to High",
    sortDesc: "Price: High to Low",
    todayPrice: "Today's Price",
    todayAvgPrice: "Today's Average Price",
    currency: "Tk",
    unitPerKg: "Per kg",
    unitPerLitre: "Per litre",
    unitPerDozen: "Per dozen",
    unitPerPiece: "Per piece",
    unitKg: "kg",
    unitLitre: "litre",
    unitDozen: "dozen",
    unitPiece: "pc",
    noProductsTitle: "No products found",
    noProductsDesc: "The category you are looking for has no products or is invalid.",
    backToHome: "Return to Home Page",
    productSubtitle:
      "Prices of rice, lentils, oil, vegetables, fish, meat, eggs, and spices — market-wise breakdown, average, min & max calculations.",
    priceSummary: "Price Summary",
    lowestPrice: "Lowest Price",
    lowestPriceMarket: "Market with lowest price",
    highestPrice: "Highest Price",
    highestPriceMarket: "Market with highest price",
    avgPrice: "Average Price",
    avgPriceUnitDesc: (unitLabel) => `${unitLabel} average calculation`,
    marketWisePrices: "Today's Market-wise Prices",
    thMarket: "Market",
    thDivision: "Division",
    thLowest: "Lowest",
    thHighest: "Highest",
    profileTitle: "My Profile",
    signInTitle: "Sign In",
    signUpTitle: "Create Account",
    signIn: "Sign In",
    signUp: "Sign Up",
    myProfile: "My Profile",
    signOut: "Sign Out",
    signInSubtitle: "Sign in to view detailed prices, market comparisons, and profile.",
    signUpSubtitle: "Sign up for free to view all detailed prices",
    labelName: "Name",
    placeholderName: "Your name",
    labelEmail: "Email",
    placeholderEmail: "you@example.com",
    labelPassword: "Password",
    placeholderPassword: "At least 8 characters",
    or: "or",
    continueGoogle: "Continue with Google",
    continueGithub: "Continue with GitHub",
    noAccount: "Don't have an account?",
    signUpLink: "Sign up",
    haveAccount: "Already have an account?",
    signInLink: "Sign in",
    profileSubtitle: "View your account details here.",
    userDefault: "User",
    updateInfo: "Update Profile",
    infoTitle: "Information",
    updateBtn: "Update",
    pleaseWait: "Please wait...",
    notFoundTitle: "404 - Page Not Found",
    notFoundDesc:
      "The page you are looking for has been removed, renamed, or is temporarily unavailable.",
    footerLine1: "Bazar Dor — Daily essential market prices at a glance.",
    footerLine2: "All prices are approximate; subject to change based on market conditions.",
    toastProtected: "Please sign in first to view product details",
    toastLoginFailed: "Invalid email or password",
    toastLoginSuccess: "Login successful!",
    toastSocialFailed: (provider) => `${provider} sign in failed`,
    toastPassLength: "Password must be at least 6 characters",
    toastRegFailed: "Registration failed",
    toastRegSuccess: "Registration successful!",
    toastSignOutSuccess: "Signed out successfully",
    toastSignOutFailed: "Sign out failed",
    toastNameEmpty: "Name cannot be empty",
    toastProfileSuccess: "Profile updated successfully!",
    toastProfileError: "An error occurred while updating profile",
    toggleLangBtn: "বাংলা",
    toggleLangTitle: "বাংলায় পরিবর্তন করুন",
  },
};

export const productTranslations: Record<string, string> = {
  // Slugs
  "sorno-machi-chal": "Sorno Machi Rice",
  "miniket-chal": "Miniket Rice",
  "nazir-chal": "Nazir Rice",
  "batam-size-chal": "Batam Size Rice",
  "mosur-dal": "Red Lentils (Mosur Dal)",
  "mug-dal": "Moong Dal",
  "chola-dal": "Chickpeas (Chola)",
  "aman-dal-khosasila": "Aman Lentils (Hulled)",
  "sorishar-tel": "Mustard Oil",
  "pam-tel": "Palm Oil",
  "ghani-banga-sorishar-tel": "Cold-Pressed Mustard Oil",
  "alu": "Potato",
  "peyaj": "Onion",
  "kaccha-moric": "Green Chili",
  "begun": "Eggplant",
  "dhenders": "Okra (Lady's Finger)",
  "rui-mach": "Rui Fish",
  "telapiya-mach": "Tilapia Fish",
  "ilish-mach": "Hilsa Fish",
  "katla-mach": "Katla Fish",
  "chingri-mach": "Shrimp (Prawn)",
  "murgi-r-mangsho": "Chicken",
  "goru-r-mangsho": "Beef",
  "khasir-mangsho": "Mutton",
  "hanser-mangsho": "Duck Meat",
  "dim": "Eggs",
  "dui-dudh": "Milk",
  "doi": "Yogurt",
  "mokhhan": "Butter (100g)",
  "ada": "Ginger",
  "roshun": "Garlic",
  "morich-gunda": "Chili Powder",
  "dhanepata-gunda": "Coriander Powder",

  // Bengali Names
  "স্বর্ণমাছি চাল": "Sorno Machi Rice",
  "মিনিকেট চাল": "Miniket Rice",
  "নাজির চাল": "Nazir Rice",
  "বাটাম সাইজ চাল": "Batam Size Rice",
  "মসুর ডাল": "Red Lentils (Mosur Dal)",
  "মুগ ডাল": "Moong Dal",
  "ছোলা": "Chickpeas (Chola)",
  "আমন ডাল (খোসাসিলা)": "Aman Lentils (Hulled)",
  "সরিষার তেল": "Mustard Oil",
  "পাম তেল": "Palm Oil",
  "ঘানি ভাঙা সরিষার তেল": "Cold-Pressed Mustard Oil",
  "আলু": "Potato",
  "পেঁয়াজ": "Onion",
  "কাঁচামরিচ": "Green Chili",
  "বেগুন": "Eggplant",
  "ঢেঁড়স": "Okra (Lady's Finger)",
  "রুই মাছ": "Rui Fish",
  "তেলাপিয়া": "Tilapia Fish",
  "ইলিশ মাছ": "Hilsa Fish",
  "কাতলা মাছ": "Katla Fish",
  "চিংড়ি মাছ (খোলা)": "Shrimp (Prawn)",
  "মুরগির মাংস": "Chicken",
  "গরুর মাংস": "Beef",
  "খাসির মাংস": "Mutton",
  "হাঁসের মাংস": "Duck Meat",
  "ডিম": "Eggs",
  "দুধ": "Milk",
  "দই": "Yogurt",
  "মাখন (১০০ গ্রাম)": "Butter (100g)",
  "আদা": "Ginger",
  "রসুন": "Garlic",
  "মরিচ গুঁড়া": "Chili Powder",
  "ধনেপাতা গুঁড়া": "Coriander Powder",
};

export const categoryTranslations: Record<string, { bn: string; en: string }> = {
  chal: { bn: "চাল", en: "Rice" },
  dal: { bn: "ডাল", en: "Lentils" },
  tel: { bn: "তেল", en: "Oil" },
  sobji: { bn: "সবজি", en: "Vegetables" },
  mach: { bn: "মাছ", en: "Fish" },
  mangsho: { bn: "মাংস", en: "Meat" },
  "dim-dui": { bn: "ডিম-দুধ", en: "Dairy & Eggs" },
  mosla: { bn: "মসলা", en: "Spices" },

  // By Bangla name
  "চাল": { bn: "চাল", en: "Rice" },
  "ডাল": { bn: "ডাল", en: "Lentils" },
  "তেল": { bn: "তেল", en: "Oil" },
  "সবজি": { bn: "সবজি", en: "Vegetables" },
  "মাছ": { bn: "মাছ", en: "Fish" },
  "মাংস": { bn: "মাংস", en: "Meat" },
  "ডিম-দুধ": { bn: "ডিম-দুধ", en: "Dairy & Eggs" },
  "মসলা": { bn: "মসলা", en: "Spices" },
};

export const marketTranslations: Record<string, string> = {
  "কারওয়ান বাজার": "Karwan Bazar",
  "গ্রীন মার্কেট, মিরপুর": "Green Market, Mirpur",
  "চৌদগ্রাম বাজার": "Chouddagram Bazar",
  "আমতলী বাজার": "Amtoli Bazar",
  "সদর বাজার": "Sadar Bazar",
  "বাসারহাট বাজার": "Basarhat Bazar",
  "মাঠ বাজার": "Math Bazar",
  "চৌর বাজার": "Chour Bazar",
  "বাজারহাট": "Bazarhat",
  "ডবলগেট বাজার": "Double Gate Bazar",
  "আমবাজার": "Ambazar",
  "চৌরাস্তা বাজার": "Chowrasta Bazar",
};

export const divisionTranslations: Record<string, string> = {
  "ঢাকা": "Dhaka",
  "চট্টগ্রাম": "Chattogram",
  "রাজশাহী": "Rajshahi",
  "ময়মনসিংহ": "Mymensingh",
  "খুলনা": "Khulna",
  "সিলেট": "Sylhet",
};
