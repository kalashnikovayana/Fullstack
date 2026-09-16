/* Harmony — real image assets. There are only 10 source photos total (6
   service shots + 4 master portraits), so brows/makeup/spa borrow a photo
   from a service in a DIFFERENT category — picked so the three never look
   identical to each other or to their real "Обличчя" neighbour when the
   category filter is on. SERVICE_ICON/SERVICE_TINT stay as the fallback
   for any future service that ships with no photo at all. */

// Every source photo is 1672×941 (native size, used for width/height to
// avoid layout shift; display size is controlled by CSS).
export const PHOTO_SIZE = { width: 1672, height: 941 };
export const HERO_SIZE = { width: 1965, height: 2944 };

export const SERVICE_IMG = {
  "hair-color": "/images/salon-blow-drying-hair.jpg",
  "haircut": "/images/woman-getting-hair-cut-at-salon.jpg",
  "care": "/images/woman-stylist-cuts-hair-at-salon.jpg",
  "manicure": "/images/hands-with-nail-polish-line-up-fabric.jpg",
  "pedicure": "/images/b6907119-6469-4e60-8c1a-cec5925ee309.png",
  "face": "/images/woman-opening-cosmetic-jar.jpg",
  "brows": "/images/woman-getting-makeup-applied.jpg",
  "makeup": "/images/woman-getting-makeup-in-natural-light.jpg",
  "spa": "/images/massage-therapy-upper-back.jpg",
};

export const SERVICE_ICON = {
  brows: "star",
  makeup: "sparkle",
  spa: "user",
};

export const SERVICE_TINT = {
  brows: "gold",
  makeup: "rose",
  spa: "teal",
};

export const MASTER_IMG = {
  olha: "/images/m-olha.png",
  iryna: "/images/m-iryna.png",
  daria: "/images/m-daria.png",
  sofia: "/images/m-sofia.png",
};

export const HERO_IMG = "/images/a-model-in-summery-clothes.jpg";

export const GALLERY = [
  { id: "g2", src: SERVICE_IMG["hair-color"], cls: "g-tall" },
  { id: "g3", src: "/images/woman-stylist-cuts-hair-at-salon.jpg" },
  { id: "g4", src: SERVICE_IMG["manicure"] },
  { id: "g5", src: SERVICE_IMG["pedicure"], cls: "g-wide" },
  { id: "g6", src: SERVICE_IMG["face"] },
  { id: "g7", src: SERVICE_IMG["care"] },
];

export const BLOG_IMG = {
  "b-1": "/images/woman-stylist-cuts-hair-at-salon.jpg",
  "b-2": SERVICE_IMG["manicure"],
  "b-3": "/images/getting-makeup-done.jpg",
};

const TINTS = ["rose", "gold", "teal"];
export function reviewTint(index) {
  return TINTS[index % TINTS.length];
}
