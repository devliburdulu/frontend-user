import PropTypes from "prop-types";
import { memo, useState, useCallback } from "react";
import Link from "next/link";

import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";

// ----------------------------------------------------------------------

function NavSectionVertical({ data, slotProps, ...other }) {
  return (
    <Stack component="nav" id="nav-section-vertical" {...other}>
      {data.map((group, index) => (
        <Group key={group.subheader || index} subheader={group.subheader} items={group.items} slotProps={slotProps} />
      ))}
    </Stack>
  );
}

NavSectionVertical.propTypes = {
  data: PropTypes.array,
  slotProps: PropTypes.object,
};

export default memo(NavSectionVertical);

// ----------------------------------------------------------------------

function Group({ subheader, items, slotProps }) {
  const [open, setOpen] = useState(true);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <Stack sx={{ px: 2 }}>
      {subheader && (
        <>
          <ListSubheader
            disableGutters
            disableSticky
            onClick={handleToggle}
            sx={{
              fontSize: 11,
              cursor: "pointer",
              typography: "overline",
              display: "inline-flex",
              color: "text.disabled",
              mb: `${slotProps?.gap || 4}px`,
              p: (theme) => theme.spacing(2, 1, 1, 1.5),
              transition: (theme) =>
                theme.transitions.create(["color"], {
                  duration: theme.transitions.duration.shortest,
                }),
              "&:hover": {
                color: "text.primary",
              },
              ...slotProps?.subheader,
            }}
          >
            {subheader}
          </ListSubheader>

          <Collapse in={open}>
            {items.map((item) => (
              <NavItemLink key={item.title} data={item} />
            ))}
          </Collapse>
        </>
      )}

      {!subheader && items.map((item) => <NavItemLink key={item.title} data={item} />)}
    </Stack>
  );
}

Group.propTypes = {
  items: PropTypes.array,
  subheader: PropTypes.string,
  slotProps: PropTypes.object,
};

// ----------------------------------------------------------------------

function NavItemLink({ data }) {
  //
  // Jika title adalah "Hotel & Convention", maka path diubah menjadi "hotel"
  // const path = data.title === 'Hotel & Convention' ? 'hotel' : data.path;
  //

  const handleClick = () => {
    if (data.id && data.title) {
      localStorage.setItem("id", data.id);
      localStorage.setItem("search", data.title);
    }
  };

  return data.path ? (
    <Link href={data.path} passHref>
      <Button
        fullWidth
        variant="text"
        onClick={handleClick}
        sx={{
          padding: "10px 12px",
          justifyContent: "flex-start",
          color: "#637381",
          textTransform: "none",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        {data.title}
      </Button>
    </Link>
  ) : (
    <Button
      fullWidth
      variant="text"
      onClick={handleClick}
      sx={{
        padding: "10px 12px",
        justifyContent: "flex-start",
        color: "#637381",
        textTransform: "none",
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      {data.title}
    </Button>
  );
}

NavItemLink.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    path: PropTypes.string,
  }).isRequired,
};
