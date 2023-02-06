import { useEffect, useState } from "react";
import { Asset, Trait } from "../types";
import {
  getRandomNft,
  getTraits,
  saveCollectedTraits,
} from "../services/evaluation-service";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Autocomplete,
  Chip,
  TextField,
} from "@mui/material";

const WALLET_ID = "DQ2sedN64Pz61WFYMcbvYYw8vuvQD1yG4agq5gUvpzfe";

export const Evaluator = () => {
  const [randomAsset, setRandomAsset] = useState<Asset | undefined>(undefined);
  const [allTraits, setAllTraits] = useState<Trait[]>([]);
  const [collectedTraits, setCollectedTraits] = useState<string[]>([]);
  const [errorText, setErrorText] = useState<string>("");

  const loadAllTraits = async () => {
    const response = await getTraits();
    setAllTraits(response);
  };

  const loadRandomAsset = async () => {
    const response = await getRandomNft(WALLET_ID);
    setRandomAsset(response);
  };

  useEffect(() => {
    void loadData();
  }, []);

  const loadData = async () => {
    setCollectedTraits([]);
    void loadAllTraits();
    void loadRandomAsset();
  };

  const submitCollectedTraits = async () => {
    if (randomAsset && randomAsset.mint && collectedTraits.length > 0) {
      const response = await saveCollectedTraits(
        WALLET_ID,
        randomAsset.mint,
        collectedTraits
      );

      if (response) {
        window.location.reload();
      } else {
        setErrorText("There was an error during saving");
      }
    }
  };

  return randomAsset ? (
    <>
      <div className="place-content-center flex h-screen">
        <div className="grid-item m-5 content-center m-auto">
          <Card sx={{ width: 600 }}>
            <CardMedia sx={{ height: 600 }} image={randomAsset.image} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {randomAsset.name}
              </Typography>
              <Typography variant="body2" color="text.secondary"></Typography>
            </CardContent>
            <CardActions>
              <Autocomplete
                sx={{ width: "90%", backgroundColor: "white" }}
                multiple
                id="tags-filled"
                options={allTraits.map((option) => option.trait)}
                freeSolo
                defaultValue={[]}
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="describe..."
                    sx={{ backgroundColor: "white" }}
                  />
                )}
                onChange={(
                  event: React.SyntheticEvent<Element, Event>,
                  value: string[]
                ) => {
                  if (value) setCollectedTraits(value);
                }}
              />

              <Button
                onClick={() => {
                  if (collectedTraits.length > 0) {
                    void submitCollectedTraits();
                  } else {
                    setErrorText("Please describe the image.");
                  }
                }}
                size="small"
              >
                Next
              </Button>
              <div className="text-sky-400 text-red">{errorText}</div>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  ) : (
    <>no asset found</>
  );
};
