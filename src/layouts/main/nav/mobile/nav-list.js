import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import Collapse from "@mui/material/Collapse";
import { useActiveLink } from "src/routes/hooks/use-active-link";
import { NavSectionVertical } from "src/components/nav-section";
import { NavItem } from "./nav-item";

export default function NavList({ data }) {
  const active = useActiveLink(data.path, !!data.children);
  const [openMenu, setOpenMenu] = useState(false);

  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu((prev) => !prev);
    }
  }, [data.children]);

  const handleClick = () => {
    if (data.id) {
      localStorage.setItem("id", data.id);
      localStorage.setItem("search", data.title);
      if (location.pathname === "/products") {
        window.location.reload();
      }
    }
  };

  return (
    <>
      <NavItem
        open={openMenu}
        onClick={() => {
          handleToggleMenu();
          handleClick();
        }}
        title={data.title}
        path={data.path}
        icon={data.icon}
        hasChild={!!data.children}
        externalLink={data.path.includes("http")}
        active={active}
      />

      {!!data.children && (
        <Collapse in={openMenu} unmountOnExit>
          <NavSectionVertical
            data={data.children}
            slotProps={{
              rootItem: {
                minHeight: 36,
              },
            }}
          />
        </Collapse>
      )}
    </>
  );
}

NavList.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    icon: PropTypes.element,
    id: PropTypes.number,
    children: PropTypes.array,
  }),
};
