import React, { useEffect, useState } from "react";
import "./App.css";

import { ImageCard } from "./components";
import { Grid, ImageList } from "@mui/material";

import { Nft } from "./types";
import apiClient from "./client";

function App() {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [partialList, setPartialList] = useState<Nft[]>([]);

  useEffect(() => {
    const loadNfts = async () => {
      const response = await apiClient.get("/predictions");
      if (response && response.data) {
        setNfts(response.data);
        setPartialList([...response.data.slice(0, 10)]);
      }
    };

    loadNfts();
  }, []);

  const queryMore = () => {
    console.log(`queryMore`);
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
