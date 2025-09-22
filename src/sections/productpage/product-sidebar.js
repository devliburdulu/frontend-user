import {
  Button,
  Card,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useNavData } from './sidebar-list';
import { NavSectionVertical } from '.';
import { useResponsive } from 'src/hooks/use-responsive';
import { useEffect, useMemo, useState } from 'react';
import { getCategory } from 'src/fetch-global';
import { slugify } from 'src/utils/slugify';

export default function ProductSidebar({
  filter,
  setFilter,
  searchValue,
  setSearchValue,
  priceValue,
  setPriceValue,
}) {
  const mdUp = useResponsive('up', 'md');

  const [sidebar, setSidebar] = useState([]);

  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        const result = await getCategory();
        const newSidebarItems = result.children_data
          .filter((item) => item.is_active)
          .map((item) => ({
            title: item.name,
            // path: paths.product.root,
            path: `/products/${slugify(item.name)}`,
            id: item.id,
          }));
        setSidebar(newSidebarItems);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataCategory();
  }, []);

  const data = useMemo(
    () => [
      {
        subheader: 'Kategori',
        items: sidebar,
      },
    ],
    [sidebar]
  );

  return (
    <>
      {mdUp && (
        <Card className='py-2 pb-5 me-5 h-fit divide-y divide-gray'>
          <List
            filter={filter}
            setFilter={setFilter}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            priceValue={priceValue}
            setPriceValue={setPriceValue}
            data={data}
          />
        </Card>
      )}
      {!mdUp && (
        <div className='py-2 pb-5 me-5 w-full h-[520px] divide-y divide-gray overflow-y-auto'>
          <List
            filter={filter}
            setFilter={setFilter}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            priceValue={priceValue}
            setPriceValue={setPriceValue}
            data={data}
          />
        </div>
      )}
    </>
  );
}

function List({ filter, setFilter, priceValue, setPriceValue, data }) {
  const handleMinPriceChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      event.target.value = value;
    } else {
      event.target.value = value.replace(/[^0-9]/g, '');
    }
    //
    setPriceValue((price) => {
      return {
        ...price,
        min: event.target.value,
      };
    });
  };

  const handleMaxPriceChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      event.target.value = value;
    } else {
      event.target.value = value.replace(/[^0-9]/g, '');
    }
    //
    setPriceValue((price) => {
      return {
        ...price,
        max: event.target.value,
      };
    });
  };

  const seeAll = () => {
    setFilter((filter) => {
      return {
        ...filter,
        categoryName: 'Semua Produk',
        categoryId: 0,
        search: '',
        maxPrice: -1,
        minPrice: -1,
        page: 1,
      };
    });
  };

  return (
    <>
      <div className='pb-2 md:pb-5'>
        <NavSectionVertical data={data} filter={filter} setFilter={setFilter} />
      </div>
      <div className='pt-2 md:pt-5'>
        <Container>
          <div className='grid grid-flow-row gap-3'>
            <Typography
              variant='subtitle1'
              sx={{
                textTransform: 'uppercase',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                color: '#919EAB',
              }}>
              Kisaran Harga
            </Typography>
            <TextField
              id='minimum'
              placeholder='Harga Minimum'
              variant='outlined'
              className='w-full'
              value={priceValue.min}
              onChange={handleMinPriceChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='center' className='mr-2'>
                    Rp
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#212b36',
                  fontWeight: 'bold',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#919EAB',
                    borderWidth: '1px',
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderWidth: '1.5px',
                    },
                  },
                },
              }}
            />
            <TextField
              id='maximum'
              placeholder='Harga Maximum'
              variant='outlined'
              className='w-full'
              value={priceValue.max}
              onChange={handleMaxPriceChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='center' className='mr-2'>
                    Rp
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#212b36',
                  fontWeight: 'bold',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#919EAB',
                    borderWidth: '1px',
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderWidth: '1.5px',
                    },
                  },
                },
              }}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
