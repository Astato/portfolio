import { Grid } from "@mui/material";
import { useEffect, useContext, useRef } from "react";
import { languageContext } from "../ReadableApp";
function Home() {
  const LanguageContext = useContext(languageContext);
  const landingText: string | null =
    LanguageContext && LanguageContext.text
      ? LanguageContext.text.landing_title
      : null;
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ref.current && landingText) {
      ref.current.innerHTML = landingText;
    }
  }, [landingText]);
  return (
    <Grid container columns={12} id="home" margin={"auto"} width={"100vw"}>
      <h1 ref={ref}></h1>
    </Grid>
  );
}
export default Home;
