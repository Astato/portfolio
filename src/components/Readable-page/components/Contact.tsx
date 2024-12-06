import { createTheme, ThemeProvider, Alert } from "@mui/material";
import { Grid, TextField, Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { languageContext } from "../ReadableApp";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: "118px",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#9c5f3f", /// white
      dark: "#f3f4f2", /// dark
      light: "#f3f4f2", /// brownm
      contrastText: "#f3f4f2",
    },
    secondary: {
      main: "#f3f4f2", /// yellow
      dark: "#f3f4f2", /// blueish
      light: "#f3f4f2", // brown
      contrastText: "#f3f4f2",
    },
  },
});

interface ContactProps {
  setMessageInProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

const Contact: React.FC<ContactProps> = ({ setMessageInProgress }) => {
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const LanguageContext = useContext(languageContext);
  const selectedLanguage = LanguageContext.language;
  const [messageSent, setMessageSent] = useState<{
    error: string;
    success: string;
  }>({ error: "", success: "" });

  useEffect(() => {}, [selectedLanguage]);

  const onMessageChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setMessage(target.value);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    const userID = import.meta.env.VITE_PUBLIC_KEY;
    const data = {
      service_id: "default_service",
      template_id: "template_6tw7ryx",
      user_id: userID,
      template_params: {
        from_name: name,
        email: email,
        message: message,
        subject: subject,
      },
    };

    if (name && email && subject && message) {
      const blockDiv = document.getElementById("block");
      if (blockDiv) {
        setMessageInProgress(true);
        blockDiv.style.display = "block";
      }
      const URL = "https://api.emailjs.com/api/v1.0/email/send";
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        });
        if (blockDiv) {
          setMessageInProgress(false);
          blockDiv.style.display = "none";
        }
        if (response.ok) {
          setMessageSent({
            error: "",
            success: "Message sent",
          });
          setName("");
          setMessage("");
          setSubject("");
          setEmail("");
        } else {
          setMessageSent({
            error:
              "An error has ocurred when trying to send the email, please try again",
            success: "",
          });
        }
      } catch (error) {
        setMessageSent({
          error:
            "An error has ocurred when trying to send the email, please try again",
          success: "",
        });
        if (blockDiv) {
          setMessageInProgress(false);
          blockDiv.style.display = "none";
        }
        console.log(error);
      }
    }
  };

  return (
    <Grid item xs={12} id="contact">
      <ThemeProvider theme={theme}>
        <h1>Contact</h1>
        <form style={{ gap: "1rem" }} onSubmit={(e) => e.preventDefault()}>
          {messageSent.error ||
            (messageSent.success && (
              <Alert
                sx={{ marginTop: "-2rem" }}
                severity={messageSent.error ? "error" : "success"}
              >
                {messageSent.error || messageSent.success}
              </Alert>
            ))}
          <TextField
            label={selectedLanguage === "EN" ? "Name" : "Nombre"}
            variant="outlined"
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            required
          ></TextField>
          <TextField
            label={selectedLanguage === "EN" ? "Subject" : "Asunto"}
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            variant="outlined"
            required
          ></TextField>
          <TextField
            label={selectedLanguage === "EN" ? "Message" : "Mensaje"}
            multiline
            minRows={4}
            value={message}
            onChange={onMessageChange}
            variant="outlined"
            required
          ></TextField>
          <Button
            sx={{
              bgcolor: "#34348c",
              ":hover": {
                color: "black",
              },
            }}
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            {selectedLanguage === "EN" ? "Send" : "Enviar"}
          </Button>
        </form>
      </ThemeProvider>
    </Grid>
  );
};

export default Contact;
