const IMG = {
  wing: "https://media.base44.com/images/public/6a4ff623bcb54a9328faff16/d64b731fd_generated_d03a597d.png",
  crust: "https://media.base44.com/images/public/6a4ff623bcb54a9328faff16/2a3b0bffd_generated_59c89633.png",
  bread: "https://media.base44.com/images/public/6a4ff623bcb54a9328faff16/6b44b9520_generated_01d1b5c5.png",
  scorched: "https://media.base44.com/images/public/6a4ff623bcb54a9328faff16/9862bfd80_generated_ad57f7cc.png",
};

export const HERO_IMAGE = IMG.wing;
export const SCORCHED_BG = IMG.scorched;

const PHOTOS = {
  princes1: "https://lh3.googleusercontent.com/grass-cs/AABkmLeO3_6IH8YVgDFuljQDtcKeBMCbh17SfBVyi42Yk-P_1jfbQLnAuPIlBGZ2CxDQpUQ5paupO8mG26TSyZjGG2QKIHCTZk5S-sEzFCo861JfESAZk7ILuDOP1_iXEVo1JZKwQqaV=s680-w680-h510-rw",
  princes2: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RpiwIcsvxnV_DhqknbOt4UZLgb_omyhEDQUZRBpxymdMJkLIMNhf7gVb0-fbEHsZPaNQOPuN8TO6AsU-7Pu5PNaFZJt0mRDSMIo9Vqj4szgwXycvjDtZRumjHNU5QSSwz60An3l9LEIC19=s680-w680-h510-rw",
  hattie1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzXoR1XDxTm4ta_Ii9ug2dTpYQ_AFPIAsUya0HWZvJGghw6O7Wc28Y4qE&s=10",
  hattie2: "https://cdn.prod.website-files.com/643d59ec34f67a709d4fb759/66180b51f2871a08e21ab627_HBS-Web-AboutUs-FoodHero.jpg",
  lillys1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIIGLQ1_p7mHEA34aAUVaME3xT5y_plAAKoEDsO2Uhu47vllXN1zpOtVG8&s=10",
  lillys2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVKcVZDeT0BLkwlcu3Fj6i4HDNpd0V2-Lgu72q3oUowZso8xob3w4HIjWA&s=10",
  edleys1: "https://nashvillemusiccity.wordpress.com/wp-content/uploads/2013/11/edleyshotchicken415x272.jpg",
  edleys2: "https://d1w7312wesee68.cloudfront.net/x1Qqa-uI9IEpj37t-_zg_PUoJhjoZOkwnKZvU-23Bfo/resize:fit:720:720/plain/s3://toasttab/restaurants/restaurant-77617000000000000/menu/images/item-54fefd09-5358-4adb-bd9b-b01d789ca184.png",
  hurts1: "https://d2e0de1b167b6d2ec0ea.cdn6.editmysite.com/uploads/b/d2e0de1b167b6d2ec0ea76c98a442c6982a9e08fb497034e8645575362aab8a7/BA35642F-7362-4604-A388-15D6342EB1E0_1614509424.jpeg?width=2400&optimize=medium",
  hurts2: "https://s3-media0.fl.yelpcdn.com/bphoto/UIT6RlXgStAesoAyD5xT4Q/348s.jpg",
  momma1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoz6blPOucyl5erByxu6H1q2jG4OkIx8mQIWkEfn0Gjn4sK-OkaVh7j2Q&s=10",
  momma2: "https://bft-production.storage.googleapis.com/resources/trucks/6627/images/high/mommajoy-s-hot-chicken-more-6627.jpg?1706204953",
};

