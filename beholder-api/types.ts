import {
  ProcessedAssetTrait,
  Asset,
  EvaluatedAsset,
  EvaluatedAssetTrait,
  Wallet,
} from "@prisma/client";

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
