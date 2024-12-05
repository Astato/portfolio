// import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";
import React, { createContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import "./pageStyle.scss";
import languageText from "./language.json";

export interface LanguageProps {
  navbar: string[];
  landing_title: string;
  about: string;
  projects: { title: string; description: string }[];
  footer: string[];
}

interface LanguageText {
  [key: string]: LanguageProps;
}
interface LanguageContextProps {
  text: LanguageProps;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const languageData = languageText as LanguageText;

export const languageContext = createContext<LanguageContextProps>({
  text: languageData["EN"],
  language: "EN",
  setLanguage: () => {},
});

interface ReadableAppProps {
  isSmallScreen: boolean;
}

const ReadableApp: React.FC<ReadableAppProps> = ({ isSmallScreen }) => {
  const [language, setLanguage] = useState<string>("EN");
  const [text, setText] = useState<LanguageProps>(languageData[language]);
  const [messageIsProgress, setMessageInProgress] = useState<boolean>(false);

  useEffect(() => {
    setText(languageData[language]);
  }, [language, text]);

  return (
    <Grid
      container
      columns={12}
      height={"100%"}
      width={"100vw"}
      className="App"
    >
      <languageContext.Provider value={{ text, setLanguage, language }}>
        <Navbar
          isSmallScreen={isSmallScreen}
          messageInProgress={messageIsProgress}
        ></Navbar>
        <Home />
        <About />
        <Projects />
        <Contact setMessageInProgress={setMessageInProgress} />
        <Footer />
      </languageContext.Provider>
    </Grid>
  );
};

export default ReadableApp;
