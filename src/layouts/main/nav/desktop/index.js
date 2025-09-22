import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function NavDesktop({ data }) {
  return (
    <Stack
      component='nav'
      direction='row'
      gap={{ xs: 4, lg: 5 }}
      spacing={{ xs: 2.5, lg: 5 }}
      sx={{ ml: { xs: 1.5, lg: 4 }, height: 1 }}>
      {data.map((list) => (
        <NavList key={list.title} data={list} />
      ))}
    </Stack>
  );
}

NavDesktop.propTypes = {
  data: PropTypes.array,
};
