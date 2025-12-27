import React from "react";
import { Container } from "@mui/material";
import GameBreakdown from "../../components/pages/games/GameBreakdown";
import csharplogo from "../../assets/pages/games/c-sharp-logo.png";
import unitylogo from "../../assets/pages/games/unity-logo.png";
import { BackToHomeButton } from "../../components/BackToHomeButton";
import visualBoard from "../../assets/pages/games/Biosynth/milanote.png";

const Biosynth: React.FC = () => {
  const gameDescription =
    "Set in a futuristic, isometric world inspired by floating mountains and vintage-modern architecture, the game follows a newcomer joining a tightly structured community. Everyone is assigned a role — yours is in the kitchen of a rustic tavern, where cooking becomes a daily rhythm through interactive mini-games. Outside work, the world opens up: players can explore markets, gardens, libraries, and embassies, taking on favors and quests in a society built on barter. The overarching story involves a looming threat to the land, pushing the player to build skills, form connections, and find ways to protect the fragile balance of the world.";

  return (
    <>
      <BackToHomeButton />
      <Container sx={{ marginTop: 4 }}>
        <GameBreakdown
          title="Biosynth"
          description={gameDescription}
          date="2025-06-29"
          platforms={["PC"]}
          status="Planning"
          logos={[
            { name: csharplogo, alt: "C# Logo", invert: false },
            { name: unitylogo, alt: "Unity Logo", invert: true },
          ]}
          gameArt={{
            src: visualBoard,
            alt: "Biosynth",
          }}
        />
        <div style={{ margin: 50 }} />
      </Container>
    </>
  );
};

export default Biosynth;

// FIXME: when opening this page get the following console error
// Warning: Failed prop type: The prop `xs` of `Grid` can only be used together with the `item` prop.
//     at Grid2 (http://localhost:5173/node_modules/.vite/deps/@mui_material.js?v=d79daa09:16841:22)
//     at GameBreakdown (http://localhost:5173/src/components/pages/games/GameBreakdown.tsx:26:3)
//     at div
//     at http://localhost:5173/node_modules/.vite/deps/chunk-PMEAJYFO.js?v=d79daa09:1734:50
//     at Container3 (http://localhost:5173/node_modules/.vite/deps/chunk-JFGFDM2N.js?v=d79daa09:2029:19)
//     at Biosynth
//     at RenderedRoute (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=d79daa09:4000:5)
//     at Routes (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=d79daa09:4434:5)
//     at Router (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=d79daa09:4377:15)
//     at BrowserRouter (http://localhost:5173/node_modules/.vite/deps/react-router-dom.js?v=d79daa09:5122:5)
//     at App (http://localhost:5173/src/App.tsx:29:3)
// printWarning @ react_jsx-dev-runtime.js?v=d79daa09:64
// error @ react_jsx-dev-runtime.js?v=d79daa09:48
// checkPropTypes @ react_jsx-dev-runtime.js?v=d79daa09:451
// validatePropTypes @ react_jsx-dev-runtime.js?v=d79daa09:778
// jsxWithValidation @ react_jsx-dev-runtime.js?v=d79daa09:876
// GameBreakdown @ GameBreakdown.tsx:59
// renderWithHooks @ chunk-5MJJNU6A.js?v=d79daa09:11596
// mountIndeterminateComponent @ chunk-5MJJNU6A.js?v=d79daa09:14974
// beginWork @ chunk-5MJJNU6A.js?v=d79daa09:15962
// beginWork$1 @ chunk-5MJJNU6A.js?v=d79daa09:19806
// performUnitOfWork @ chunk-5MJJNU6A.js?v=d79daa09:19251
// workLoopSync @ chunk-5MJJNU6A.js?v=d79daa09:19190
// renderRootSync @ chunk-5MJJNU6A.js?v=d79daa09:19169
// performSyncWorkOnRoot @ chunk-5MJJNU6A.js?v=d79daa09:18927
// flushSyncCallbacks @ chunk-5MJJNU6A.js?v=d79daa09:9166
// (anonymous) @ chunk-5MJJNU6A.js?v=d79daa09:18677Understand this error
