'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { _terms_and_conditions } from 'src/_mock/_footer';
import SyaratDanKetentuanHero from '../syarat-dan-ketentuan-hero';

// ----------------------------------------------------------------------

export default function SyaratDanKetentuanView() {
  const { title, intro, release_date, sections } = _terms_and_conditions;

  const renderHeader = (
    <Box mb={4}>
      <Typography variant='h4' gutterBottom>
        {title}
      </Typography>
      <Typography variant='h6' color='textSecondary' gutterBottom>
        Release Date: {release_date}
      </Typography>
      <Typography variant='subtitle1' paragraph>
        {intro.greeting}
      </Typography>
      <Typography variant='subtitle1' paragraph>
        {intro.thanks}
      </Typography>
      <Typography variant='subtitle1' paragraph>
        {intro.advice}
      </Typography>
      <Typography variant='subtitle1' paragraph>
        {intro.agreement}
      </Typography>
      <Typography variant='subtitle1' paragraph>
        {intro.feedback}
      </Typography>
      <Divider sx={{ my: 4 }} />
    </Box>
  );

  const renderSections = sections.map((section, index) => (
    <Box key={section.title} mb={4}>
      <Typography variant='h5' gutterBottom sx={{ my: 3 }}>
        {index + 1 + '.'} {section.title}
      </Typography>
      {section.content.map((item) =>
        item.description ? (
          <Box key={item.key} mb={2}>
            <Typography variant='body1' paragraph>
              {item.description}
            </Typography>
            <List>
              {item.points.map((point, index) => (
                <ListItem key={index}>
                  <ListItemText primary={point} />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Typography key={item.key} variant='body1' paragraph>
            <span className='me-2 font-semibold'>{item.key}</span>

            {item.text}
          </Typography>
        )
      )}
      <Divider sx={{ my: 2 }} />
    </Box>
  ));

  return (
    <>
      <SyaratDanKetentuanHero />
      <Container sx={{ py: 5 }}>
        <Box>
          {renderHeader}
          {renderSections}
        </Box>
      </Container>
    </>
  );
}
