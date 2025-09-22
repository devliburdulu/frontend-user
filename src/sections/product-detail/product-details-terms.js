import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify';

import { getAttributeDetail } from 'src/fetch-global';
import { getHomePromo } from 'src/rest/HomePromo';
import { getTerms } from 'src/rest/TermsProduct';

// ----------------------------------------------------------------------

export default function ProductDetailsTerms() {
  const [description, setDescription] = useState([]);

  useEffect(() => {
    const fetchTerms = async () => {
      const response = await getTerms();
      if (response) {
        const desc = response.content;
        setDescription(desc);
      }
    };

    fetchTerms();
  }, []);

  return (
    <div className='divide-y divide-gray py-3 px-4 md:px-6 max-h-[580px] md:max-h-[540px] overflow-y-auto h-[560px] md:h-[520px]'>
      <div className='my-2'>
        <Typography
          variant='body2'
          color='text.primary'
          paragraph
          sx={{
            fontSize: {
              xs: '0.875rem',
              md: '1rem',
              paddingLeft: '0 !important',
              paddingRight: '0 !important',
            },
            '& p': { typography: '16px', m: '0.75rem 0 0.25rem' },
            // '& a': { color: 'inherit', textDecoration: 'none' },
            // '& strong': { typography: '16px' },
            '& ol ': {
              typography: '14px',
              fontSize: '14px',
              listStyle: 'auto',
              pl: '0.75rem',
              mb: '0.85rem',
            },
          }}
          dangerouslySetInnerHTML={{
            __html: description,
          }}></Typography>
      </div>
    </div>
  );
}