export const RESTAURANTS = [
  {
    name: "Prince's Hot Chicken",
    neighborhood: "South Nashville",
    address: "5814 Nolensville Pk #110, Nashville, TN 37211",
    heat_level: 9,
    heat_label: heatLevelToLabel(9),
    overall_flavor: 9,
    smoke_level: 3,
    description: "First hot chicken restaurant ever!",
    spice_profile: "Overall flavor 9/10 · Smoke 3/10",
    image_url: PHOTOS.princes1,
    photos: [PHOTOS.princes1, PHOTOS.princes2],
    lat: 36.1595, lng: -86.7775,
    rank: 1,
  },
  {
    name: "Hattie B's Hot Chicken",
    neighborhood: "Midtown",
    address: "https://www.hattieb.com/locations",
    heat_level: 7,
    heat_label: heatLevelToLabel(7),
    overall_flavor: 4,
    smoke_level: 1,
    description: "",
    spice_profile: "Overall flavor 4/10 · Smoke 1/10",
    image_url: PHOTOS.hattie1,
    photos: [PHOTOS.hattie1, PHOTOS.hattie2],
    lat: 36.1515, lng: -86.7955,
    rank: 2,
  },
  {
    name: "Lilly's Hot Chicken",
    neighborhood: "Nashville",
    address: "https://streetfoodfinder.com/lillyshotchicken?tab=calendar",
    heat_level: 10,
    heat_label: heatLevelToLabel(10),
    overall_flavor: 10,
    smoke_level: 4,
    description: "Best ranch ever.",
    spice_profile: "Overall flavor 10/10 · Smoke 4/10",
    image_url: PHOTOS.lillys1,
    photos: [PHOTOS.lillys1, PHOTOS.lillys2],
    lat: 36.1627, lng: -86.7816,
    rank: 3,
  },
  {
    name: "Edley's BBQ",
    neighborhood: "Nashville",
    address: "https://www.edleysbbq.com",
    heat_level: 5,
    heat_label: heatLevelToLabel(5),
    overall_flavor: 8,
    smoke_level: 9,
    description: "Great smoky flavor.",
    spice_profile: "Overall flavor 8/10 · Smoke 9/10",
    image_url: PHOTOS.edleys1,
    photos: [PHOTOS.edleys1, PHOTOS.edleys2],
    lat: 36.1255, lng: -86.7905,
    rank: 4,
  },
  {
    name: "Hurt's Hot Chicken",
    neighborhood: "Nashville",
    address: "https://streetfoodfinder.com/hurtshotchicken?tab=calendar",
    heat_level: 4,
    heat_label: heatLevelToLabel(4),
    overall_flavor: 8,
    smoke_level: 7,
    description: "Amazing, sweet flavor.",
    spice_profile: "Overall flavor 8/10 · Smoke 7/10",
    image_url: PHOTOS.hurts1,
    photos: [PHOTOS.hurts1, PHOTOS.hurts2],
    lat: 36.1627, lng: -86.7816,
    rank: 5,
  },
  {
    name: "Momma Joy's Hot Chicken",
    neighborhood: "Nashville",
    address: "https://streetfoodfinder.com/MommaJoys",
    heat_level: 6,
    heat_label: heatLevelToLabel(6),
    overall_flavor: 7,
    smoke_level: 3,
    description: "Great flavor.",
    spice_profile: "Overall flavor 7/10 · Smoke 3/10",
    image_url: PHOTOS.momma1,
    photos: [PHOTOS.momma1, PHOTOS.momma2],
    lat: 36.1627, lng: -86.7816,
    rank: 6,
  },
];

// Every photo from the spreadsheet (photo 1 + photo 2 for each restaurant)
export const COLLAGE_IMAGES = Object.values(PHOTOS);

export function heatLevelToLabel(level) {
  if (level <= 3) return "MILD";
  if (level <= 5) return "MEDIUM";
  if (level <= 6) return "HOT";
  if (level <= 7) return "DAMN HOT";
  if (level <= 8) return "FIRE";
  return "SHUT THE CLUCK UP";
}

export const HEAT_TICKS = [
  { level: 1, label: "MILD" },
  { level: 3, label: "MEDIUM" },
  { level: 5, label: "HOT" },
  { level: 6, label: "DAMN HOT" },
  { level: 8, label: "FIRE" },
  { level: 10, label: "SHUT THE CLUCK UP" },
];