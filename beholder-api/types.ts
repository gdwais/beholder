import { NftTrait } from "@prisma/client";

export interface TTrait {
  mint: string;
  trait: NftTrait;
  percentage: number;
}

export interface TNft {
  mint: string;
  name: string;
  image: string;
  traits: TTrait[];
}