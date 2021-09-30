import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import FooterAction from "../components/FooterAction/FooterAction";
import Loader from "../components/Loader/Loader";

import { withRouter } from "react-router-dom";
import { authConfig } from "../firebase";

const Dashboard = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const getEventList = async () => {
    let events = [];
    const docRef = authConfig.firestore().collection("events");
    let d = new Date();
    d.setHours(0, 0, 0, 0);

    await docRef
      .orderBy("date", "asc")
      .where("date", ">", d)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          events.push(doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    setEvents(events);
    setIsLoading(false);
  };

  React.useEffect(() => {
    getEventList();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <h1 style={{ marginTop: 30 }}>Nossos eventos</h1>

      {isLoading && <Loader />}

      {!isLoading && !events.length && (
        <p>Nenhum evento encontrado 😞. Sorry guys, bora CS!</p>
      )}

      {!isLoading &&
        events.length !== 0 &&
        events.map((event, index) => {
          return (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {event.author} | {event.dateBeauty}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {event.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  whiteSpace: "pre-line",
                  lineBreak: "anywhere",
                  backgroundColor: "#3a3a3a",
                  paddingTop: 30,
                }}
              >
                <Typography>{event.description}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}

      <FooterAction />
    </ThemeProvider>
  );
};

export default withRouter(Dashboard);
