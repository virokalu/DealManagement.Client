import { Hotel } from "./hotel";

export interface Deal {
    slug: string;
    name: string;
    video: string;
    hotels: Hotel[];
}
