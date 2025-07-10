import { Hotel } from "../hotel/hotel";

export interface Deal {
    slug: string;
    name: string;
    video: string;
    hotels: Hotel[];
}
