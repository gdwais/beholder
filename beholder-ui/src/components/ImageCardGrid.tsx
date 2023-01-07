import { useState, useEffect } from "react";
import { Asset } from "../types";
import { useAppDispatch, useAppSelector } from "../store";
import { getPredictionsByTrait, getTraits } from "../services";

export const ImageCardGrid = () => {
  const dispatch = useAppDispatch();

  const [nfts, setNfts] = useState<Asset[]>([]);

  const [selectedTrait, setSelectedTrait] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (selectedTrait) {
      const loadPredictions = async () => {
        const response = await getPredictionsByTrait(selectedTrait);
        setNfts(response);
      };

      loadPredictions();
    }
  }, [selectedTrait]);

  const handleChange = (trait: string) => {
    setSelectedTrait(trait);
  };

  useEffect(() => {
    const loadTraits = async () => {
      const response = await getTraits();
      //dispatch(setTraits(response));
    };

    loadTraits();
  }, []);

  return (
    <>
      {/* <div className="flex flex-row px-10">
        {traits.length > 0 &&
          traits.map((trait, index) => {
            return (
              <div>
                <Button
                  key={trait.trait}
                  onClick={() => {
                    handleChange(trait.trait);
                  }}
                >
                  {trait.trait}
                </Button>
              </div>
            );
          })}
      </div>
      <Grid container spacing={4}>
        {nfts.map((nft) => (
          <Grid item xs={2}>
            <ImageCard
              key={`ImageCard-${nft.mint}`}
              mint={nft.mint}
              image={nft.image}
              name={nft.name}
              traits={nft.}
            />
          </Grid>
        ))}
      </Grid> */}
    </>
  );
};
