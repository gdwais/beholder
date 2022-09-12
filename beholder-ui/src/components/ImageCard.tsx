import { ReactElement, useEffect, useRef } from "react";
import { Card, CardHeader, CardContent } from "@mui/material";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { Trait } from "../types";

type ImageCardProps = {
  queryMore: () => void;
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
  queryMore,
}: ImageCardProps) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;

          if (+targetId % 8 === 0) {
            queryMore();
          }
        }
      },
      {
        root: null, //viewport
        rootMargin: "0px",
        threshold: 0.1, //this means that the element get detected when 10% of the card is visible
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section key={mint}>
      <Card
        sx={{
          width: 300,
          marginBottom: "12px",
          boxShadow: "",
          borderRadius: "4px",
          background: "black",
        }}
        className="bg-black text-white"
      >
        <CardHeader
          sx={{ padding: "12px" }}
          title={
            <span className="text-base font-bold font-sofiaPro text-white">{name}</span>
          }
        />
        <section
          className="grid grid-cols-1 justify-items-center items-center mx-auto font-sofiaPro"
          style={{ width: "300px", minHeight: "223px" }}
        >
          <LazyLoadImage
            key={mint}
            alt={name}
            className="rounded-lg cursor-pointer hover:bg-purpleMP"
            src={image}
            style={{ maxHeight: "225px", maxWidth: "auto" }}
          />
        </section>
        <CardContent sx={{ padding: "12px" }}>
          <span className="">
            <ul>
              {traits.map((trait) => (
                <li className="text-xs text-white">
                  {trait.trait} : {trait.percentage.toString()}
                </li>
              ))}
            </ul>
          </span>
        </CardContent>
      </Card>
    </section>
  );
};
