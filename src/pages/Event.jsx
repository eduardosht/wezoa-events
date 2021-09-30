import React, { useCallback } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import FooterAction from "../components/FooterAction/FooterAction";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import * as moment from "moment";

import { useHistory, withRouter } from "react-router-dom";

import { authConfig } from "../firebase";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Caíque Zuerol",
  "Willian Hira",
  "Luiz dos Códigos",
  "Melquera",
  "Felipe Barros",
  "Eduardo sht",
  "Markeraaa",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Event = () => {
  const history = useHistory();

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [date, setDate] = React.useState(null);
  const [hour, setHour] = React.useState(null);
  const [personName, setPersonName] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = React.useState(
    "Sobre o que vamos falar? \n\nDescrição: \n\nExemplo prático? [Sim | Não] \n\nÁrea: [Front-end | Back-end | DevOps | Negócio | Design | Teste] \n\nDuração: "
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleAddEvent = () => {
    if (!personName[0] || !description || !date || !title || !hour) {
      setOpen(true);
      return;
    }

    authConfig
      .firestore()
      .collection("events")
      .add({
        author: personName[0],
        description: description,
        date: date,
        dateBeauty:
          moment(date).format("DD/MM/YYYY") +
          " " +
          moment(hour).format("HH:mm"),
        title: title,
      })
      .then((data) => {
        history.push("/dashboard");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert severity="warning" style={{ color: "black" }}>
            Preenche direito ai karai
          </Alert>
        </Snackbar>
      </Stack>
      <div style={{ maxWidth: "80%" }}>
        <Box noValidate gridColumn="span 12" style={{ marginBottom: 20 }}>
          <h1 style={{ marginTop: 30 }}>Adicionar evento</h1>
          <Stack spacing={1} direction="row">
            <TextField
              required
              id="outlined-basic"
              label="Tema"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onError={() => setOpen(true)}
            />
          </Stack>
        </Box>
        <Box noValidate gridColumn="span 12" style={{ marginBottom: 20 }}>
          <Stack spacing={1} direction="row">
            <TextField
              required
              id="filled-multiline-static"
              label="Descrição"
              multiline
              rows={9}
              defaultValue={description}
              variant="filled"
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
              onError={() => setOpen(true)}
            />
          </Stack>
        </Box>
        <Box noValidate gridColumn="span 12" style={{ marginBottom: 20 }}>
          <Stack spacing={2}>
            <Select
              displayEmpty
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Apresentador</em>;
                }

                return selected.join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
              native={false}
              required
              onError={() => setOpen(true)}
            >
              <MenuItem disabled value="">
                <em>Placeholder</em>
              </MenuItem>
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Box>
        <Box noValidate gridColumn="span 12" style={{ marginBottom: 20 }}>
          <Stack spacing={1} direction="row">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data da apresentação"
                value={date}
                onChange={(newDate) => {
                  setDate(newDate);
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => <TextField {...params} />}
                onError={() => setOpen(true)}
              />
              <TimePicker
                label="Hora"
                value={hour}
                onChange={(newHour) => {
                  setHour(newHour);
                }}
                renderInput={(params) => <TextField disabled {...params} />}
                onError={(error) => setOpen(true)}
              />
            </LocalizationProvider>
          </Stack>
        </Box>
        <Box noValidate gridColumn="span 12" style={{ marginBottom: 20 }}>
          <Stack spacing={1} direction="row">
            <Button variant="outlined" onClick={() => handleAddEvent()}>
              Confirmar
            </Button>
          </Stack>
        </Box>
        <FooterAction />
      </div>
    </ThemeProvider>
  );
};

export default withRouter(Event);
