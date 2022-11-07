export type Trait = {
  trait: string;
  percentage: number;
};

export type Nft = {
  mint: string;
  name: string;
  image: string;
  traits: Trait[];
};
