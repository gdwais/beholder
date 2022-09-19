import React, { useEffect, useState } from "react";
import "./App.css";

import { ImageCard } from "./components";
import {
  Grid,
  ImageList,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { Nft } from "./types";
import apiClient from "./client";

function App() {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [partialList, setPartialList] = useState<Nft[]>([]);
  const [traits, setTraits] = useState<string[]>([]);
  const [selectedTrait, setSelectedTrait] = useState<string | undefined>(
    undefined
  );

  const loadNfts = async (selectedTrait: string) => {
    const response = await apiClient.get(`/predictions/${selectedTrait}`);
    if (response && response.data) {
      setNfts(response.data);
      setPartialList([...response.data.slice(0, 10)]);
    }
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const target = event.target;
    console.log(`handleChange `, target);
    setSelectedTrait(target.value);
    loadNfts(target.value);
  };

  useEffect(() => {
    const loadTraits = async () => {
      const response = await apiClient.get("/traits");
      if (response && response.data) {
        setTraits(response.data);
      }
    };

    loadTraits();
  }, []);

  const queryMore = () => {
    const updatedDataList = [
      ...partialList,
      ...nfts.slice(partialList.length, partialList.length + 10),
    ];
    setPartialList(updatedDataList);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Beholder!</h1>
      </header>
      <body className="app-body">
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTrait}
          label="Age"
          onChange={handleChange}
        >
          {traits.map((t) => (
            <MenuItem value={t}>{t}</MenuItem>
          ))}
        </Select>
        <Grid container spacing={4}>
          {partialList.map((nft) => (
            <Grid item xs={2}>
              <ImageCard
                mint={nft.mint}
                image={nft.image}
                name={nft.name}
                traits={nft.traits}
                queryMore={queryMore}
              />
            </Grid>
          ))}
        </Grid>
      </body>
    </div>
  );
}

export default App;
