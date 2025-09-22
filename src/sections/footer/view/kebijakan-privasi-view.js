'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { fDate } from 'src/utils/format-time';
import { getPrivacyPolicy } from 'src/rest/PrivacyPolicy';
import KebijakanPrivasiHero from '../kebijakan-privasi-hero';

// ----------------------------------------------------------------------

export default function KebijakanPrivasiView() {
  const [policy, setPolicy] = useState([]);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await getPrivacyPolicy();
        const formattedPolicy = {
          title: response.title,
          banner: `${process.env.NEXT_PUBLIC_IMAGE_EDU}${response.banner.url}`,
          description: response.content,
          date: response.update_time,
        };
        setPolicy(formattedPolicy);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPolicy();
  }, []);

  const renderHeader = (
    <Box mb={3}>
      <Typography
        variant='caption'
        color='textSecondary'
        sx={{ fontSize: { xs: '14px', md: '15px' } }}>
        Berlaku Sejak {fDate(policy.date)}
      </Typography>
      <Typography variant='h4' gutterBottom sx={{ marginTop: '0.5rem' }}>
        {policy.title} PT. Liburnesia Digital Nusantara
      </Typography>
      <Divider sx={{ my: 2 }} />
    </Box>
  );

  const renderDesc = (
    <Typography
      variant='caption'
      paragraph
      sx={{
        fontSize: {
          xs: '14px',
          md: '16px',
        },
        lineHeight: { xs: '26px', md: '28px' },
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        marginBottom: { xs: '1rem', md: '0' },
        color: '#212B36',
        '& p strong': {
          fontSize: { xs: '16px', md: '18px' },
          fontWeight: '700',
          margin: '1rem 0 0',
        },
        '& p a:link': {
          color: 'blue',
        },
        '& ul': {
          listStyle: 'inherit',
          padding: '0 0 0 1.25rem',
        },
        '& ol': {
          listStyle: 'auto',
          padding: '0 0 0 1rem',
        },
        '& ol li strong': {
          fontWeight: '500',
        },
        '& ol li strong:nth-child(1)': {
          fontWeight: '600',
        },
        '& ol > li::marker': {
          fontWeight: '600',
        },
      }}
      dangerouslySetInnerHTML={{ __html: policy?.description }}
    />
  );

  return (
    <>
      <KebijakanPrivasiHero policy={policy} />
      <Container sx={{ py: 5 }}>
        <Box>
          {renderHeader}
          {renderDesc}
        </Box>
      </Container>
    </>
  );
}
