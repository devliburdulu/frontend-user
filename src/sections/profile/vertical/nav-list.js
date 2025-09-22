import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";

import Collapse from "@mui/material/Collapse";

import { usePathname } from "src/routes/hooks";
import { useActiveLink } from "src/routes/hooks/use-active-link";

import NavItem from "./nav-item";

// ----------------------------------------------------------------------

export default function NavList({ data, depth, slotProps, filter, setFilter }) {
  const pathname = usePathname();

  const active = useActiveLink(data.path, !!data.children);

  const [openMenu, setOpenMenu] = useState(active);
  //

  useEffect(() => {
    if (!active) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu((prev) => !prev);
    } else {
      // setFilter((filter)=>{
      //   return{
      //     ...filter,
      //     menu: data.title,
      //   }
      // });
      filterSet();
      //
    }
  }, [data.children]);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  function filterSet() {
    //
  }

  return (
    <>
      <NavItem
        open={openMenu}
        onClick={handleToggleMenu}
        //
        title={data.title}
        path={data.path}
        icon={data.icon}
        info={data.info}
        roles={data.roles}
        caption={data.caption}
        disabled={data.disabled}
        //
        depth={depth}
        hasChild={!!data.children}
        externalLink={data.path.includes("http")}
        currentRole={slotProps?.currentRole}
        //
        active={active}
        className={active ? "active" : ""}
        sx={{
          mb: `${slotProps?.gap}px`,
          ...(depth === 1 ? slotProps?.rootItem : slotProps?.subItem),
        }}
      />

      {!!data.children && (
        <Collapse in={openMenu} unmountOnExit>
          <NavSubList data={data.children} depth={depth} slotProps={slotProps} filter={filter} setFilter={setFilter} />
        </Collapse>
      )}
    </>
  );
}

NavList.propTypes = {
  data: PropTypes.object,
  depth: PropTypes.number,
  slotProps: PropTypes.object,
  setFilter: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

function NavSubList({ data, depth, slotProps, filter, setFilter }) {
  return (
    <>
      {data.map((list) => (
        <NavList key={list.title} data={list} depth={depth + 1} slotProps={slotProps} filter={filter} setFilter={setFilter} />
      ))}
    </>
  );
}

NavSubList.propTypes = {
  data: PropTypes.array,
  depth: PropTypes.number,
  slotProps: PropTypes.object,
};
