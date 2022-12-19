import React, { useState } from "react";

type HeaderProps = {
    brand: string;
    activeClass: boolean;
    setActiveClass: (value: boolean) => void;
}


const Header = (props: HeaderProps) => {
    return (
      <header>
        <h2 className="logo">{props.brand}</h2>
        <div
          onClick={() => {
            props.setActiveClass(!props.activeClass);
          }}
          className={props.activeClass ? "toggle active" : "toggle"}
        ></div>
      </header>
    );
  };

  type ContentsProps = {
    title: string;
    subtitle: string;
    content: string;
  }
  
  const Contents = (props: ContentsProps) => {
    return (
      <div className="text">
        <h2> {props.title} </h2>
        <h3> {props.subtitle} </h3>
        <p> {props.content} </p>
        <a href="#">Browse</a>
      </div>
    );
  };
  
  const Background = () => {
    return <div className="from-purple-600 to-blue-600 bg-gradient-to-l md:bg-gradient-to-r"></div>
  }

  const Overlay = () => {
    return <div className="overlay"> </div>;
  };
  
  type FooterProps = {
    content: string;
  }

  const Footer = (props: FooterProps) => {
    return (
      <div className="footer">
        {" "}
        <p>{props.content} </p>{" "}
      </div>
    );
  };
  const Menu = () => {
    return (
      <div className="menu">
        <ul>
          <li>
            <a href="#"> Home </a>
          </li>
          <li>
            <a href="#"> Home </a>
          </li>
          <li>
            <a href="#"> Home </a>
          </li>
        </ul>
      </div>
    );
  };
  export const Landing = () => {
    const [activeClass, setActiveClass] = useState<boolean>(false);
  
    return (
      <div>
        <section className={activeClass ? "active container" : "container"}>
          <Header
            setActiveClass={setActiveClass}
            activeClass={activeClass}
            brand="this brand"
          />
          <Background />
          <Overlay />
          <Contents
            title="BEHOLDER"
            subtitle="We see all."
            content="ML powered trait regognition for nfts"
          />
          <Footer content="Copyright 2022" />
        </section>
  
        <Menu />
      </div>
    );
  };
  
  