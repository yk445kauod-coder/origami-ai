// Full Azura Cafe Menu — sourced from official PDF menu (azura-menu.pages.dev)
// DO NOT edit manually — use admin panel or forceReseedMenu() to update Firebase

export const MENU_VERSION = 3; // Bump this to trigger auto-reseed in all clients

const IMG = ""; // Item images are intentionally blank — only category banners are displayed

export const fullMenuData: Record<string, Record<string, {
    name: string; nameAr: string; description: string; descriptionAr: string;
    price: number; category: string; categoryAr: string; available: boolean; image: string; recommended?: boolean;
    ingredients?: string[]; ingredientsAr?: string[];
  }>> = {

  // ─── NEW ITEMS ────────────────────────────────────────────────────────────
  "new_items": {
    "chicken-butterfly": {
      name: "Chicken Butterfly", nameAr: "تشيكن بتر فلاي",
      description: "Crispy butterfly chicken fillet", descriptionAr: "فيليه تشيكن بتر فلاي كريسبي",
      price: 336, category: "new_items", categoryAr: "جديد", available: true, image: IMG, recommended: true,
    },
    "chicken-lemon-pasta": {
      name: "Chicken Lemon Pasta", nameAr: "تشيكن ليمون باستا",
      description: "Pasta with grilled chicken and lemon sauce", descriptionAr: "باستا مع فراخ جريل وصوص ليمون",
      price: 234, category: "new_items", categoryAr: "جديد", available: true, image: IMG, recommended: true,
    },
    "dynamite-chicken": {
      name: "Dynamite Chicken", nameAr: "دايمنت تشيكن",
      description: "Crispy chicken tossed in dynamite sauce", descriptionAr: "تشيكن كريسبي في صوص دايمنت",
      price: 178, category: "new_items", categoryAr: "جديد", available: true, image: IMG, recommended: true,
    },
  },

  // ─── BREAKFAST ────────────────────────────────────────────────────────────
  "breakfast": {
    "azura-breakfast": {
      name: "Azura Breakfast", nameAr: "ازورا بريك فاست",
      description: "Azura special breakfast plate", descriptionAr: "طبق فطار مميز من ازورا",
      price: 204, category: "breakfast", categoryAr: "إفطار", available: true, image: IMG,
    },
    "mexican-breakfast": {
      name: "Mexican Breakfast", nameAr: "ميكسكان بريك فاست",
      description: "Mexican style breakfast", descriptionAr: "فطار على الطريقة المكسيكية",
      price: 174, category: "breakfast", categoryAr: "إفطار", available: true, image: IMG,
    },
    "greek-breakfast": {
      name: "Greek Breakfast", nameAr: "جريك بريك فاست",
      description: "Greek style breakfast", descriptionAr: "فطار على الطريقة اليونانية",
      price: 189, category: "breakfast", categoryAr: "إفطار", available: true, image: IMG,
    },
  },

  // ─── TOAST ────────────────────────────────────────────────────────────────
  "toast": {
    "triple-s": {
      name: "Triple S", nameAr: "تربل اس",
      description: "Triple S toast sandwich", descriptionAr: "توست تربل اس",
      price: 218, category: "toast", categoryAr: "توست", available: true, image: IMG,
    },
    "chicken-cheese-toast": {
      name: "Chicken Cheese", nameAr: "تشيكن تشيز",
      description: "Chicken and cheese toast", descriptionAr: "توست تشيكن وتشيز",
      price: 219, category: "toast", categoryAr: "توست", available: true, image: IMG,
    },
    "mix-cheese-toast": {
      name: "Mix Cheese", nameAr: "ميكس تشيز",
      description: "Mixed cheese toast", descriptionAr: "توست ميكس تشيز",
      price: 147, category: "toast", categoryAr: "توست", available: true, image: IMG,
    },
    "tuna-toast": {
      name: "Tuna", nameAr: "تونه",
      description: "Tuna toast", descriptionAr: "توست تونه",
      price: 194, category: "toast", categoryAr: "توست", available: true, image: IMG,
    },
  },

  // ─── CROISSANT ────────────────────────────────────────────────────────────
  "croissant": {
    "classic-croissant": {
      name: "Classic Croissant", nameAr: "كلاسيك كرواسون",
      description: "Classic butter croissant", descriptionAr: "كرواسون كلاسيك زبدة",
      price: 71, category: "croissant", categoryAr: "كرواسون", available: true, image: IMG,
    },
    "mix-cheese-croissant": {
      name: "Mix Cheese Croissant", nameAr: "ميكس تشيز كرواسون",
      description: "Croissant with mixed cheese", descriptionAr: "كرواسون بالجبنة المشكلة",
      price: 114, category: "croissant", categoryAr: "كرواسون", available: true, image: IMG,
    },
    "azura-croissant": {
      name: "Azura Croissant", nameAr: "ازورا كرواسون",
      description: "Azura special croissant", descriptionAr: "كرواسون أزورا المميز",
      price: 149, category: "croissant", categoryAr: "كرواسون", available: true, image: IMG,
    },
  },

  // ─── SOUPS ────────────────────────────────────────────────────────────────
  "soups": {
    "tomato-basil": {
      name: "Tomato & Basil", nameAr: "طماطم بالريحان",
      description: "Creamy tomato and basil soup", descriptionAr: "شوربة طماطم كريمي بالريحان",
      price: 93, category: "soups", categoryAr: "شوربة", available: true, image: IMG,
      ingredients: ["tomatoes", "basil", "cream"], ingredientsAr: ["طماطم", "ريحان", "كريمة"],
    },
    "mushroom-cream": {
      name: "Mushroom Cream", nameAr: "كريمه مشروم",
      description: "Creamy mushroom soup", descriptionAr: "شوربة مشروم كريمية",
      price: 102, category: "soups", categoryAr: "شوربة", available: true, image: IMG,
      ingredients: ["mushrooms", "cream", "butter"], ingredientsAr: ["مشروم", "كريمة", "زبدة"],
    },
    "creamy-chicken": {
      name: "Creamy Chicken", nameAr: "تشيكن كريمي",
      description: "Creamy chicken soup", descriptionAr: "شوربة تشيكن كريمية",
      price: 113, category: "soups", categoryAr: "شوربة", available: true, image: IMG,
      ingredients: ["chicken", "cream", "vegetables"], ingredientsAr: ["فراخ", "كريمة", "خضار"],
    },
    "creamy-chicken-mushroom": {
      name: "Creamy Chicken Mushroom", nameAr: "تشيكن كريمي مشروم",
      description: "Creamy chicken and mushroom soup", descriptionAr: "شوربة تشيكن ومشروم كريمية",
      price: 149, category: "soups", categoryAr: "شوربة", available: true, image: IMG,
      ingredients: ["chicken", "mushrooms", "cream"], ingredientsAr: ["فراخ", "مشروم", "كريمة"],
    },
  },

  // ─── APPETIZERS ───────────────────────────────────────────────────────────
  "appetizers": {
    "fries": {
      name: "Fries", nameAr: "فرايز",
      description: "Crispy golden fries", descriptionAr: "فرايز ذهبية مقرمشة",
      price: 86, category: "appetizers", categoryAr: "مقبلات", available: true, image: IMG,
    },
    "cheese-fries": {
      name: "Cheese Fries", nameAr: "تشيز فرايز",
      description: "Fries topped with melted cheese sauce", descriptionAr: "فرايز مع صوص جبنة",
      price: 106, category: "appetizers", categoryAr: "مقبلات", available: true, image: IMG,
      ingredients: ["fries", "cheese sauce"], ingredientsAr: ["فرايز", "صوص جبنة"],
    },
    "beef-quesadilla": {
      name: "Beef Quesadilla", nameAr: "كاسديا بيف",
      description: "Beef quesadilla", descriptionAr: "كاسديا بيف",
      price: 211, category: "appetizers", categoryAr: "مقبلات", available: true, image: IMG,
    },
    "chicken-quesadilla": {
      name: "Chicken Quesadilla", nameAr: "كاسديا تشيكن",
      description: "Chicken quesadilla", descriptionAr: "كاسديا تشيكن",
      price: 212, category: "appetizers", categoryAr: "مقبلات", available: true, image: IMG,
    },
    "nachos": {
      name: "Nachos", nameAr: "ناتشوز",
      description: "Dorito chips with beef bacon, ranch, cheddar mix, cheese sauce", descriptionAr: "دوريتو شيبس - بيف بيكون - رانش - ميكس شيدر - صوص جبنة",
      price: 128, category: "appetizers", categoryAr: "مقبلات", available: true, image: IMG,
      ingredients: ["dorito chips", "beef bacon", "ranch", "cheddar", "cheese sauce"],
      ingredientsAr: ["دوريتو شيبس", "بيف بيكون", "رانش", "ميكس شيدر", "صوص جبنة"],
    },
    "chicken-fries": {
      name: "Chicken Fries", nameAr: "تشيكن فرايز",
      description: "Crispy chicken, fries, honey mustard sauce, cheese sauce", descriptionAr: "تشيكن كريسبي - فرايز - هوني ماسترد صوص - صوص جبنة",
      price: 202, category: "appetizers", categoryAr: "مقبلات", available: true, image: IMG,
      ingredients: ["crispy chicken", "fries", "honey mustard sauce", "cheese sauce"],
      ingredientsAr: ["تشيكن كريسبي", "فرايز", "هوني ماسترد صوص", "صوص جبنة"],
    },
    "chili-texas-fries": {
      name: "Chili Texas Fries", nameAr: "شيلي تكساس فرايز",
      description: "Beef bacon, jalapeños, fries, sweet chili sauce, cheese sauce, Texas sauce", descriptionAr: "بيف بيكون - هالبينو - فرايز - سويت شيلي صوص - صوص جبنة - صوص تكساس",
      price: 159, category: "appetizers", categoryAr: "مقبلات", available: true, image: IMG,
      ingredients: ["beef bacon", "jalapeños", "fries", "sweet chili sauce", "cheese sauce", "Texas sauce"],
      ingredientsAr: ["بيف بيكون", "هالبينو", "فرايز", "سويت شيلي صوص", "صوص جبنة", "صوص تكساس"],
    },
    "mozzarella-steak": {
      name: "Mozzarella Steak", nameAr: "موتزريلا استيك",
      description: "Crispy mozzarella steak sticks", descriptionAr: "موتزريلا استيك مقلية",
      price: 96, category: "appetizers", categoryAr: "مقبلات", available: true, image: IMG,
    },
    "strips": {
      name: "Strips", nameAr: "ستريبس",
      description: "Crispy chicken strips", descriptionAr: "ستريبس دجاج كريسبي",
      price: 189, category: "appetizers", categoryAr: "مقبلات", available: true, image: IMG,
    },
    "onion-rings": {
      name: "Onion Rings", nameAr: "حلقات بصل",
      description: "Crispy fried onion rings", descriptionAr: "حلقات بصل مقلية مقرمشة",
      price: 88, category: "appetizers", categoryAr: "مقبلات", available: true, image: IMG,
    },
    "azura-plate": {
      name: "Azura Plate", nameAr: "ازورا بليت",
      description: "Mozzarella sticks, strips, onion rings, fries, nachos with three sauces of your choice", descriptionAr: "موتزريلا ستيك - ستريبس - حلقات بصل - فرايز - ناتشوز مع ثلاث صوصات من اختيارك",
      price: 256, category: "appetizers", categoryAr: "مقبلات", available: true, image: IMG, recommended: true,
      ingredients: ["mozzarella sticks", "strips", "onion rings", "fries", "nachos", "3 sauces"],
      ingredientsAr: ["موتزريلا ستيك", "ستريبس", "حلقات بصل", "فرايز", "ناتشوز", "٣ صوصات"],
    },
    "baked-potato": {
      name: "Baked Potato", nameAr: "بيكد بوتيتو",
      description: "Oven baked potato", descriptionAr: "بطاطس مخبوزة في الفرن",
      price: 92, category: "appetizers", categoryAr: "مقبلات", available: true, image: IMG,
    },
    "azura-potato": {
      name: "Azura Potato", nameAr: "ازورا بوتيتو",
      description: "Mash potato, smoked turkey, olives, cheddar mix, mozzarella, ranch sauce", descriptionAr: "ماش بوتيتو - سموك تركي - زيتون - ميكس شيدر - موتزريلا - صوص رانش",
      price: 123, category: "appetizers", categoryAr: "مقبلات", available: true, image: IMG,
      ingredients: ["mash potato", "smoked turkey", "olives", "cheddar mix", "mozzarella", "ranch sauce"],
      ingredientsAr: ["ماش بوتيتو", "سموك تركي", "زيتون", "ميكس شيدر", "موتزريلا", "صوص رانش"],
    },
  },

  // ─── SALADS ───────────────────────────────────────────────────────────────
  "salads": {
    "greek-salad": {
      name: "Greek Salad", nameAr: "جريك سالاط",
      description: "Lettuce, cucumber, tomatoes, Greek cheese, thyme, olive oil", descriptionAr: "خس - خيار - طماطم - جبنة جريك - زعتر - زيت زيتون",
      price: 133, category: "salads", categoryAr: "سلطات", available: true, image: IMG,
      ingredients: ["lettuce", "cucumber", "tomatoes", "Greek cheese", "thyme", "olive oil"],
      ingredientsAr: ["خس", "خيار", "طماطم", "جبنة جريك", "زعتر", "زيت زيتون"],
    },
    "chicken-caesar-salad": {
      name: "Chicken Caesar Salad", nameAr: "تشيكن سيزر سالاط",
      description: "Lettuce, grilled chicken, croutons, Caesar dressing, Parmesan cheese", descriptionAr: "خس - فراخ جريل - عيش كريتون - صوص سيزر - جبنة بارميزان",
      price: 204, category: "salads", categoryAr: "سلطات", available: true, image: IMG, recommended: true,
      ingredients: ["lettuce", "grilled chicken", "croutons", "Caesar dressing", "Parmesan"],
      ingredientsAr: ["خس", "فراخ جريل", "عيش كريتون", "صوص سيزر", "جبنة بارميزان"],
    },
    "rocca-salad": {
      name: "Rocca Salad", nameAr: "روكا سالاط",
      description: "Lettuce, arugula, hazelnuts, fresh mushrooms, colored peppers, Parmesan cheese", descriptionAr: "خس - جرجير - بندق - مشروم فريش - فلفل الوان - جبنة بارميزان",
      price: 124, category: "salads", categoryAr: "سلطات", available: true, image: IMG,
      ingredients: ["lettuce", "arugula", "hazelnuts", "fresh mushrooms", "colored peppers", "Parmesan"],
      ingredientsAr: ["خس", "جرجير", "بندق", "مشروم فريش", "فلفل الوان", "جبنة بارميزان"],
    },
    "california-salad": {
      name: "California Salad", nameAr: "كاليفورنيا سالاط",
      description: "Lettuce, colored peppers, cucumber, cheddar mix, grilled chicken, sweet corn, Hawaiian sauce", descriptionAr: "خس - فلفل الوان - خيار - ميكس شيدر - فراخ جريل - سويت كورن - هاواي صوص",
      price: 193, category: "salads", categoryAr: "سلطات", available: true, image: IMG,
      ingredients: ["lettuce", "colored peppers", "cucumber", "cheddar mix", "grilled chicken", "sweet corn", "Hawaiian sauce"],
      ingredientsAr: ["خس", "فلفل الوان", "خيار", "ميكس شيدر", "فراخ جريل", "سويت كورن", "هاواي صوص"],
    },
    "azura-disco-salad": {
      name: "Azura Disco Salad", nameAr: "ازورا ديسكو سالاط",
      description: "Lettuce, crispy chicken, smoked turkey, smoked beef, colored peppers, cheddar mix, nachos, honey mustard sauce", descriptionAr: "خس - فراخ كريسبي - سموك تركي - سموك بيف - فلفل الوان - ميكس شيدر - ناتشوز - هوني ماسترد صوص",
      price: 248, category: "salads", categoryAr: "سلطات", available: true, image: IMG, recommended: true,
      ingredients: ["lettuce", "crispy chicken", "smoked turkey", "smoked beef", "colored peppers", "cheddar mix", "nachos", "honey mustard sauce"],
      ingredientsAr: ["خس", "فراخ كريسبي", "سموك تركي", "سموك بيف", "فلفل الوان", "ميكس شيدر", "ناتشوز", "هوني ماسترد صوص"],
    },
    "tuna-salad": {
      name: "Tuna Salad", nameAr: "تونه سالاط",
      description: "Tuna, mayonnaise, colored pepper, onion, olives, lettuce", descriptionAr: "تونه - مايونيز - فلفل الوان - بصل - زيتون - خس",
      price: 206, category: "salads", categoryAr: "سلطات", available: true, image: IMG,
      ingredients: ["tuna", "mayonnaise", "colored pepper", "onion", "olives", "lettuce"],
      ingredientsAr: ["تونه", "مايونيز", "فلفل الوان", "بصل", "زيتون", "خس"],
    },
  },

  // ─── PASTA ────────────────────────────────────────────────────────────────
  "pasta": {
    "alfredo-pasta": {
      name: "Alfredo Pasta", nameAr: "باستا الفريدو",
      description: "Creamy alfredo sauce pasta", descriptionAr: "باستا بصوص الفريدو الكريمي",
      price: 249, category: "pasta", categoryAr: "مكرونة", available: true, image: IMG,
    },
    "negresco": {
      name: "Negresco", nameAr: "نجرسكو",
      description: "Negresco pasta", descriptionAr: "باستا نجرسكو",
      price: 258, category: "pasta", categoryAr: "مكرونة", available: true, image: IMG,
    },
    "mac-and-cheese": {
      name: "Mac and Cheese", nameAr: "ماك اند تشيز",
      description: "Creamy mac and cheese", descriptionAr: "ماك اند تشيز كريمي",
      price: 247, category: "pasta", categoryAr: "مكرونة", available: true, image: IMG,
    },
    "pesto-pasta": {
      name: "Pesto Pasta", nameAr: "بيستو باستا",
      description: "Pasta with basil pesto sauce", descriptionAr: "باستا بصوص البيستو",
      price: 216, category: "pasta", categoryAr: "مكرونة", available: true, image: IMG,
    },
    "chicken-gravy-pasta": {
      name: "Chicken Gravy Pasta", nameAr: "باستا تشيكن جريفي",
      description: "Pasta with chicken gravy sauce", descriptionAr: "باستا تشيكن جريفي",
      price: 206, category: "pasta", categoryAr: "مكرونة", available: true, image: IMG,
    },
    "beef-stroganoff-pasta": {
      name: "Beef Stroganoff Pasta", nameAr: "باستا بيف ستراجنوف",
      description: "Pasta with beef stroganoff sauce", descriptionAr: "باستا بيف ستراجنوف",
      price: 279, category: "pasta", categoryAr: "مكرونة", available: true, image: IMG, recommended: true,
    },
    "azura-spicy-pasta": {
      name: "Azura Spicy Pasta", nameAr: "باستا ازورا سبايسي",
      description: "Jalapeño, spices, white sauce, pepperoni, sweet chili", descriptionAr: "هالبينو - توابل - وايت صوص - بيروني - سويت شيلي",
      price: 189, category: "pasta", categoryAr: "مكرونة", available: true, image: IMG,
      ingredients: ["jalapeño", "spices", "white sauce", "pepperoni", "sweet chili"],
      ingredientsAr: ["هالبينو", "توابل", "وايت صوص", "بيروني", "سويت شيلي"],
    },
    "pasta-arrabbiata": {
      name: "Pasta Arrabbiata", nameAr: "باستا اربيتا",
      description: "Spicy tomato arrabbiata pasta", descriptionAr: "باستا اربيتا بالصوص الحار",
      price: 165, category: "pasta", categoryAr: "مكرونة", available: true, image: IMG,
    },
    "pasta-forno": {
      name: "Pasta Forno", nameAr: "باستا فورنو",
      description: "Oven baked pasta forno", descriptionAr: "باستا فورنو بالفرن",
      price: 204, category: "pasta", categoryAr: "مكرونة", available: true, image: IMG,
    },
    "spaghetti-bolognese": {
      name: "Spaghetti Bolognese", nameAr: "سباجتي بولنيز",
      description: "Classic spaghetti bolognese", descriptionAr: "سباجتي بولنيز كلاسيك",
      price: 197, category: "pasta", categoryAr: "مكرونة", available: true, image: IMG,
    },
    "cheese-ranch-pasta": {
      name: "Cheese Ranch Pasta", nameAr: "باستا تشيز رانش",
      description: "Cheese mix, crispy chicken, ranch sauce", descriptionAr: "ميكس جبن - فراخ كريسبي - صوص رانش",
      price: 238, category: "pasta", categoryAr: "مكرونة", available: true, image: IMG,
      ingredients: ["cheese mix", "crispy chicken", "ranch sauce"],
      ingredientsAr: ["ميكس جبن", "فراخ كريسبي", "صوص رانش"],
    },
    "mammo-pasta": {
      name: "Mammo Pasta", nameAr: "مامو باستا",
      description: "Crispy chicken, red sauce spaghetti, Parmesan cheese", descriptionAr: "فراخ كريسبي - مكرونه ريد صوص سباجتي - جبنة بارميزان",
      price: 196, category: "pasta", categoryAr: "مكرونة", available: true, image: IMG,
      ingredients: ["crispy chicken", "red sauce spaghetti", "Parmesan"],
      ingredientsAr: ["فراخ كريسبي", "مكرونه ريد صوص سباجتي", "جبنة بارميزان"],
    },
  },

  // ─── TORTILLA SANDWICHES ──────────────────────────────────────────────────
  "tortilla": {
    "crispy-chicken-tortilla": {
      name: "Crispy Chicken", nameAr: "تشيكن كريسبي",
      description: "Crispy chicken, honey mustard sauce, lettuce, tomatoes, cheese sauce", descriptionAr: "فراخ كريسبي - صوص هوني ماستر - خس - طماطم - صوص جبنة",
      price: 187, category: "tortilla", categoryAr: "تورتيلا ساندوتش", available: true, image: IMG,
      ingredients: ["crispy chicken", "honey mustard sauce", "lettuce", "tomatoes", "cheese sauce"],
      ingredientsAr: ["فراخ كريسبي", "صوص هوني ماستر", "خس", "طماطم", "صوص جبنة"],
    },
    "chicken-ranch-tortilla": {
      name: "Chicken Ranch", nameAr: "تشيكن رانش",
      description: "Grilled chicken, colored pepper, mushroom, mozzarella, ranch sauce", descriptionAr: "فراخ جريل - فلفل الوان - مشروم - موتز ريلا - صوص رانش",
      price: 206, category: "tortilla", categoryAr: "تورتيلا ساندوتش", available: true, image: IMG,
      ingredients: ["grilled chicken", "colored pepper", "mushroom", "mozzarella", "ranch sauce"],
      ingredientsAr: ["فراخ جريل", "فلفل الوان", "مشروم", "موتز ريلا", "صوص رانش"],
    },
    "mexicans-tortilla": {
      name: "Mexicans", nameAr: "مكسيكان",
      description: "Grilled chicken, jalapeño, sweet chili, lettuce, mixed cheddar", descriptionAr: "فراخ جريل - هالبينو - سويت شيلي - خس - مكس شيدر",
      price: 219, category: "tortilla", categoryAr: "تورتيلا ساندوتش", available: true, image: IMG,
      ingredients: ["grilled chicken", "jalapeño", "sweet chili", "lettuce", "mixed cheddar"],
      ingredientsAr: ["فراخ جريل", "هالبينو", "سويت شيلي", "خس", "مكس شيدر"],
    },
    "fillet-cheese-steak-tortilla": {
      name: "Fillet Cheese Steak", nameAr: "فلي تشيز ستيك",
      description: "Emansieh meat, colored peppers, mushrooms, onions, brown sauce, cheese", descriptionAr: "لحم امانسيه - فلفل الوان - مشروم - بصل - براون صوص - جبنة",
      price: 256, category: "tortilla", categoryAr: "تورتيلا ساندوتش", available: true, image: IMG, recommended: true,
      ingredients: ["Emansieh meat", "colored peppers", "mushrooms", "onions", "brown sauce", "cheese"],
      ingredientsAr: ["لحم امانسيه", "فلفل الوان", "مشروم", "بصل", "براون صوص", "جبنة"],
    },
    "chicken-bacon-tortilla": {
      name: "Chicken Bacon", nameAr: "تشيكن بيكون",
      description: "Grilled chicken, beef bacon, caramelized onions, cheddar mix", descriptionAr: "فراخ جريل - بيف بيكون - بصل مكرمل - مكس شيدر",
      price: 234, category: "tortilla", categoryAr: "تورتيلا ساندوتش", available: true, image: IMG,
      ingredients: ["grilled chicken", "beef bacon", "caramelized onions", "cheddar mix"],
      ingredientsAr: ["فراخ جريل", "بيف بيكون", "بصل مكرمل", "مكس شيدر"],
    },
  },

  // ─── VINA SANDWICHES ──────────────────────────────────────────────────────
  "toast_sandwiches": {
    "grilled-chicken-vina": {
      name: "Grilled Chicken", nameAr: "جريل تشيكن",
      description: "Lettuce, tomato, Texas sauce, grilled chicken", descriptionAr: "خس - طماطم - تكساس - فراخ جريل",
      price: 207, category: "toast_sandwiches", categoryAr: "ساندوتشات فينا", available: true, image: IMG,
      ingredients: ["lettuce", "tomato", "Texas sauce", "grilled chicken"],
      ingredientsAr: ["خس", "طماطم", "تكساس", "فراخ جريل"],
    },
    "chicken-fajita-vina": {
      name: "Chicken Fajita", nameAr: "فاهيتا فراخ",
      description: "Grilled chicken, colored peppers, onions, mushrooms, fajita sauce (spicy), jalapeños", descriptionAr: "فراخ جريل - فلفل الوان - بصل - مشروم - صوص فاهيتا (سبايسي) - هالبينو",
      price: 226, category: "toast_sandwiches", categoryAr: "ساندوتشات فينا", available: true, image: IMG,
      ingredients: ["grilled chicken", "colored peppers", "onions", "mushrooms", "fajita sauce", "jalapeños"],
      ingredientsAr: ["فراخ جريل", "فلفل الوان", "بصل", "مشروم", "صوص فاهيتا", "هالبينو"],
    },
    "chicken-pepperoni-vina": {
      name: "Chicken Pepperoni", nameAr: "ببروني دجاج",
      description: "Grilled chicken, pepperoni, mozzarella, cheese sauce", descriptionAr: "فر اخ جريل - ببروني - موتزريلا - صوص جبنة",
      price: 234, category: "toast_sandwiches", categoryAr: "ساندوتشات فينا", available: true, image: IMG,
      ingredients: ["grilled chicken", "pepperoni", "mozzarella", "cheese sauce"],
      ingredientsAr: ["فراخ جريل", "ببروني", "موتزريلا", "صوص جبنة"],
    },
    "beef-fajitas-vina": {
      name: "Beef Fajitas", nameAr: "فاهيتا لحمه",
      description: "Beef fajitas sandwich", descriptionAr: "ساندوتش فاهيتا لحمة",
      price: 236, category: "toast_sandwiches", categoryAr: "ساندوتشات فينا", available: true, image: IMG,
    },
    "cordon-bleu-vina": {
      name: "Cordon Bleu", nameAr: "كوردن بلو",
      description: "Cordon bleu sandwich", descriptionAr: "ساندوتش كوردن بلو",
      price: 201, category: "toast_sandwiches", categoryAr: "ساندوتشات فينا", available: true, image: IMG,
    },
  },

  // ─── CHICKEN MAIN DISHES ──────────────────────────────────────────────────
  "chicken_main": {
    "chicken-grill": {
      name: "Chicken Grill", nameAr: "تشيكن جريل",
      description: "Grilled chicken with your choice of sauce (mushroom sauce or pepper sauce). Served with 2 side dishes.", descriptionAr: "تشيكن جريل مع اختيارك من الصوص (مشروم صوص أو صوص الفلفل). يقدم مع 2 أطباق جانبية",
      price: 334, category: "chicken_main", categoryAr: "أطباق الفراخ الرئيسية", available: true, image: IMG, recommended: true,
    },
    "chicken-lemon": {
      name: "Chicken Lemon", nameAr: "تشيكن ليمون",
      description: "Grilled chicken, lemon sauce, Parmesan. Served with 2 side dishes.", descriptionAr: "فراخ جريل - صوص ليمون - بارميزان. يقدم مع 2 أطباق جانبية",
      price: 341, category: "chicken_main", categoryAr: "أطباق الفراخ الرئيسية", available: true, image: IMG,
      ingredients: ["grilled chicken", "lemon sauce", "Parmesan"],
      ingredientsAr: ["فراخ جريل", "صوص ليمون", "بارميزان"],
    },
    "cordon-bleu-main": {
      name: "Cordon Bleu", nameAr: "كوردن بلو",
      description: "Chicken breasts, smoked beef mix, mozzarella, cheese sauce. Served with 2 side dishes.", descriptionAr: "صدور فراخ - مكس سموك بيف - موتزريلا - صوص جبنة. يقدم مع 2 أطباق جانبية",
      price: 357, category: "chicken_main", categoryAr: "أطباق الفراخ الرئيسية", available: true, image: IMG,
      ingredients: ["chicken breasts", "smoked beef mix", "mozzarella", "cheese sauce"],
      ingredientsAr: ["صدور فراخ", "مكس سموك بيف", "موتزريلا", "صوص جبنة"],
    },
    "country-fried-chicken": {
      name: "Country Fried Chicken", nameAr: "كانتري فرايد تشيكن",
      description: "Fried breasts, pepperoni, mozzarella. Served with 2 side dishes.", descriptionAr: "صدور فرايد - بيروني - موتزريلا. يقدم مع 2 أطباق جانبية",
      price: 363, category: "chicken_main", categoryAr: "أطباق الفراخ الرئيسية", available: true, image: IMG,
      ingredients: ["fried chicken breasts", "pepperoni", "mozzarella"],
      ingredientsAr: ["صدور فرايد", "بيروني", "موتزريلا"],
    },
    "chicken-pesto": {
      name: "Chicken Pesto", nameAr: "تشيكن بيستو",
      description: "Chicken breasts with basil sauce, nuts. Served with 2 side dishes.", descriptionAr: "صدور فراخ مع صوص الريحان - المكسرات. يقدم مع 2 أطباق جانبية",
      price: 347, category: "chicken_main", categoryAr: "أطباق الفراخ الرئيسية", available: true, image: IMG,
      ingredients: ["chicken breasts", "basil sauce", "nuts"],
      ingredientsAr: ["صدور فراخ", "صوص الريحان", "المكسرات"],
    },
    "chicken-fromage": {
      name: "Chicken Fromage", nameAr: "تشيكن فورماج",
      description: "Grilled chicken breasts, caramelized onions, mixed cheese, mozzarella, colored pepper. Served with 2 side dishes.", descriptionAr: "صدور فراخ مشويه - بصل مكرمل - مكس جبن - موتزريلا - فلفل الوان. يقدم مع 2 أطباق جانبية",
      price: 368, category: "chicken_main", categoryAr: "أطباق الفراخ الرئيسية", available: true, image: IMG, recommended: true,
      ingredients: ["grilled chicken breasts", "caramelized onions", "mixed cheese", "mozzarella", "colored pepper"],
      ingredientsAr: ["صدور فراخ مشويه", "بصل مكرمل", "مكس جبن", "موتزريلا", "فلفل الوان"],
    },
    "chicken-gravy": {
      name: "Chicken Gravy", nameAr: "تشيكن جريفي",
      description: "Grilled chicken, colored peppers, onions, mushrooms, brown sauce. Served with 2 side dishes.", descriptionAr: "فراخ جريل مانسيه - فلفل الوان - بصل - مشروم - براون صوص. يقدم مع 2 أطباق جانبية",
      price: 374, category: "chicken_main", categoryAr: "أطباق الفراخ الرئيسية", available: true, image: IMG,
      ingredients: ["grilled chicken", "colored peppers", "onions", "mushrooms", "brown sauce"],
      ingredientsAr: ["فراخ جريل مانسيه", "فلفل الوان", "بصل", "مشروم", "براون صوص"],
    },
    "fajita-main": {
      name: "Fajita", nameAr: "فاهيتا",
      description: "Chicken fajita. Served with 2 side dishes.", descriptionAr: "فاهيتا تشيكن. يقدم مع 2 أطباق جانبية",
      price: 335, category: "chicken_main", categoryAr: "أطباق الفراخ الرئيسية", available: true, image: IMG,
    },
  },

  // ─── BEEF MAIN DISHES ─────────────────────────────────────────────────────
  "main_dishes": {
    "grilled-fillet": {
      name: "Grilled Fillet", nameAr: "جريل فيليه",
      description: "Grilled fillet with your choice of sauce (mushroom or pepper sauce). Served with 2 side dishes.", descriptionAr: "جريل فيليه مع اختيارك من الصوص (مشروم صوص أو صوص الفلفل). يقدم مع 2 أطباق جانبية",
      price: 426, category: "main_dishes", categoryAr: "أطباق اللحم الرئيسية", available: true, image: IMG, recommended: true,
    },
    "beef-stroganoff-main": {
      name: "Beef Stroganoff", nameAr: "بيف سترجانوف",
      description: "Emansieh meat, colored peppers, onions, mushrooms, brown sauce. Served with 2 side dishes.", descriptionAr: "لحمه امانسيه - فلفل الوان - بصل - مشروم - براون صوص. يقدم مع 2 أطباق جانبية",
      price: 439, category: "main_dishes", categoryAr: "أطباق اللحم الرئيسية", available: true, image: IMG,
      ingredients: ["Emansieh meat", "colored peppers", "onions", "mushrooms", "brown sauce"],
      ingredientsAr: ["لحمه امانسيه", "فلفل الوان", "بصل", "مشروم", "براون صوص"],
    },
    "beef-fajitas-main": {
      name: "Beef Fajitas", nameAr: "فاهيتا لحمه",
      description: "Onions, colored peppers, meat. Served with 2 side dishes.", descriptionAr: "بصل - فلفل الوان - لحمة. يقدم مع 2 أطباق جانبية",
      price: 429, category: "main_dishes", categoryAr: "أطباق اللحم الرئيسية", available: true, image: IMG,
      ingredients: ["onions", "colored peppers", "meat"],
      ingredientsAr: ["بصل", "فلفل الوان", "لحمة"],
    },
  },

  // ─── BEEF BURGERS ─────────────────────────────────────────────────────────
  "burgers": {
    "classic-burger": {
      name: "Classic Burger", nameAr: "كلاسيك برجر",
      description: "Beef burger, lettuce, tomato, thousand island sauce, cucumber", descriptionAr: "برجر لحم - خس - طماطم - صوص ثاوزن ايلاند - خيار",
      price: 228, category: "burgers", categoryAr: "برجر لحم", available: true, image: IMG,
      ingredients: ["beef burger", "lettuce", "tomato", "thousand island sauce", "cucumber"],
      ingredientsAr: ["برجر لحم", "خس", "طماطم", "صوص ثاوزن ايلاند", "خيار"],
    },
    "cheese-burger": {
      name: "Cheese Burger", nameAr: "تشيز برجر",
      description: "Texas, lettuce, tomato, cheddar slices, cheese sauce, beef burger", descriptionAr: "تكساس - خس - طماطم - شرايح شيدر - صوص جبنة - برجر لحمة",
      price: 238, category: "burgers", categoryAr: "برجر لحم", available: true, image: IMG,
      ingredients: ["Texas sauce", "lettuce", "tomato", "cheddar slices", "cheese sauce", "beef burger"],
      ingredientsAr: ["تكساس", "خس", "طماطم", "شرايح شيدر", "صوص جبنة", "برجر لحمة"],
    },
    "smoke-burger": {
      name: "Smoke Burger", nameAr: "سموك برجر",
      description: "Texas sauce, burger, smoked turkey, smoked bacon, lettuce, tomato, cheese sauce", descriptionAr: "صوص تكساس - برجر - سموك تركي - سموك بيكون - خس - طماطم - صوص جبنة",
      price: 264, category: "burgers", categoryAr: "برجر لحم", available: true, image: IMG, recommended: true,
      ingredients: ["Texas sauce", "burger", "smoked turkey", "smoked bacon", "lettuce", "tomato", "cheese sauce"],
      ingredientsAr: ["صوص تكساس", "برجر", "سموك تركي", "سموك بيكون", "خس", "طماطم", "صوص جبنة"],
    },
    "fire-burger": {
      name: "Fire Burger", nameAr: "فاير برجر",
      description: "Sweet chili, jalapeño, lettuce, tomato, burger, cheese sauce", descriptionAr: "سويت شيلي - هالبينو - خس - طماطم - برجر - صوص جبنة",
      price: 237, category: "burgers", categoryAr: "برجر لحم", available: true, image: IMG,
      ingredients: ["sweet chili", "jalapeño", "lettuce", "tomato", "burger", "cheese sauce"],
      ingredientsAr: ["سويت شيلي", "هالبينو", "خس", "طماطم", "برجر", "صوص جبنة"],
    },
    "bbq-burger": {
      name: "BBQ Burger", nameAr: "باربيكيو برجر",
      description: "Burger, BBQ sauce, beef bacon, lettuce, tomato, cheese sauce", descriptionAr: "برجر - صوص باربيكيو - بيف بيكون - خس - طماطم - صوص جبنة",
      price: 244, category: "burgers", categoryAr: "برجر لحم", available: true, image: IMG,
      ingredients: ["burger", "BBQ sauce", "beef bacon", "lettuce", "tomato", "cheese sauce"],
      ingredientsAr: ["برجر", "صوص باربيكيو", "بيف بيكون", "خس", "طماطم", "صوص جبنة"],
    },
    "texas-burger": {
      name: "Texas Burger", nameAr: "تيكساس برجر",
      description: "Burger, caramelized onions, caramelized mushrooms, Texas sauce, lettuce, tomatoes", descriptionAr: "برجر - بصل مكرمل - مشروم مكرمل - صوص تكساس - خس - طماطم",
      price: 273, category: "burgers", categoryAr: "برجر لحم", available: true, image: IMG,
      ingredients: ["burger", "caramelized onions", "caramelized mushrooms", "Texas sauce", "lettuce", "tomatoes"],
      ingredientsAr: ["برجر", "بصل مكرمل", "مشروم مكرمل", "صوص تكساس", "خس", "طماطم"],
    },
  },

  // ─── SMASH BURGERS ────────────────────────────────────────────────────────
  "smash_burgers": {
    "classic-smash": {
      name: "Classic Smash", nameAr: "كلاسيك سماش",
      description: "Lettuce, tomatoes, caramelized onions, 2 smashed pieces, cheese sauce", descriptionAr: "خس - طماطم - بصل مكرمل - قطعتين سماش - صوص جبنة",
      price: 227, category: "smash_burgers", categoryAr: "سماش برجر", available: true, image: IMG,
      ingredients: ["lettuce", "tomatoes", "caramelized onions", "2 smash pieces", "cheese sauce"],
      ingredientsAr: ["خس", "طماطم", "بصل مكرمل", "قطعتين سماش", "صوص جبنة"],
    },
    "smoke-smash-burger": {
      name: "Smoke Smash Burger", nameAr: "سموك سماش برجر",
      description: "Lettuce, tomato, Texas, caramelized onion, beef bacon", descriptionAr: "خس - طماطم - تكساس - بصل مكرمل - بيف بيكون",
      price: 282, category: "smash_burgers", categoryAr: "سماش برجر", available: true, image: IMG, recommended: true,
      ingredients: ["lettuce", "tomato", "Texas sauce", "caramelized onion", "beef bacon"],
      ingredientsAr: ["خس", "طماطم", "تكساس", "بصل مكرمل", "بيف بيكون"],
    },
    "smash-mushroom-boom": {
      name: "Smash Mushroom Boom", nameAr: "سماش مشروم بووم",
      description: "Lettuce, tomatoes, mushroom cheese sauce, caramelized onions, Texas, 2 smash pieces", descriptionAr: "خس - طماطم - صوص مشروم تشيز - بصل مكرمل - تكساس - قطعتين سماش",
      price: 252, category: "smash_burgers", categoryAr: "سماش برجر", available: true, image: IMG,
      ingredients: ["lettuce", "tomatoes", "mushroom cheese sauce", "caramelized onions", "Texas", "2 smash pieces"],
      ingredientsAr: ["خس", "طماطم", "صوص مشروم تشيز", "بصل مكرمل", "تكساس", "قطعتين سماش"],
    },
    "fried-club": {
      name: "Fried Club", nameAr: "فرايد كلوب",
      description: "Lettuce, tomatoes, cheese sauce, onion rings, mozzarella steak, nachos", descriptionAr: "خس - طماطم - صوص جبنة - حلقات بصل - موتزريلا ستيك - ناتشوز",
      price: 281, category: "smash_burgers", categoryAr: "سماش برجر", available: true, image: IMG,
      ingredients: ["lettuce", "tomatoes", "cheese sauce", "onion rings", "mozzarella steak", "nachos"],
      ingredientsAr: ["خس", "طماطم", "صوص جبنة", "حلقات بصل", "موتزريلا ستيك", "ناتشوز"],
    },
    "fire-smash-burger": {
      name: "Fire Smash Burger", nameAr: "فاير سماش برجر",
      description: "Lettuce, tomato, sweet chili, Sriracha, beef bacon with jalapeños", descriptionAr: "خس - طماطم - سويت شيلي - ستراتشا - بيف بيكون مع هالبينو",
      price: 257, category: "smash_burgers", categoryAr: "سماش برجر", available: true, image: IMG,
      ingredients: ["lettuce", "tomato", "sweet chili", "Sriracha", "beef bacon", "jalapeños"],
      ingredientsAr: ["خس", "طماطم", "سويت شيلي", "ستراتشا", "بيف بيكون", "هالبينو"],
    },
    "chili-ranch": {
      name: "Chili Ranch", nameAr: "تشيلي رانش",
      description: "Lettuce, tomato, Sriracha, jalapeño, cheese sauce, Doritos, ranch", descriptionAr: "خس - طماطم - ستراتشا - هالبينو - صوص جبنة - دوريتوس - رانش",
      price: 267, category: "smash_burgers", categoryAr: "سماش برجر", available: true, image: IMG,
      ingredients: ["lettuce", "tomato", "Sriracha", "jalapeño", "cheese sauce", "Doritos", "ranch"],
      ingredientsAr: ["خس", "طماطم", "ستراتشا", "هالبينو", "صوص جبنة", "دوريتوس", "رانش"],
    },
    "oven-baked-smash": {
      name: "Oven Baked Smash", nameAr: "اوفن بيكد سماش",
      description: "Texas, lettuce, tomato, pepperoni, mozzarella", descriptionAr: "تكساس - خس - طماطم - بيروني - موتزريلا",
      price: 279, category: "smash_burgers", categoryAr: "سماش برجر", available: true, image: IMG,
      ingredients: ["Texas sauce", "lettuce", "tomato", "pepperoni", "mozzarella"],
      ingredientsAr: ["تكساس", "خس", "طماطم", "بيروني", "موتزريلا"],
    },
  },

  // ─── FRIED CHICKEN SANDWICHES ─────────────────────────────────────────────
  "fried_chicken": {
    "classic-fried-chicken": {
      name: "Classic Fried Chicken", nameAr: "كلاسيك فرايد تشيكن",
      description: "Lettuce, tomato, honey mustard, crispy chicken", descriptionAr: "خس - طماطم - هوني ماسترد - فراخ كريسبي",
      price: 216, category: "fried_chicken", categoryAr: "ساندوتشات الفراخ", available: true, image: IMG,
      ingredients: ["lettuce", "tomato", "honey mustard", "crispy chicken"],
      ingredientsAr: ["خس", "طماطم", "هوني ماسترد", "فراخ كريسبي"],
    },
    "fire-fried-chicken": {
      name: "Fire Fried Chicken", nameAr: "فاير فرايد تشيكن",
      description: "Sweet chili, Texas, jalapeño, crispy chicken, lettuce, tomato", descriptionAr: "سويت شيلي - تكساس - هالبينو - فراخ كريسبي - خس - طماطم",
      price: 221, category: "fried_chicken", categoryAr: "ساندوتشات الفراخ", available: true, image: IMG,
      ingredients: ["sweet chili", "Texas sauce", "jalapeño", "crispy chicken", "lettuce", "tomato"],
      ingredientsAr: ["سويت شيلي", "تكساس", "هالبينو", "فراخ كريسبي", "خس", "طماطم"],
    },
    "smoke-fried-chicken": {
      name: "Smoke Fried Chicken", nameAr: "سموك فرايد تشيكن",
      description: "Crispy chicken, Texas, lettuce, tomato, smoked turkey, smoked bacon", descriptionAr: "فراخ كريسبي - تكساس - خس - طماطم - سموك تركي - سموك بيكون",
      price: 249, category: "fried_chicken", categoryAr: "ساندوتشات الفراخ", available: true, image: IMG, recommended: true,
      ingredients: ["crispy chicken", "Texas sauce", "lettuce", "tomato", "smoked turkey", "smoked bacon"],
      ingredientsAr: ["فراخ كريسبي", "تكساس", "خس", "طماطم", "سموك تركي", "سموك بيكون"],
    },
    "fried-festival": {
      name: "Fried Festival", nameAr: "فرايد فيستيفال",
      description: "Crispy chicken, mozzarella steak, onion rings, smoked turkey, ranch, cheese sauce, nachos", descriptionAr: "فراخ كريسبي - موتزريلا ستيك - حلقات بصل - سموك تركي - رانش - صوص جبنة - ناتشوز",
      price: 265, category: "fried_chicken", categoryAr: "ساندوتشات الفراخ", available: true, image: IMG,
      ingredients: ["crispy chicken", "mozzarella steak", "onion rings", "smoked turkey", "ranch", "cheese sauce", "nachos"],
      ingredientsAr: ["فراخ كريسبي", "موتزريلا ستيك", "حلقات بصل", "سموك تركي", "رانش", "صوص جبنة", "ناتشوز"],
    },
  },

  // ─── ADD-ONS (Extra Kitchen) ───────────────────────────────────────────────
  "add_ons": {
    "extra-chicken": {
      name: "Extra Chicken", nameAr: "اضافة فراخ",
      description: "Extra chicken", descriptionAr: "اضافة فراخ",
      price: 50, category: "add_ons", categoryAr: "إضافات مطبخ", available: true, image: IMG,
    },
    "extra-cheese": {
      name: "Extra Cheese", nameAr: "اضافة جبنة",
      description: "Extra cheese", descriptionAr: "اضافة جبنة",
      price: 35, category: "add_ons", categoryAr: "إضافات مطبخ", available: true, image: IMG,
    },
    "extra-bread": {
      name: "Extra Bread", nameAr: "اضافة عيش",
      description: "Extra bread", descriptionAr: "اضافة عيش",
      price: 25, category: "add_ons", categoryAr: "إضافات مطبخ", available: true, image: IMG,
    },
    "extra-meat": {
      name: "Extra Meat", nameAr: "اضافة لحمة",
      description: "Extra meat", descriptionAr: "اضافة لحمة",
      price: 70, category: "add_ons", categoryAr: "إضافات مطبخ", available: true, image: IMG,
    },
    "extra-fries": {
      name: "Extra Fries", nameAr: "اضافة فرايز",
      description: "Extra fries", descriptionAr: "اضافة فرايز",
      price: 60, category: "add_ons", categoryAr: "إضافات مطبخ", available: true, image: IMG,
    },
    "extra-rice": {
      name: "Extra Rice", nameAr: "اضافة ارز",
      description: "Extra rice", descriptionAr: "اضافة ارز",
      price: 45, category: "add_ons", categoryAr: "إضافات مطبخ", available: true, image: IMG,
    },
    "extra-mushroom": {
      name: "Extra Mushroom", nameAr: "اضافة مشروم",
      description: "Extra mushroom", descriptionAr: "اضافة مشروم",
      price: 40, category: "add_ons", categoryAr: "إضافات مطبخ", available: true, image: IMG,
    },
    "extra-sauce": {
      name: "Extra Sauce", nameAr: "اضافة صوص",
      description: "Extra sauce", descriptionAr: "اضافة صوص",
      price: 35, category: "add_ons", categoryAr: "إضافات مطبخ", available: true, image: IMG,
    },
    "sweet-chili-add": {
      name: "Sweet Chili", nameAr: "اضافة الفلفل الحلو",
      description: "Sweet chili add-on", descriptionAr: "اضافة الفلفل الحلو",
      price: 25, category: "add_ons", categoryAr: "إضافات مطبخ", available: true, image: IMG,
    },
    "jalapeno-add": {
      name: "Jalapeño", nameAr: "اضافة هالوبينو",
      description: "Jalapeño add-on", descriptionAr: "اضافة هالوبينو",
      price: 20, category: "add_ons", categoryAr: "إضافات مطبخ", available: true, image: IMG,
    },
  },

  // ─── HOT DRINKS ───────────────────────────────────────────────────────────
  "hot_drinks": {
    "tea": {
      name: "Tea", nameAr: "شاي",
      description: "Classic Egyptian tea", descriptionAr: "شاي مصري كلاسيك",
      price: 55, category: "hot_drinks", categoryAr: "مشروبات ساخنة", available: true, image: IMG,
    },
    "flavor-tea": {
      name: "Flavor Tea", nameAr: "شاي فليفر",
      description: "Flavored herbal tea", descriptionAr: "شاي بنكهات مميزة",
      price: 65, category: "hot_drinks", categoryAr: "مشروبات ساخنة", available: true, image: IMG,
    },
    "zarda-tea": {
      name: "Zarda Tea", nameAr: "شاي زرده",
      description: "Zarda spiced tea", descriptionAr: "شاي زرده بالتوابل",
      price: 60, category: "hot_drinks", categoryAr: "مشروبات ساخنة", available: true, image: IMG,
    },
    "herbs": {
      name: "Herbs", nameAr: "اعشاب",
      description: "Herbal infusion", descriptionAr: "شاي أعشاب طبيعية",
      price: 65, category: "hot_drinks", categoryAr: "مشروبات ساخنة", available: true, image: IMG,
    },
    "mixed-herbs": {
      name: "Mixed Herbs", nameAr: "ميكس اعشاب",
      description: "Mixed herbal blend", descriptionAr: "خليط أعشاب مميز",
      price: 95, category: "hot_drinks", categoryAr: "مشروبات ساخنة", available: true, image: IMG,
    },
    "single-turkish-coffee": {
      name: "Single Turkish Coffee", nameAr: "قهوه تركي سنجل",
      description: "Single Turkish coffee", descriptionAr: "قهوة تركية سنجل",
      price: 55, category: "hot_drinks", categoryAr: "مشروبات ساخنة", available: true, image: IMG,
    },
    "double-turkish-coffee": {
      name: "Double Turkish Coffee", nameAr: "قهوه تركي دبل",
      description: "Double Turkish coffee", descriptionAr: "قهوة تركية دبل",
      price: 70, category: "hot_drinks", categoryAr: "مشروبات ساخنة", available: true, image: IMG,
    },
    "french-coffee": {
      name: "French Coffee", nameAr: "قهوه فرنساوي",
      description: "French coffee", descriptionAr: "قهوة فرنسية",
      price: 80, category: "hot_drinks", categoryAr: "مشروبات ساخنة", available: true, image: IMG,
    },
    "hazelnut-coffee": {
      name: "Hazelnut Coffee", nameAr: "قهوه بندق",
      description: "Hazelnut flavored coffee", descriptionAr: "قهوة بنكهة البندق",
      price: 85, category: "hot_drinks", categoryAr: "مشروبات ساخنة", available: true, image: IMG,
    },
    "nutella-coffee": {
      name: "Nutella Coffee", nameAr: "قهوه نوتيلا",
      description: "Coffee with Nutella", descriptionAr: "قهوة بالنوتيلا",
      price: 95, category: "hot_drinks", categoryAr: "مشروبات ساخنة", available: true, image: IMG,
    },
    "hot-cider": {
      name: "Hot Cider", nameAr: "هوت سيدر",
      description: "Warm apple cider", descriptionAr: "سيدر تفاح ساخن",
      price: 85, category: "hot_drinks", categoryAr: "مشروبات ساخنة", available: true, image: IMG,
    },
  },

  // ─── ESPRESSO ─────────────────────────────────────────────────────────────
  "coffee": {
    "single-espresso": {
      name: "Single Espresso", nameAr: "اسبريسو سنجل",
      description: "Single shot espresso", descriptionAr: "اسبريسو شوت واحد",
      price: 58, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "double-espresso": {
      name: "Double Espresso", nameAr: "اسبريسو دبل",
      description: "Double shot espresso", descriptionAr: "اسبريسو شوتين",
      price: 80, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "single-macchiato": {
      name: "Single Macchiato", nameAr: "ميكاتو سنجل",
      description: "Espresso with a dash of milk foam", descriptionAr: "اسبريسو مع رغوة حليب",
      price: 65, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "espresso-con-panna": {
      name: "Espresso Con Panna", nameAr: "اسبريسو كون بانا",
      description: "Espresso topped with whipped cream", descriptionAr: "اسبريسو مع كريمة",
      price: 78, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "espresso-avocado": {
      name: "Espresso Avocado", nameAr: "اسبريسو افوجادو",
      description: "Espresso with avocado", descriptionAr: "اسبريسو بالافوكادو",
      price: 84, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "bon-bon-coffee": {
      name: "Bon Bon Coffee", nameAr: "بون بون كوفي",
      description: "Bon Bon coffee", descriptionAr: "بون بون كوفي",
      price: 85, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "americano": {
      name: "Americano", nameAr: "امريكانو (وايت-بلاك)",
      description: "Americano — white or black", descriptionAr: "امريكانو وايت أو بلاك",
      price: 91, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "cappuccino": {
      name: "Cappuccino", nameAr: "كابتشينو",
      description: "Classic cappuccino", descriptionAr: "كابتشينو كلاسيك",
      price: 104, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "latte": {
      name: "Latte", nameAr: "لاتيه",
      description: "Classic latte", descriptionAr: "لاتيه كلاسيك",
      price: 88, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "flat-white": {
      name: "Flat White", nameAr: "فلات وايت",
      description: "Flat white coffee", descriptionAr: "فلات وايت",
      price: 110, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "caramel-macchiato": {
      name: "Caramel Macchiato", nameAr: "كراميل ميكاتو",
      description: "Caramel macchiato latte", descriptionAr: "كراميل ميكاتو",
      price: 105, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "mocha": {
      name: "Mocha", nameAr: "موكا",
      description: "Chocolate espresso mocha", descriptionAr: "موكا شوكولاتة",
      price: 105, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "hazelnut-mocha": {
      name: "Hazelnut Mocha (Nutella)", nameAr: "موكا بندق (نوتيلا)",
      description: "Mocha with hazelnut/Nutella", descriptionAr: "موكا بالبندق نوتيلا",
      price: 110, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "mocha-mint": {
      name: "Mocha Mint", nameAr: "موكا مينت",
      description: "Mocha with mint", descriptionAr: "موكا بالنعناع",
      price: 107, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "lotus-latte": {
      name: "Lotus Latte", nameAr: "لوتس لاتيه",
      description: "Latte with Lotus biscuit flavor", descriptionAr: "لاتيه بنكهة لوتس",
      price: 125, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG, recommended: true,
    },
    "spanish-latte": {
      name: "Spanish Latte", nameAr: "سبانش لاتيه",
      description: "Spanish latte", descriptionAr: "سبانش لاتيه",
      price: 115, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "hazelnut-spanish-latte": {
      name: "Hazelnut Spanish Latte", nameAr: "سبانش لاتيه بندق",
      description: "Spanish latte with hazelnut", descriptionAr: "سبانش لاتيه بالبندق",
      price: 135, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "mocha-marshmallow": {
      name: "Mocha Marshmallow", nameAr: "موكا مارشميلو",
      description: "Mocha topped with marshmallow", descriptionAr: "موكا مارشميلو",
      price: 125, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "hazelnut-caramel": {
      name: "Hazelnut Caramel", nameAr: "كراميل بندق",
      description: "Hazelnut caramel coffee", descriptionAr: "كراميل بندق",
      price: 108, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
    "nescafe": {
      name: "Nescafe", nameAr: "نسكافيه",
      description: "Hot Nescafe", descriptionAr: "نسكافيه ساخن",
      price: 80, category: "coffee", categoryAr: "إسبريسو", available: true, image: IMG,
    },
  },

  // ─── CORTO ────────────────────────────────────────────────────────────────
  "corto": {
    "classic-corto": {
      name: "Classic Corto", nameAr: "كلاسيك كورتو",
      description: "Classic Corto coffee", descriptionAr: "كورتو كلاسيك",
      price: 97, category: "corto", categoryAr: "كورتو", available: true, image: IMG,
    },
    "mocha-corto": {
      name: "Mocha Corto", nameAr: "موكا كورتو",
      description: "Mocha Corto coffee", descriptionAr: "موكا كورتو",
      price: 119, category: "corto", categoryAr: "كورتو", available: true, image: IMG,
    },
    "corto-caramel": {
      name: "Corto Caramel", nameAr: "كورتو كراميل",
      description: "Caramel Corto coffee", descriptionAr: "كورتو كراميل",
      price: 119, category: "corto", categoryAr: "كورتو", available: true, image: IMG,
    },
    "black-corto": {
      name: "Black Corto", nameAr: "بلاك كورتو",
      description: "Black Corto coffee", descriptionAr: "بلاك كورتو",
      price: 114, category: "corto", categoryAr: "كورتو", available: true, image: IMG,
    },
  },

  // ─── HOT CHOCOLATE ────────────────────────────────────────────────────────
  "hot_chocolate": {
    "classic-hot-chocolate": {
      name: "Classic Hot Chocolate", nameAr: "كلاسيك هوت شوكليت",
      description: "Classic hot chocolate", descriptionAr: "هوت شوكليت كلاسيك",
      price: 144, category: "hot_chocolate", categoryAr: "شوكولاتة ساخنة", available: true, image: IMG,
    },
    "milk-hot-chocolate": {
      name: "Milk Hot Chocolate", nameAr: "ميلك هوت شوكلت",
      description: "Milk hot chocolate", descriptionAr: "هوت شوكليت بالحليب",
      price: 169, category: "hot_chocolate", categoryAr: "شوكولاتة ساخنة", available: true, image: IMG,
    },
    "dark-hot-chocolate": {
      name: "Dark Hot Chocolate", nameAr: "دارك هوت شوكلت",
      description: "Dark hot chocolate", descriptionAr: "هوت شوكليت دارك",
      price: 169, category: "hot_chocolate", categoryAr: "شوكولاتة ساخنة", available: true, image: IMG,
    },
    "hot-lotus": {
      name: "Hot Lotus", nameAr: "هوت لوتس",
      description: "Hot Lotus chocolate drink", descriptionAr: "هوت شوكليت لوتس",
      price: 169, category: "hot_chocolate", categoryAr: "شوكولاتة ساخنة", available: true, image: IMG,
    },
    "hot-pistachio": {
      name: "Hot Pistachio", nameAr: "هوت بيستاشيو",
      description: "Hot pistachio chocolate drink", descriptionAr: "هوت شوكليت بيستاشيو",
      price: 179, category: "hot_chocolate", categoryAr: "شوكولاتة ساخنة", available: true, image: IMG,
    },
    "hot-chocolate-marshmallow": {
      name: "Hot Chocolate Marshmallow", nameAr: "هوت شوكلت مارشميلو",
      description: "Hot chocolate with marshmallow", descriptionAr: "هوت شوكليت مارشميلو",
      price: 169, category: "hot_chocolate", categoryAr: "شوكولاتة ساخنة", available: true, image: IMG,
    },
    "oreo-hot-chocolate": {
      name: "Oreo Hot Chocolate", nameAr: "اوريو هوت شوكلت",
      description: "Hot chocolate with Oreo", descriptionAr: "هوت شوكليت اوريو",
      price: 169, category: "hot_chocolate", categoryAr: "شوكولاتة ساخنة", available: true, image: IMG,
    },
    "cinnabon-hot-chocolate": {
      name: "Cinnabon Hot Chocolate", nameAr: "سينابون هوت شوكلت",
      description: "Hot chocolate with Cinnabon", descriptionAr: "هوت شوكليت سينابون",
      price: 169, category: "hot_chocolate", categoryAr: "شوكولاتة ساخنة", available: true, image: IMG,
    },
  },

  // ─── SAHLAB ───────────────────────────────────────────────────────────────
  "sahlab": {
    "classic-sahlab": {
      name: "Classic Sahlab (Nuts)", nameAr: "كلاسيك سحلب (مكسرات)",
      description: "Classic sahlab with nuts", descriptionAr: "سحلب كلاسيك بالمكسرات",
      price: 104, category: "sahlab", categoryAr: "سحلب", available: true, image: IMG,
    },
    "nutella-sahlab": {
      name: "Nutella Sahlab", nameAr: "سحلب نوتيلا",
      description: "Sahlab with Nutella", descriptionAr: "سحلب بالنوتيلا",
      price: 139, category: "sahlab", categoryAr: "سحلب", available: true, image: IMG,
    },
    "lotus-sahlab": {
      name: "Lotus Sahlab", nameAr: "سحلب لوتس",
      description: "Sahlab with Lotus", descriptionAr: "سحلب باللوتس",
      price: 149, category: "sahlab", categoryAr: "سحلب", available: true, image: IMG,
    },
    "pistachio-sahlab": {
      name: "Pistachio Sahlab", nameAr: "سحلب بيستاشيو",
      description: "Sahlab with pistachio", descriptionAr: "سحلب بالبيستاشيو",
      price: 169, category: "sahlab", categoryAr: "سحلب", available: true, image: IMG,
    },
  },

  // ─── FRAPPUCCINO ──────────────────────────────────────────────────────────
  "frappuccino": {
    "frappuccino": {
      name: "Frappuccino", nameAr: "فرابتشينو",
      description: "Classic frappuccino", descriptionAr: "فرابتشينو كلاسيك",
      price: 143, category: "frappuccino", categoryAr: "فرابتشينو", available: true, image: IMG,
    },
    "frappe-strong": {
      name: "Frappe Strong", nameAr: "فرابيه سترونج",
      description: "Strong coffee frappe", descriptionAr: "فرابيه سترونج",
      price: 159, category: "frappuccino", categoryAr: "فرابتشينو", available: true, image: IMG,
    },
    "caramel-macchiato-frappe": {
      name: "Caramel Macchiato Frappe", nameAr: "فرابيه كراميل ميكاتو",
      description: "Caramel macchiato frappe", descriptionAr: "فرابيه كراميل ميكاتو",
      price: 169, category: "frappuccino", categoryAr: "فرابتشينو", available: true, image: IMG, recommended: true,
    },
    "mocha-frappe": {
      name: "Mocha Frappe", nameAr: "فرابيه موكا",
      description: "Mocha frappe", descriptionAr: "فرابيه موكا",
      price: 174, category: "frappuccino", categoryAr: "فرابتشينو", available: true, image: IMG,
    },
    "mocha-marshmallow-frappe": {
      name: "Mocha Marshmallow Frappe", nameAr: "فرابيه موكا مارشميلو",
      description: "Mocha marshmallow frappe", descriptionAr: "فرابيه موكا مارشميلو",
      price: 194, category: "frappuccino", categoryAr: "فرابتشينو", available: true, image: IMG,
    },
    "white-mocha-frappe": {
      name: "White Mocha Frappé", nameAr: "فرابيه وايت موكا",
      description: "White mocha frappe", descriptionAr: "فرابيه وايت موكا",
      price: 174, category: "frappuccino", categoryAr: "فرابتشينو", available: true, image: IMG,
    },
    "oreo-frappe": {
      name: "Oreo Frappe", nameAr: "اوريو فرابيه",
      description: "Oreo frappe", descriptionAr: "فرابيه اوريو",
      price: 164, category: "frappuccino", categoryAr: "فرابتشينو", available: true, image: IMG,
    },
    "lotus-frappe": {
      name: "Lotus Frappé", nameAr: "لوتس فرابيه",
      description: "Lotus frappe", descriptionAr: "فرابيه لوتس",
      price: 195, category: "frappuccino", categoryAr: "فرابتشينو", available: true, image: IMG,
    },
    "blueberry-vanilla-frappe": {
      name: "Blueberry Vanilla Frappe", nameAr: "بلوبيري فانليا فرابيه",
      description: "Blueberry vanilla frappe", descriptionAr: "فرابيه بلوبيري فانيلا",
      price: 159, category: "frappuccino", categoryAr: "فرابتشينو", available: true, image: IMG,
    },
    "strawberry-vanilla-frappe": {
      name: "Strawberry Vanilla Frappé", nameAr: "ستروبيري فانليا فرابيه",
      description: "Strawberry vanilla frappe", descriptionAr: "فرابيه فراولة فانيلا",
      price: 159, category: "frappuccino", categoryAr: "فرابتشينو", available: true, image: IMG,
    },
    "chocolate-frappe": {
      name: "Chocolate Frappé", nameAr: "شوكليت فرابيه",
      description: "Chocolate frappe", descriptionAr: "فرابيه شوكليت",
      price: 164, category: "frappuccino", categoryAr: "فرابتشينو", available: true, image: IMG,
    },
    "hazelnut-frappe": {
      name: "Hazelnut Frappé", nameAr: "فرابيه بندق",
      description: "Hazelnut frappe", descriptionAr: "فرابيه بندق",
      price: 149, category: "frappuccino", categoryAr: "فرابتشينو", available: true, image: IMG,
    },
  },

  // ─── ICE CUBES (Iced Drinks) ───────────────────────────────────────────────
  "iced_coffee": {
    "espresso-energy": {
      name: "Espresso Energy", nameAr: "اسبريسو انرجي",
      description: "Espresso energy drink", descriptionAr: "اسبريسو انرجي",
      price: 199, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "iced-latte": {
      name: "Iced Latte", nameAr: "ايس لاتيه",
      description: "Iced latte", descriptionAr: "ايس لاتيه",
      price: 139, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "iced-cappuccino": {
      name: "Iced Cappuccino", nameAr: "ايس كابتشينو",
      description: "Iced cappuccino", descriptionAr: "ايس كابتشينو",
      price: 154, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "iced-nescafe": {
      name: "Iced Nescafe", nameAr: "ايس نسكافيه",
      description: "Iced Nescafe", descriptionAr: "ايس نسكافيه",
      price: 139, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "iced-mocha": {
      name: "Iced Mocha", nameAr: "ايس موكا",
      description: "Iced mocha", descriptionAr: "ايس موكا",
      price: 149, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "iced-white-mocha": {
      name: "Iced White Mocha", nameAr: "ايس وايت موكا",
      description: "Iced white mocha", descriptionAr: "ايس وايت موكا",
      price: 149, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "iced-caramel-macchiato": {
      name: "Iced Caramel Macchiato", nameAr: "ايس كراميل ميكاتو",
      description: "Iced caramel macchiato", descriptionAr: "ايس كراميل ميكاتو",
      price: 154, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG, recommended: true,
    },
    "iced-spanish-latte": {
      name: "Iced Spanish Latte", nameAr: "ايس سبانش لاتيه",
      description: "Iced Spanish latte", descriptionAr: "ايس سبانش لاتيه",
      price: 179, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "ice-spanish-hazelnut-latte": {
      name: "Ice Spanish Hazelnut Latte", nameAr: "ايس سبانش لاتيه بندق",
      description: "Iced Spanish hazelnut latte", descriptionAr: "ايس سبانش لاتيه بندق",
      price: 189, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "iced-rose-latte": {
      name: "Iced Rose Latte", nameAr: "ايس روز لاتيه",
      description: "Iced rose latte", descriptionAr: "ايس روز لاتيه",
      price: 174, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "blue-coffee-ice": {
      name: "Blue Coffee Ice", nameAr: "بلو كوفي ايس",
      description: "Blue iced coffee", descriptionAr: "بلو كوفي ايس",
      price: 174, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "ice-boba-coffee": {
      name: "Ice Boba Coffee", nameAr: "ايس بوبا كوفي",
      description: "Iced coffee with boba pearls", descriptionAr: "ايس بوبا كوفي",
      price: 184, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "ice-tea-black": {
      name: "Ice Tea Black", nameAr: "ايس تي بلاك",
      description: "Iced black tea", descriptionAr: "ايس تي بلاك",
      price: 89, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "ice-tea-green": {
      name: "Ice Tea Green", nameAr: "ايس تي جرين",
      description: "Iced green tea", descriptionAr: "ايس تي جرين",
      price: 104, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "ice-tea-peach": {
      name: "Ice Tea Peach", nameAr: "ايس تي خوخ",
      description: "Iced peach tea", descriptionAr: "ايس تي خوخ",
      price: 124, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "ice-tea-lemon-honey": {
      name: "Ice Tea Lemon Honey", nameAr: "ايس تي ليمون هوني",
      description: "Iced lemon honey tea", descriptionAr: "ايس تي ليمون هوني",
      price: 134, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
    "ice-tea-raspberry": {
      name: "Ice Tea Raspberry", nameAr: "ايس تي راسبري",
      description: "Iced raspberry tea", descriptionAr: "ايس تي راسبري",
      price: 124, category: "iced_coffee", categoryAr: "مكعبات ثلج", available: true, image: IMG,
    },
  },

  // ─── MOCKTAILS & MOJITOS ──────────────────────────────────────────────────
  "mocktails": {
    "lemon-mint": {
      name: "Lemon Mint", nameAr: "ليمون نعناع",
      description: "Fresh lemon mint mocktail", descriptionAr: "ليمون نعناع",
      price: 99, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "lemon-pink": {
      name: "Lemon Pink", nameAr: "ليمون بينك",
      description: "Pink lemonade mocktail", descriptionAr: "ليمون بينك",
      price: 99, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "lemon-strawberry": {
      name: "Lemon Strawberry", nameAr: "ليمون ستروبري",
      description: "Lemon strawberry mocktail", descriptionAr: "ليمون ستروبيري",
      price: 99, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "lemon-passion": {
      name: "Lemon Passion", nameAr: "ليمون باشون",
      description: "Lemon passion fruit mocktail", descriptionAr: "ليمون باشون",
      price: 109, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "classic-mojito": {
      name: "Classic Mojito", nameAr: "كلاسيك موهيتو",
      description: "Classic mint mojito", descriptionAr: "موهيتو كلاسيك",
      price: 129, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG, recommended: true,
    },
    "blueberry-mojito": {
      name: "Blueberry Mojito", nameAr: "بلوبيري موهيتو",
      description: "Blueberry mojito", descriptionAr: "موهيتو بلوبيري",
      price: 184, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "mixed-berry-mojito": {
      name: "Mixed Berry Mojito", nameAr: "ميكس بيري موهيتو",
      description: "Mixed berry mojito", descriptionAr: "موهيتو ميكس بيري",
      price: 181, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "passion-mojito": {
      name: "Passion Mojito", nameAr: "باشون موهيتو",
      description: "Passion fruit mojito", descriptionAr: "موهيتو باشون",
      price: 179, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "strawberry-mojito": {
      name: "Strawberry Mojito", nameAr: "ستروبيري موهيتو",
      description: "Strawberry mojito", descriptionAr: "موهيتو فراولة",
      price: 188, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "peach-mojito": {
      name: "Peach Mojito", nameAr: "موهيتو خوخ",
      description: "Peach mojito", descriptionAr: "موهيتو خوخ",
      price: 189, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "apple-mojito": {
      name: "Apple Mojito", nameAr: "موهيتو تفاح",
      description: "Apple mojito", descriptionAr: "موهيتو تفاح",
      price: 184, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "pineapple-mojito": {
      name: "Pineapple Mojito", nameAr: "موهيتو اناناس",
      description: "Pineapple mojito", descriptionAr: "موهيتو اناناس",
      price: 197, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "red-bull-mojito": {
      name: "Red Bull Mojito", nameAr: "موهيتو ريدبول",
      description: "Red Bull mojito", descriptionAr: "موهيتو ريدبول",
      price: 204, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "passion-blue": {
      name: "Passion Blue", nameAr: "باشون بلو",
      description: "Passion blue mocktail", descriptionAr: "باشون بلو",
      price: 169, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "red-bull-berry": {
      name: "Red Bull Berry", nameAr: "ريدبول بيري",
      description: "Red Bull berry mocktail", descriptionAr: "ريدبول بيري",
      price: 209, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "red-bull-blue": {
      name: "Red Bull Blue", nameAr: "ريدبول بلو",
      description: "Red Bull blue mocktail", descriptionAr: "ريدبول بلو",
      price: 204, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "cherry-cola": {
      name: "Cherry Cola", nameAr: "شيري كولا",
      description: "Cherry cola mocktail", descriptionAr: "شيري كولا",
      price: 139, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "french-cola": {
      name: "French Cola", nameAr: "فرنش كولا",
      description: "French cola mocktail", descriptionAr: "فرنش كولا",
      price: 144, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
    },
    "boba-mojito": {
      name: "Boba Mojito", nameAr: "موهيتو بوبا",
      description: "Boba mojito with blueberry, passion fruit, strawberry, green apple", descriptionAr: "موهيتو بوبا بلوبيري - باشون فروت - ستروبيري - تفاح اخضر",
      price: 224, category: "mocktails", categoryAr: "موكتيل وموجيتو", available: true, image: IMG,
      ingredients: ["blueberry", "passion fruit", "strawberry", "green apple"],
      ingredientsAr: ["بلوبيري", "باشون فروت", "ستروبيري", "تفاح اخضر"],
    },
  },

  // ─── BOBA TEA ─────────────────────────────────────────────────────────────
  "boba_tea": {
    "boba-tea-blueberry": {
      name: "Boba Tea Blueberry", nameAr: "بوبا تي بلوبيري",
      description: "Blueberry boba tea", descriptionAr: "بوبا تي بلوبيري",
      price: 159, category: "boba_tea", categoryAr: "بوبا تي", available: true, image: IMG,
    },
    "boba-tea-passion-fruit": {
      name: "Boba Tea Passion Fruit", nameAr: "بوبا تي باشون فروت",
      description: "Passion fruit boba tea", descriptionAr: "بوبا تي باشون فروت",
      price: 164, category: "boba_tea", categoryAr: "بوبا تي", available: true, image: IMG,
    },
    "boba-tea-strawberry": {
      name: "Boba Tea Strawberry", nameAr: "بوبا تي استروبيري",
      description: "Strawberry boba tea", descriptionAr: "بوبا تي فراولة",
      price: 169, category: "boba_tea", categoryAr: "بوبا تي", available: true, image: IMG,
    },
    "boba-tea-green-apple": {
      name: "Boba Tea Green Apple", nameAr: "بوبا تي تفاح اخضر",
      description: "Green apple boba tea", descriptionAr: "بوبا تي تفاح اخضر",
      price: 169, category: "boba_tea", categoryAr: "بوبا تي", available: true, image: IMG,
    },
  },

  // ─── FRESH JUICES ─────────────────────────────────────────────────────────
  "fresh_juices": {
    "mango-juice": {
      name: "Mango", nameAr: "مانجو",
      description: "Fresh mango juice", descriptionAr: "عصير مانجو طازج",
      price: 134, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
    "strawberry-juice": {
      name: "Strawberry", nameAr: "فراوله",
      description: "Fresh strawberry juice", descriptionAr: "عصير فراولة طازج",
      price: 125, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
    "guava-juice": {
      name: "Guava", nameAr: "جوافه",
      description: "Fresh guava juice", descriptionAr: "عصير جوافة طازج",
      price: 133, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
    "orange-juice": {
      name: "Orange", nameAr: "برتقال",
      description: "Fresh orange juice", descriptionAr: "عصير برتقال طازج",
      price: 121, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
    "watermelon-juice": {
      name: "Watermelon", nameAr: "بطيخ",
      description: "Fresh watermelon juice", descriptionAr: "عصير بطيخ طازج",
      price: 127, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
    "kiwi-juice": {
      name: "Kiwi", nameAr: "كيوي",
      description: "Fresh kiwi juice", descriptionAr: "عصير كيوي طازج",
      price: 160, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
    "dates-juice": {
      name: "Dates", nameAr: "بلح",
      description: "Fresh dates juice", descriptionAr: "عصير بلح طازج",
      price: 130, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
    "pomegranate-juice": {
      name: "Pomegranate", nameAr: "رمان",
      description: "Fresh pomegranate juice", descriptionAr: "عصير رمان طازج",
      price: 118, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
    "banana-juice": {
      name: "Banana", nameAr: "موز",
      description: "Fresh banana juice", descriptionAr: "عصير موز طازج",
      price: 129, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
    "lemon-juice": {
      name: "Lemon", nameAr: "ليمون",
      description: "Fresh lemon juice", descriptionAr: "عصير ليمون طازج",
      price: 93, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
    "lemon-mint-juice": {
      name: "Lemon Mint", nameAr: "ليمون نعناع",
      description: "Fresh lemon mint juice", descriptionAr: "عصير ليمون نعناع طازج",
      price: 99, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
    "pineapple-juice": {
      name: "Pineapple", nameAr: "اناناس",
      description: "Fresh pineapple juice", descriptionAr: "عصير اناناس طازج",
      price: 130, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
    "avocado-juice": {
      name: "Avocado", nameAr: "افوكادو",
      description: "Fresh avocado juice", descriptionAr: "عصير افوكادو طازج",
      price: 168, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
    "peach-juice": {
      name: "Peach", nameAr: "خوخ",
      description: "Fresh peach juice", descriptionAr: "عصير خوخ طازج",
      price: 127, category: "fresh_juices", categoryAr: "عصائر طازجة", available: true, image: IMG,
    },
  },

  // ─── COCKTAILS ────────────────────────────────────────────────────────────
  "cocktails": {
    "strawberry-banana": {
      name: "Strawberry Banana", nameAr: "فراولة موز",
      description: "Strawberry banana cocktail", descriptionAr: "كوكتيل فراولة موز",
      price: 137, category: "cocktails", categoryAr: "كوكتيل", available: true, image: IMG,
    },
    "mango-kiwi": {
      name: "Mango Kiwi", nameAr: "مانجو كيوي",
      description: "Mango kiwi cocktail", descriptionAr: "كوكتيل مانجو كيوي",
      price: 154, category: "cocktails", categoryAr: "كوكتيل", available: true, image: IMG,
    },
    "copacabana": {
      name: "Copacabana", nameAr: "كوبا كابانا",
      description: "Copacabana cocktail", descriptionAr: "كوكتيل كوبا كابانا",
      price: 129, category: "cocktails", categoryAr: "كوكتيل", available: true, image: IMG,
    },
    "white-mountain": {
      name: "White Mountain", nameAr: "وايت موانتين",
      description: "White mountain cocktail", descriptionAr: "كوكتيل وايت موانتين",
      price: 139, category: "cocktails", categoryAr: "كوكتيل", available: true, image: IMG,
    },
    "lemont-strawberry": {
      name: "Lemont Strawberry", nameAr: "فراولة ليمونت",
      description: "Lemon strawberry cocktail", descriptionAr: "كوكتيل فراولة ليمون",
      price: 144, category: "cocktails", categoryAr: "كوكتيل", available: true, image: IMG,
    },
    "yellow-and-green": {
      name: "Yellow and Green", nameAr: "يالو اند جرين",
      description: "Yellow and green cocktail", descriptionAr: "كوكتيل يالو اند جرين",
      price: 149, category: "cocktails", categoryAr: "كوكتيل", available: true, image: IMG,
    },
  },

  // ─── SMOOTHIES ────────────────────────────────────────────────────────────
  "smoothies": {
    "lemon-smoothie": {
      name: "Lemon Smoothie", nameAr: "سموذي ليمون",
      description: "Lemon smoothie", descriptionAr: "سموذي ليمون",
      price: 89, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "lemon-mint-smoothie": {
      name: "Lemon Mint Smoothie", nameAr: "سموذي ليمون نعناع",
      description: "Lemon mint smoothie", descriptionAr: "سموذي ليمون نعناع",
      price: 104, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "pina-colada-smoothie": {
      name: "Pina Colada", nameAr: "بيناكولادا",
      description: "Pina colada smoothie", descriptionAr: "سموذي بيناكولادا",
      price: 154, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "blueberry-smoothie": {
      name: "Blueberry Smoothie", nameAr: "سموذي بلوبيري",
      description: "Blueberry smoothie", descriptionAr: "سموذي بلوبيري",
      price: 139, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "mix-berry-smoothie": {
      name: "Mix Berry Smoothie", nameAr: "سموذي ميكس بيري",
      description: "Mixed berry smoothie", descriptionAr: "سموذي ميكس بيري",
      price: 144, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "mango-peach-smoothie": {
      name: "Mango Peach Smoothie", nameAr: "سموذي مانجو خوخ",
      description: "Mango peach smoothie", descriptionAr: "سموذي مانجو خوخ",
      price: 154, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "passion-fruit-smoothie": {
      name: "Passion Fruit Smoothie", nameAr: "سموذي باشون فروت",
      description: "Passion fruit smoothie", descriptionAr: "سموذي باشون فروت",
      price: 144, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "passion-strawberry-smoothie": {
      name: "Passion Strawberry Smoothie", nameAr: "سموذي باشون ستروبيري",
      description: "Passion strawberry smoothie", descriptionAr: "سموذي باشون ستروبيري",
      price: 149, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "pineapple-smoothie": {
      name: "Pineapple Smoothie", nameAr: "سموذي اناناس",
      description: "Pineapple smoothie", descriptionAr: "سموذي اناناس",
      price: 139, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "strawberry-smoothie": {
      name: "Strawberry Smoothie", nameAr: "سموذي فراوله",
      description: "Strawberry smoothie", descriptionAr: "سموذي فراولة",
      price: 129, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "watermelon-smoothie": {
      name: "Watermelon Smoothie", nameAr: "سموذي بطيخ",
      description: "Watermelon smoothie", descriptionAr: "سموذي بطيخ",
      price: 149, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "mango-passion-smoothie": {
      name: "Mango Passion Smoothie", nameAr: "سموذي مانجو باشون",
      description: "Mango passion smoothie", descriptionAr: "سموذي مانجو باشون",
      price: 134, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "blue-passion-smoothie": {
      name: "Blue Passion Smoothie", nameAr: "سموذي بلو باشون",
      description: "Blue passion smoothie", descriptionAr: "سموذي بلو باشون",
      price: 159, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "strawberry-colada-smoothie": {
      name: "Strawberry Colada", nameAr: "سموذي ستروبيري كولادا",
      description: "Strawberry colada smoothie", descriptionAr: "سموذي ستروبيري كولادا",
      price: 159, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "mango-colada-smoothie": {
      name: "Mango Colada", nameAr: "سموذي مانجو كولادا",
      description: "Mango colada smoothie", descriptionAr: "سموذي مانجو كولادا",
      price: 159, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
    "mango-smoothie": {
      name: "Mango Smoothie", nameAr: "سموذي مانجو",
      description: "Mango smoothie", descriptionAr: "سموذي مانجو",
      price: 129, category: "smoothies", categoryAr: "سموذي", available: true, image: IMG,
    },
  },

  // ─── MILKSHAKES ───────────────────────────────────────────────────────────
  "milkshakes": {
    "vanilla-milkshake": {
      name: "Vanilla Milkshake", nameAr: "ميلك شيك فانيليا",
      description: "Vanilla milkshake", descriptionAr: "ميلك شيك فانيليا",
      price: 144, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "chocolate-milkshake": {
      name: "Chocolate Milkshake", nameAr: "ميلك شيك شوكلاته",
      description: "Chocolate milkshake", descriptionAr: "ميلك شيك شوكولاتة",
      price: 149, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "strawberry-milkshake": {
      name: "Strawberry Milkshake", nameAr: "ميلك شيك فراوله",
      description: "Strawberry milkshake", descriptionAr: "ميلك شيك فراولة",
      price: 154, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "mango-milkshake": {
      name: "Mango Milkshake", nameAr: "ميلك شيك مانجو",
      description: "Mango milkshake", descriptionAr: "ميلك شيك مانجو",
      price: 154, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "blueberry-milkshake": {
      name: "Blueberry Milkshake", nameAr: "ميلك شيك بلوبيري",
      description: "Blueberry milkshake", descriptionAr: "ميلك شيك بلوبيري",
      price: 189, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "mix-berry-milkshake": {
      name: "Mix Berry Milkshake", nameAr: "ميلك شيك ميكس بيري",
      description: "Mixed berry milkshake", descriptionAr: "ميلك شيك ميكس بيري",
      price: 194, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "toffee-milkshake": {
      name: "Toffee Milkshake", nameAr: "ميلك شيك توفي",
      description: "Toffee milkshake", descriptionAr: "ميلك شيك توفي",
      price: 194, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "oreo-milkshake": {
      name: "Oreo Milkshake", nameAr: "ميلك شيك اوريو",
      description: "Oreo milkshake", descriptionAr: "ميلك شيك اوريو",
      price: 194, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "nutella-milkshake": {
      name: "Nutella Milkshake", nameAr: "ميلك شيك نوتيلا",
      description: "Nutella milkshake", descriptionAr: "ميلك شيك نوتيلا",
      price: 197, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "strawberry-coconut-milkshake": {
      name: "Strawberry Coconut Milkshake", nameAr: "ميلك شيك ستروبيري كوكونت",
      description: "Strawberry coconut milkshake", descriptionAr: "ميلك شيك ستروبيري كوكوت",
      price: 184, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "pistachio-milkshake": {
      name: "Pistachio Milkshake", nameAr: "ميلك شيك بستاشيو",
      description: "Pistachio milkshake", descriptionAr: "ميلك شيك بستاشيو",
      price: 214, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "kinder-bueno-milkshake": {
      name: "Kinder Bueno Milkshake", nameAr: "ميلك شيك كيندر بوينو",
      description: "Kinder Bueno milkshake", descriptionAr: "ميلك شيك كيندر بوينو",
      price: 189, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "coffee-milkshake": {
      name: "Coffee Milkshake", nameAr: "ميلك شيك كوفي",
      description: "Coffee milkshake", descriptionAr: "ميلك شيك كوفي",
      price: 197, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "lotus-milkshake": {
      name: "Lotus Milkshake", nameAr: "ميلك شيك لوتس",
      description: "Lotus milkshake", descriptionAr: "ميلك شيك لوتس",
      price: 203, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG, recommended: true,
    },
    "passion-fruit-milkshake": {
      name: "Passion Fruit Milkshake", nameAr: "ميلك شيك باشون فروت",
      description: "Passion fruit milkshake", descriptionAr: "ميلك شيك باشون فروت",
      price: 174, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
    "apples-milkshake": {
      name: "Apples Milkshake", nameAr: "ميلك شيك تفاح",
      description: "Apple milkshake", descriptionAr: "ميلك شيك تفاح",
      price: 179, category: "milkshakes", categoryAr: "ميلك شيك", available: true, image: IMG,
    },
  },

  // ─── WAFFLE ───────────────────────────────────────────────────────────────
  "waffle": {
    "nutella-waffle": {
      name: "Nutella Waffle", nameAr: "وافل نوتيلا",
      description: "Waffle with Nutella", descriptionAr: "وافل بالنوتيلا",
      price: 184, category: "waffle", categoryAr: "وافل", available: true, image: IMG,
    },
    "mixed-chocolate-waffle": {
      name: "Mixed Chocolate Waffle", nameAr: "وافل مكس شوكلت",
      description: "Waffle with mixed chocolate", descriptionAr: "وافل بالشوكولاتة المشكلة",
      price: 209, category: "waffle", categoryAr: "وافل", available: true, image: IMG,
    },
    "lotus-caramel-waffle": {
      name: "Lotus Caramel Waffle", nameAr: "وافل لوتس كراميل",
      description: "Waffle with Lotus and caramel", descriptionAr: "وافل لوتس كراميل",
      price: 204, category: "waffle", categoryAr: "وافل", available: true, image: IMG, recommended: true,
    },
    "azura-ice-cream-sandwich-waffle": {
      name: "Azura Ice Cream Sandwich Waffle", nameAr: "وافل ايس كريم ساندوتش ازورا",
      description: "Azura ice cream sandwich waffle", descriptionAr: "وافل ايس كريم ساندوتش ازورا",
      price: 189, category: "waffle", categoryAr: "وافل", available: true, image: IMG,
    },
    "kinder-waffle": {
      name: "Kinder Waffle", nameAr: "وافل كيندر",
      description: "Waffle with Kinder", descriptionAr: "وافل كيندر",
      price: 219, category: "waffle", categoryAr: "وافل", available: true, image: IMG,
    },
    "pistachio-waffle": {
      name: "Pistachio Waffle", nameAr: "وافل بستاشيو",
      description: "Waffle with pistachio", descriptionAr: "وافل بستاشيو",
      price: 234, category: "waffle", categoryAr: "وافل", available: true, image: IMG,
    },
    "chocolate-marshmallow-waffle": {
      name: "Chocolate Marshmallow Waffle", nameAr: "وافل شوكلت مارشميلو",
      description: "Waffle with chocolate and marshmallow", descriptionAr: "وافل شوكولاتة ومارشميلو",
      price: 199, category: "waffle", categoryAr: "وافل", available: true, image: IMG,
    },
    "chocolate-banana-waffle": {
      name: "Chocolate Banana Waffle", nameAr: "وافل شوكلت بنانا",
      description: "Waffle with chocolate and banana", descriptionAr: "وافل شوكولاتة وموز",
      price: 179, category: "waffle", categoryAr: "وافل", available: true, image: IMG,
    },
  },

  // ─── DESSERTS ─────────────────────────────────────────────────────────────
  "desserts": {
    "molten-cake": {
      name: "Molten Cake", nameAr: "مولتن كيك",
      description: "Warm chocolate molten cake", descriptionAr: "مولتن كيك شوكولاتة دافئ",
      price: 178, category: "desserts", categoryAr: "حلويات", available: true, image: IMG, recommended: true,
    },
    "san-sabastian": {
      name: "San Sabastian", nameAr: "سان سبستيان",
      description: "San Sabastian cheesecake", descriptionAr: "كيك سان سبستيان",
      price: 170, category: "desserts", categoryAr: "حلويات", available: true, image: IMG,
    },
    "brownies": {
      name: "Brownies", nameAr: "براونيز",
      description: "Rich chocolate brownies", descriptionAr: "براونيز شوكولاتة",
      price: 155, category: "desserts", categoryAr: "حلويات", available: true, image: IMG,
    },
    "red-velvet": {
      name: "Red Velvet", nameAr: "ريد فيلفيت",
      description: "Classic red velvet cake", descriptionAr: "كيك ريد فيلفيت",
      price: 165, category: "desserts", categoryAr: "حلويات", available: true, image: IMG,
    },
    "cheese-cake": {
      name: "Cheese Cake", nameAr: "تشيز كيك",
      description: "Classic cheesecake", descriptionAr: "تشيز كيك كلاسيك",
      price: 170, category: "desserts", categoryAr: "حلويات", available: true, image: IMG,
    },
    "ice-cream": {
      name: "Ice Cream", nameAr: "ايس كريم",
      description: "Scoop of ice cream", descriptionAr: "بولة ايس كريم",
      price: 55, category: "desserts", categoryAr: "حلويات", available: true, image: IMG,
    },
    "triple-chocolate": {
      name: "Triple Chocolate", nameAr: "تريبل شوكليت",
      description: "Triple chocolate cake", descriptionAr: "كيك تريبل شوكليت",
      price: 159, category: "desserts", categoryAr: "حلويات", available: true, image: IMG,
    },
    "cookies-cake": {
      name: "Cookies Cake", nameAr: "كوكيز كيك",
      description: "Cookies cake", descriptionAr: "كوكيز كيك",
      price: 165, category: "desserts", categoryAr: "حلويات", available: true, image: IMG,
    },
    "kinder-cake": {
      name: "Kinder Cake", nameAr: "كيندر كيك",
      description: "Kinder chocolate cake", descriptionAr: "كيك كيندر",
      price: 165, category: "desserts", categoryAr: "حلويات", available: true, image: IMG,
    },
    "oreo-cake": {
      name: "Oreo Cake", nameAr: "اوريو كيك",
      description: "Oreo cake", descriptionAr: "كيك اوريو",
      price: 165, category: "desserts", categoryAr: "حلويات", available: true, image: IMG,
    },
  },

  // ─── CREPE ────────────────────────────────────────────────────────────────
  "crepes": {
    "chocolate-crepe": {
      name: "Chocolate Crepe", nameAr: "شوكلت كريب",
      description: "Chocolate crepe", descriptionAr: "كريب شوكولاتة",
      price: 212, category: "crepes", categoryAr: "كريب", available: true, image: IMG,
    },
    "banana-caramel-crepe": {
      name: "Banana Caramel Crepe", nameAr: "بنانا كراميل كريب",
      description: "Crepes filled with bananas and cabbage, topped with caramel sauce", descriptionAr: "كريب محشو موز وملفوف ومغطا بصوص الكراميل",
      price: 180, category: "crepes", categoryAr: "كريب", available: true, image: IMG,
      ingredients: ["bananas", "caramel sauce"], ingredientsAr: ["موز", "صوص كراميل"],
    },
    "strawberry-chocolate-crepe": {
      name: "Strawberry Chocolate Crepe", nameAr: "ستروبيري شوكلت كريب",
      description: "Strawberry-filled crepe topped with chocolate sauce", descriptionAr: "كريب محشو فراولة ملفوف ومغطا بصوص الشوكليت",
      price: 180, category: "crepes", categoryAr: "كريب", available: true, image: IMG,
      ingredients: ["strawberry", "chocolate sauce"], ingredientsAr: ["فراولة", "صوص شوكليت"],
    },
    "lotus-crepe": {
      name: "Lotus Crepe", nameAr: "لوتس كريب",
      description: "Crepes filled with Lotus biscuits and nuts, topped with Lotus sauce", descriptionAr: "كريب محشو بيسكوت اللوتس والمكسرات ومغطا بصوص اللوتس",
      price: 195, category: "crepes", categoryAr: "كريب", available: true, image: IMG,
      ingredients: ["Lotus biscuits", "nuts", "Lotus sauce"], ingredientsAr: ["بيسكوت اللوتس", "مكسرات", "صوص اللوتس"],
    },
    "crepe-brownies": {
      name: "Crepe Brownies", nameAr: "براونيز كريب",
      description: "Crepes filled with brownies and mixed chocolate", descriptionAr: "كريب محشو براونيز مع ميكس شوكلت",
      price: 229, category: "crepes", categoryAr: "كريب", available: true, image: IMG,
      ingredients: ["brownies", "mixed chocolate"], ingredientsAr: ["براونيز", "ميكس شوكلت"],
    },
    "cheesecake-crepe": {
      name: "Cheesecake Crepe", nameAr: "تشيز كيك كريب",
      description: "Crepes filled with cheesecake with a choice of sauce", descriptionAr: "كريب محشو تشيز كيك مع اختيار الصوص",
      price: 239, category: "crepes", categoryAr: "كريب", available: true, image: IMG, recommended: true,
    },
    "pistachio-crepe": {
      name: "Pistachio Crepe", nameAr: "بيستاشيو كريب",
      description: "Pistachio crepe", descriptionAr: "كريب بيستاشيو",
      price: 219, category: "crepes", categoryAr: "كريب", available: true, image: IMG,
    },
    "azura-crepe": {
      name: "Azura Crepe", nameAr: "ازورا كريب",
      description: "Azura special crepe", descriptionAr: "كريب ازورا المميز",
      price: 219, category: "crepes", categoryAr: "كريب", available: true, image: IMG,
    },
  },

  // ─── MINI PANCAKES ────────────────────────────────────────────────────────
  "mini_pancakes": {
    "mini-chocolate-pancakes": {
      name: "Mini Chocolate Pancakes", nameAr: "ميني بان كيك شوكلت",
      description: "Mini chocolate pancakes", descriptionAr: "ميني بان كيك شوكليت",
      price: 168, category: "mini_pancakes", categoryAr: "بان كيك مصغر", available: true, image: IMG,
    },
    "mix-for-you": {
      name: "Mix For You", nameAr: "مكس فور يو",
      description: "Mixed mini pancakes", descriptionAr: "ميني بان كيك مشكل",
      price: 198, category: "mini_pancakes", categoryAr: "بان كيك مصغر", available: true, image: IMG,
    },
  },

  // ─── PANCAKES ─────────────────────────────────────────────────────────────
  "pancakes": {
    "chocolate-pancakes": {
      name: "Chocolate Pancakes", nameAr: "شوكلت بان كيك",
      description: "3 layers of pancakes with a choice of two types of chocolate", descriptionAr: "٣ طبقات من البان كيك مع اختيار نوعين من الشوكلاته",
      price: 180, category: "pancakes", categoryAr: "بان كيك", available: true, image: IMG,
    },
    "mixed-chocolate-pancakes": {
      name: "Mixed Chocolate Pancakes", nameAr: "ميكس شوكلت بان كيك",
      description: "3 layers of pancakes with 4 types of chocolate: dark, milk, white, Nutella", descriptionAr: "٣ طبقات من البان كيك مع ٤ انواع من الشوكلاته: دارك - ميلك - وايت - نوتيلا",
      price: 234, category: "pancakes", categoryAr: "بان كيك", available: true, image: IMG, recommended: true,
    },
    "brownie-club-pancakes": {
      name: "Brownie Club Pancakes", nameAr: "برواني كلوب بان كيك",
      description: "3 layers of pancakes with brownie pieces and chocolate mix", descriptionAr: "٣ طبقات من البان كيك مع قطع البراونيز وميكس الشوكلاته",
      price: 279, category: "pancakes", categoryAr: "بان كيك", available: true, image: IMG,
    },
    "mix-berry-pancakes": {
      name: "Mix Berry Pancakes", nameAr: "ميكس بيري بان كيك",
      description: "3 layers of pancakes with mixed berries and white chocolate", descriptionAr: "٣ طبقات من البان كيك مع الميكس بيري والوايت شوكلت",
      price: 259, category: "pancakes", categoryAr: "بان كيك", available: true, image: IMG,
    },
    "crunchy-lotus-pancakes": {
      name: "Crunchy Lotus Pancakes", nameAr: "كرنش لوتس بان كيك",
      description: "3 layers of pancakes with sauce and Lotus biscuits", descriptionAr: "٣ طبقات من البان كيك مع صوص وبسكوت اللوتس",
      price: 211, category: "pancakes", categoryAr: "بان كيك", available: true, image: IMG,
    },
    "strawberry-chocolate-pancakes": {
      name: "Strawberry Chocolate Pancakes", nameAr: "ستروبيري شوكلت بان كيك",
      description: "3 layers of pancakes with fresh strawberry pieces and chocolate mix", descriptionAr: "٣ طبقات من البان كيك مع قطع فراولة الطازجه مع ميكس شوكلاته",
      price: 189, category: "pancakes", categoryAr: "بان كيك", available: true, image: IMG,
    },
    "pistachio-pancakes": {
      name: "Pistachio Pancakes", nameAr: "بيستاشيو بان كيك",
      description: "3 layers of pancakes with pistachio sauce", descriptionAr: "٣ طبقات من البان كيك مع صوص البيستاشيو",
      price: 255, category: "pancakes", categoryAr: "بان كيك", available: true, image: IMG,
    },
    "marshmallow-smores-pancakes": {
      name: "Marshmallow S'mores Pancakes", nameAr: "مارشميلو سمورز بان كيك",
      description: "3 layers of pancakes with marshmallows and dark chocolate. Served with a scoop of ice cream.", descriptionAr: "٣ طبقات من البان كيك مع المارشميلو والدارك شوكلت. يقدم مع بوله ايس كريم",
      price: 189, category: "pancakes", categoryAr: "بان كيك", available: true, image: IMG,
    },
  },

  // ─── EXTRA DRINKS ─────────────────────────────────────────────────────────
  "extra_drinks": {
    "extra-sauce-drink": {
      name: "Sauce", nameAr: "صوص",
      description: "Extra sauce for drinks", descriptionAr: "اضافة صوص",
      price: 25, category: "extra_drinks", categoryAr: "مشروبات إضافية", available: true, image: IMG,
    },
    "extra-flavor": {
      name: "Flavor", nameAr: "نكهات",
      description: "Extra flavor", descriptionAr: "اضافة نكهة",
      price: 25, category: "extra_drinks", categoryAr: "مشروبات إضافية", available: true, image: IMG,
    },
    "extra-topping": {
      name: "Topping", nameAr: "توبينج",
      description: "Extra topping", descriptionAr: "اضافة توبينج",
      price: 30, category: "extra_drinks", categoryAr: "مشروبات إضافية", available: true, image: IMG,
    },
    "extra-milk": {
      name: "Milk", nameAr: "لبن",
      description: "Extra milk", descriptionAr: "اضافة لبن",
      price: 25, category: "extra_drinks", categoryAr: "مشروبات إضافية", available: true, image: IMG,
    },
    "extra-ice-cream-drink": {
      name: "Ice Cream", nameAr: "ايس كريم",
      description: "Extra scoop of ice cream", descriptionAr: "اضافة ايس كريم",
      price: 50, category: "extra_drinks", categoryAr: "مشروبات إضافية", available: true, image: IMG,
    },
    "extra-nuts": {
      name: "Nuts", nameAr: "مكسرات",
      description: "Extra nuts", descriptionAr: "اضافة مكسرات",
      price: 45, category: "extra_drinks", categoryAr: "مشروبات إضافية", available: true, image: IMG,
    },
    "extra-pistachio": {
      name: "Pistachio", nameAr: "بيستاشيو",
      description: "Extra pistachio", descriptionAr: "اضافة بيستاشيو",
      price: 50, category: "extra_drinks", categoryAr: "مشروبات إضافية", available: true, image: IMG,
    },
    "extra-espresso-shot": {
      name: "Espresso Shot", nameAr: "اسبرسو",
      description: "Extra espresso shot", descriptionAr: "اضافة شوت اسبريسو",
      price: 35, category: "extra_drinks", categoryAr: "مشروبات إضافية", available: true, image: IMG,
    },
  },

  // ─── SOFT DRINKS ──────────────────────────────────────────────────────────
  "soft_drinks": {
    "water": {
      name: "Water", nameAr: "مياه",
      description: "Mineral water", descriptionAr: "مياه معدنية",
      price: 29, category: "soft_drinks", categoryAr: "مشروبات غازية", available: true, image: IMG,
    },
    "pepsi-miranda-seven": {
      name: "Pepsi / Miranda / Seven", nameAr: "بيبسي - ميرندا - سفن",
      description: "Pepsi, Miranda, or Seven Up", descriptionAr: "بيبسي أو ميرندا أو سفن",
      price: 65, category: "soft_drinks", categoryAr: "مشروبات غازية", available: true, image: IMG,
    },
    "red-bull": {
      name: "Red Bull", nameAr: "ريدبول",
      description: "Red Bull energy drink", descriptionAr: "ريدبول انرجي درينك",
      price: 115, category: "soft_drinks", categoryAr: "مشروبات غازية", available: true, image: IMG,
    },
    "fairuz": {
      name: "Fairuz", nameAr: "فيروز",
      description: "Fairuz sparkling water", descriptionAr: "فيروز مياه غازية",
      price: 80, category: "soft_drinks", categoryAr: "مشروبات غازية", available: true, image: IMG,
    },
    "birell": {
      name: "Birell", nameAr: "بريل",
      description: "Birell non-alcoholic malt beverage", descriptionAr: "بريل مشروب مالت",
      price: 85, category: "soft_drinks", categoryAr: "مشروبات غازية", available: true, image: IMG,
    },
  },

  // ─── SHISHA / HOOKAH ──────────────────────────────────────────────────────
  "shisha": {
    "hookah-mix": {
      name: "Hookah Mix", nameAr: "شيشة ميكس",
      description: "Mixed hookah", descriptionAr: "شيشة ميكس",
      price: 180, category: "shisha", categoryAr: "شيشة", available: true, image: IMG,
    },
    "pyrex-hookah": {
      name: "Pyrex Hookah", nameAr: "شيشة بايركس",
      description: "Pyrex hookah", descriptionAr: "شيشة بايركس",
      price: 190, category: "shisha", categoryAr: "شيشة", available: true, image: IMG,
    },
    "luxury-hookah": {
      name: "Luxury Hookah", nameAr: "شيشة فاخر",
      description: "Luxury hookah", descriptionAr: "شيشة فاخرة",
      price: 150, category: "shisha", categoryAr: "شيشة", available: true, image: IMG,
    },
    "hookah": {
      name: "Hookah", nameAr: "شيشة معسل",
      description: "Standard hookah", descriptionAr: "شيشة معسل",
      price: 65, category: "shisha", categoryAr: "شيشة", available: true, image: IMG,
    },
    "pyrex-twin-hookah": {
      name: "Pyrex Twin Hookah", nameAr: "شيشة بايركس توين",
      description: "Double Pyrex hookah", descriptionAr: "شيشة بايركس توين",
      price: 210, category: "shisha", categoryAr: "شيشة", available: true, image: IMG,
    },
    "azura-hookah": {
      name: "Azura Hookah", nameAr: "شيشة ازورا",
      description: "Azura special hookah", descriptionAr: "شيشة ازورا المميزة",
      price: 220, category: "shisha", categoryAr: "شيشة", available: true, image: IMG, recommended: true,
    },
    "ice-lay": {
      name: "Ice Lay", nameAr: "لي ايس",
      description: "Ice hookah add-on", descriptionAr: "اضافة لي ايس",
      price: 30, category: "shisha", categoryAr: "شيشة", available: true, image: IMG,
    },
    "shisha-extra": {
      name: "Extra (Molasses)", nameAr: "غيار معسل",
      description: "Extra molasses refill", descriptionAr: "غيار معسل",
      price: 55, category: "shisha", categoryAr: "شيشة", available: true, image: IMG,
    },
  },
};
