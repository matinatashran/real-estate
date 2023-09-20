import { StaticImageData } from "next/image";

import villa from "@/public/images/villa.jpg";
import villa1 from "@/public/images/villa1.jpg";
import villa2 from "@/public/images/villa2.jpg";
// ------------------
import apartment from "@/public/images/apartment.jpg";
import apartment1 from "@/public/images/apartment1.jpg";
import apartment2 from "@/public/images/apartment2.jpg";
// ------------------
import shop from "@/public/images/shop.jpg";
import shop1 from "@/public/images/shop1.jpg";
import shop2 from "@/public/images/shop2.jpg";
// ------------------
import office from "@/public/images/office.jpg";
import office1 from "@/public/images/office1.jpg";
import office2 from "@/public/images/office2.jpg";

type CategoryType = "villa" | "apartment" | "shop" | "office";

export type ImageListType = StaticImageData[];

function getImages(category: CategoryType): ImageListType {
  const images = {
    villa: [villa, villa1, villa2],
    apartment: [apartment, apartment1, apartment2],
    shop: [shop, shop1, shop2],
    office: [office, office1, office2],
  };

  return images[category];
}

export default getImages;
