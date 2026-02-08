import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box, Button, DialogActions, Grid, Typography } from "@mui/material";
import { Transition } from "../../InputDialog";
import CustomButton from "../../CustomButton";
import { Game } from "../../../types/Game";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  game: Game | null;
}

const GamePreviewDialog: React.FC<DialogProps> = ({
  open,
  handleClose,
  game,
}) => {
  const toLink = "/" + game?.slug;

  //TODO: Do an api call here to get further game data.

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slots={{ transition: Transition }}
    >
      {game && (
        <>
          <DialogContent dividers>
            <Grid display={"flex"} height={"100%"}>
              <Grid width={"50%"} display="flex" flexDirection="column">
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
                <Typography variant="body1" component="p">
                  {game.description}
                </Typography>
              </Grid>
              <Grid
                width={"50%"}
                marginLeft={"5px"}
                display="flex"
                flexDirection="column"
              >
                {/* TODO: Edit this to maybe be an ImageSwiper or something. A simple image might be too boring */}
                {game.logo && (
                  <Box
                    component="img"
                    src={`/${game.logo}`}
                    alt={game.title}
                    sx={{ width: "100%", borderRadius: 1, mt: 2 }}
                  />
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <CustomButton to={toLink}>View Game</CustomButton>
            <Button
              onClick={handleClose}
              sx={{
                color: "var(--pink)",
              }}
            >
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default GamePreviewDialog;
