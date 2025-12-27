import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box, Button, DialogActions, Grid, Typography } from "@mui/material";
import { Game } from "../../../pages/Home";
import { Transition } from "../../InputDialog";
import CustomButton from "../../CustomButton";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  game: Game | null;
}

// TODO: This could be made easier by giving each card an id and storing the data for it in a db.
// That way the data doesn't have to be passed all at once, only the id
const GamePreviewDialog: React.FC<DialogProps> = ({
  open,
  handleClose,
  game,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
    >
      {game && (
        <>
          <DialogContent dividers>
            <Grid xs={6} display={"flex"} height={"100%"}>
              <Grid item width={"50%"} display="flex" flexDirection="column">
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  {game.title}
                </Typography>
                <Typography
                  variant="overline"
                  fontSize={14}
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin: 0,
                  }}
                  gutterBottom
                >
                  {game.platforms.join(" | ")}
                </Typography>
                <Typography variant="body1" paragraph>
                  {game.description}
                </Typography>
              </Grid>
              <Grid
                item
                width={"50%"}
                marginLeft={"5px"}
                display="flex"
                flexDirection="column"
              >
                {/* TODO: Edit this to maybe be an ImageSwiper or something. A simple image might be too boring */}
                {game.logo && (
                  <Box
                    component="img"
                    src={game.logo}
                    alt={game.title}
                    sx={{ width: "100%", borderRadius: 1, mt: 2 }}
                  />
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <CustomButton to={game.link}>View Game</CustomButton>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default GamePreviewDialog;
