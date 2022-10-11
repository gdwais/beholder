import { ReactElement, useEffect, useRef } from "react";
import { Card, CardHeader, CardContent, Paper } from "@mui/material";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { Trait } from "../types";

type ImageCardProps = {
  mint: string;
  image: string;
  name: string;
  traits: Trait[];
};

export const ImageCard = ({
  mint,
  image,
  name,
  traits,
}: ImageCardProps) => {
  
  return (
    <section key={mint}>
      {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> */}
      <Card
        sx={{
          width: 150,
          marginBottom: "6px",
          boxShadow: "",
          borderRadius: "4px",
          background: "white",
        }}
        className="bg-white text-black"
      >
        <CardHeader
          title={
            <span className="text-base font-bold font-sofiaPro text-black">{name}</span>
          }
        />
        <section
          className="grid grid-cols-1 justify-items-center items-center mx-auto font-sofiaPro"
          style={{ width: "150px", minHeight: "112px" }}
        >
          <LazyLoadImage
            key={`ImageCardImage-${mint}`}
            alt={name}
            className="rounded-lg cursor-pointer"
            src={image}
            style={{ maxHeight: "112px", maxWidth: "auto" }}
          />
        </section>
        <CardContent sx={{ padding: "12px" }}>
          <span className="">
            <ul>
              {traits.map((trait) => (
                <li className="text-xs text-black">
                  {trait.trait} : {trait.percentage.toString().substring(0, 4)}
                </li>
              ))}
            </ul>
          </span>
        </CardContent>
      </Card>
      
    </section>
  );
};
