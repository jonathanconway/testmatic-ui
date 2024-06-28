import {
  Tooltip as MUITooltip,
  TooltipProps as MUITooltipProps,
  tooltipClasses as muiTooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const Tooltip = styled(({ className, ...props }: MUITooltipProps) => (
  <MUITooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${muiTooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    border: "solid 1px silver",
    boxShadow: theme.shadows[1],
    fontSize: 12,
    padding: "0.25rem",
    cursor: "pointer",
  },
}));
