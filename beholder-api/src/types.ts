import { NftTrait } from "@prisma/client";

export interface TraitContract {
  mint: string;
  trait: NftTrait;
  percentage: number;
}
