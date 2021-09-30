import React, { useCallback } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import AddReaction from "@mui/icons-material/AddReaction";
import ShareIcon from "@mui/icons-material/Share";

import { useHistory, withRouter } from "react-router-dom";

const FooterAction = () => {
  const history = useHistory();

  const actions = [
    { icon: <AddReaction />, name: "Adicionar evento", path: "/add-event" },
    { icon: <ShareIcon />, name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <SpeedDial
      ariaLabel="Data da apresentação"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            history.push(action.path);
          }}
        />
      ))}
    </SpeedDial>
  );
};

export default FooterAction;
