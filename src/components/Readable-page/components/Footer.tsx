import { Grid, Typography, List, ListItem, Tooltip } from "@mui/material";
//  href="www.github.com/Astato?tab=repositories"
import { useContext, useEffect } from "react";
import { languageContext } from "../ReadableApp";
function Footer() {
  const LanguageContext = useContext(languageContext);
  const selectedLanguage = LanguageContext.language;

  useEffect(() => {}, [selectedLanguage]);

  return (
    <Grid item xs={12} id="footer">
      <Grid>
        <List>
          <Tooltip title="Open" placement="left" arrow>
            <ListItem
              onClick={() =>
                window.open(
                  "https://www.github.com/Astato?tab=repositories",
                  "_blank"
                )
              }
            >
              Github
            </ListItem>
          </Tooltip>
        </List>
        <List style={{ padding: "0 1rem 1rem 1rem" }}>
          <ListItem
            disablePadding
            onClick={() => (window.location.href = "#projects")}
          >
            {selectedLanguage === "EN" ? "Projects" : "Proyectos"}
          </ListItem>
          <ListItem disablePadding>
            <p
              style={{ margin: "0 auto" }}
              onClick={() => (window.location.href = "#home")}
            >
              {selectedLanguage === "EN" ? "Home" : "Inicio"}
            </p>
          </ListItem>
        </List>
        <List>
          <Tooltip title="Open" placement="right" arrow>
            <ListItem
              sx={{ ":hover": { cursor: "" } }}
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/gabriel-leiva-48844a249/",
                  "_blank"
                )
              }
            >
              Linkedin
            </ListItem>
          </Tooltip>
        </List>
      </Grid>
      <Typography variant="body2"></Typography>
    </Grid>
  );
}

export default Footer;
