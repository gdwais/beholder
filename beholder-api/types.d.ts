import {
  ProcessedAssetTrait,
  Asset as PrismaAsset,
  EvaluatedAsset,
  EvaluatedAssetTrait,
  Wallet,
} from "@prisma/client";

export type Asset = PrismaAsset;

export type ProcessedAsset = Asset & {
  processedTraits: ProcessedAssetTrait[];
};

export type ExpandedEvaluatedAsset = EvaluatedAsset & {
  wallet: Wallet;
  traits: EvaluatedAssetTrait[];
};

export type ExpandedAsset = Asset & {
  processedTraits: ProcessedAssetTrait[];
  evaluatedAssets: ExpandedEvaluatedAsset[];
};

export type Nft = {
  mint: string;
  image: string;
  name: string;
};
