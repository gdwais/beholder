import { AppBar as MaterialAppBar } from "@mui/material";

import { styled } from "@mui/material/styles";

export const AppBar: typeof MaterialAppBar = styled(MaterialAppBar)({
  // your custom styles go here
}) as typeof MaterialAppBar;
