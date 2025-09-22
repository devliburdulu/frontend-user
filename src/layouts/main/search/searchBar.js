import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Box,
  Paper,
  Typography,
  Avatar,
  Skeleton,
  InputAdornment,
  ClickAwayListener,
  Dialog,
  DialogContent,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { getProductSearch } from 'src/rest/Product';
import { getCategoryById } from 'src/fetch-global';
import Label from 'src/components/label/label';
import Image from 'next/image';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [productCategories, setProductCategories] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const router = useRouter();
  const searchInputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [filter, setFilter] = useState({
    categoryId: 0,
    search: '',
    minPrice: -1,
    maxPrice: -1,
    page: 1,
  });

  const fetchCategoryNames = async (categoryIds, productId) => {
    try {
      const categoryNames = await Promise.all(
        categoryIds.map(async (id) => {
          const data = await getCategoryById(id);
          return data ? data.name : null;
        })
      );
      setProductCategories((prev) => ({
        ...prev,
        [productId]: categoryNames.filter(Boolean),
      }));
    } catch (error) {
      console.error('Error fetching category names:', error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(searchValue);
      if (isFirstLaunch) {
        setIsFirstLaunch(false);
      } else {
        if (searchValue && searchValue.trim().length >= 2) {
          setFilter((prevFilter) => ({
            ...prevFilter,
            search: searchValue.trim(),
            page: 1,
          }));
        } else {
          setFilter((prevFilter) => ({
            ...prevFilter,
            search: '',
            page: 1,
          }));
          setSearchResults([]);
        }
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchValue, isFirstLaunch]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!filter.search.trim() || !isFocused || !isOpen) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await getProductSearch(filter.page, 100, {
          search: filter.search,
          minPrice: filter.minPrice > 0 ? filter.minPrice : undefined,
          maxPrice: filter.maxPrice > 0 ? filter.maxPrice : undefined,
        });

        if (response && response.items) {
          setSearchResults(response.items);
          response.items.forEach((product) => {
            if (product.custom_attributes) {
              const categoryAttr = product.custom_attributes.find(
                (attr) => attr.attribute_code === 'category_ids'
              );
              if (categoryAttr && categoryAttr.value) {
                fetchCategoryNames(categoryAttr.value, product.id);
              }
            }
          });
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isFocused && isOpen) {
      fetchSearchResults();
    }
  }, [filter, isFocused, isOpen]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const handleHeaderInputClick = () => {
    setIsOpen(true);
    setIsFocused(true);
  };

  const handleClickAway = () => {
    if (!isMobile) {
      setIsOpen(false);
      setIsFocused(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsFocused(false);
    setSearchValue('');
  };

  const handleProductClick = (product) => {
    setIsOpen(false);
    setSearchValue('');
    setIsFocused(false);
    if (product.sku) {
      router.push(`/products/${product.sku}`);
    }
  };

  const getProductImage = (product) => {
    if (
      product.media_gallery_entries &&
      product.media_gallery_entries.length > 0
    ) {
      const firstImage = product.media_gallery_entries[0];
      if (firstImage && firstImage.file) {
        return `${process.env.NEXT_PUBLIC_MAGENTO_API}/pub/media/catalog/product${firstImage.file}`;
      }
    }
    return '/placeholder-image.jpg';
  };

  const getProductLocation = (product) => {
    if (product.custom_attributes) {
      const locationAttr = product.custom_attributes.find(
        (attr) => attr.attribute_code === 'city'
      );
      if (locationAttr && locationAttr.value) {
        return locationAttr.value;
      }
    }
    return '';
  };

  const getMitraInformation = (product) => {
    if (product.custom_attributes) {
      const mitraAttr = product.custom_attributes.find(
        (attr) => attr.attribute_code === 'seller_name'
      );
      if (mitraAttr && mitraAttr.value) {
        return mitraAttr.value;
      }
    }
    return '';
  };

  const getProductCategories = (product) => {
    return productCategories[product.id] || [];
  };

  const SearchContent = () => (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          p: isMobile ? '1rem 0.75rem' : 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            fullWidth
            placeholder={
              isMobile
                ? 'Mau liburan ke mana hari ini?'
                : 'Temukan destinasi, hotel, dan produk wisata terbaik di sini'
            }
            value={searchValue}
            onChange={handleInputChange}
            variant='outlined'
            size='small'
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                backgroundColor: 'background.paper',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1D9CAB',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1D9CAB',
                  borderWidth: 2,
                },
              },
            }}
            sx={{
              '& .MuiInputBase-root': {
                height: 44,
              },
            }}
          />
          <IconButton onClick={handleClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>

        {searchValue.trim() && (
          <Typography
            variant='subtitle2'
            color='text.secondary'
            sx={{ mt: { xs: 2, md: 1.5 }, mb: 0 }}>
            Hasil Pencarian{' '}
            <span style={{ color: '#1D9CAB', fontStyle: 'italic' }}>
              {searchValue}
            </span>
          </Typography>
        )}
      </Box>

      {/* Loading State */}
      {isLoading && searchValue.trim() && (
        <Box sx={{ p: 1 }}>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Box key={index} sx={{ display: 'flex', p: 1.5, gap: 2 }}>
                <Skeleton
                  variant='rectangular'
                  width={60}
                  height={60}
                  sx={{ borderRadius: 1 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant='text' width='80%' height={20} />
                  <Skeleton
                    variant='text'
                    width='60%'
                    height={16}
                    sx={{ mt: 0.5 }}
                  />
                  <Skeleton
                    variant='text'
                    width='40%'
                    height={16}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Box>
            ))}
        </Box>
      )}

      {/* Search Results */}
      {!isLoading && searchResults.length > 0 && (
        <Box
          sx={{
            maxHeight: { xs: 'none', sm: 580, md: 640, lg: 680, xl: 720 },
            overflowY: 'auto',
          }}>
          {searchResults.map((product) => (
            <Box
              key={product.id}
              onClick={() => handleProductClick(product)}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                p: 1.5,
                gap: isMobile ? 1.25 : 2,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}>
              <Box sx={{ flexShrink: 0 }}>
                <Avatar
                  src={getProductImage(product)}
                  alt={product.name}
                  variant='rounded'
                  sx={{
                    width: { xs: '100%', sm: 100 },
                    height: { xs: 250, sm: 100 },
                  }}
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {getProductLocation(product) && (
                  <Typography
                    variant='caption'
                    color='#1D9CAB'
                    sx={{
                      display: 'block',
                      mb: 0.75,
                      marginLeft: '-5px',
                    }}>
                    <Image
                      src='/libur_dulu_logo_only_Converted.png'
                      alt='logo-converted'
                      height={18}
                      width={20}
                      style={{
                        objectFit: 'contain',
                        marginRight: 1,
                      }}
                    />
                    {getProductLocation(product)}
                  </Typography>
                )}
                <Typography
                  variant='body2'
                  fontWeight='medium'
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.3,
                    mb: 0.75,
                  }}>
                  {product.name}
                </Typography>

                {getMitraInformation(product) && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'left',
                      gap: 0.5,
                    }}>
                    <Typography
                      variant='caption'
                      color='text.secondary'
                      sx={{
                        mb: {
                          xs: 0,
                          md: 0.75,
                        },
                      }}>
                      Disediakan Oleh{' '}
                    </Typography>
                    <Typography
                      variant='caption'
                      color='#1D9CAB'
                      sx={{
                        mb: 0.75,
                        // ml: 0.5,
                        fontWeight: 600,
                      }}>
                      {getMitraInformation(product)}
                    </Typography>
                  </Box>
                )}

                {getProductCategories(product).length > 0 &&
                  getProductCategories(product)
                    .slice(0, 2)
                    .map((category, index) => (
                      <Label
                        key={index}
                        variant='soft'
                        color='success'
                        sx={{
                          fontWeight: 500,
                          marginRight: { xs: '0.1rem', md: '0.25rem' },
                        }}>
                        {category}
                      </Label>
                    ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {!searchValue.trim() && !isLoading && (
        <Box sx={{ p: isMobile ? '1rem 0.5rem' : 3, textAlign: 'center' }}>
          <Typography variant='body2' color='text.secondary'>
            Mulai ketik untuk mencari destinasi impian, staycation kece, atau
            trip seru? Cari di sini ✨
          </Typography>
        </Box>
      )}

      {!isLoading && searchValue.trim() && searchResults.length === 0 && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant='body2' color='text.secondary'>
            Tidak ada hasil ditemukan untuk "{searchValue}"
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: { xs: '100%', xl: 360 },
        }}>
        <TextField
          ref={searchInputRef}
          fullWidth
          placeholder='Mau liburan ke mana hari ini?'
          value=''
          onClick={handleHeaderInputClick}
          variant='outlined'
          size='small'
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              backgroundColor: 'background.paper',
              cursor: 'pointer',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1D9CAB',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1D9CAB',
                borderWidth: 2,
              },
            },
          }}
          sx={{
            '& .MuiInputBase-root': {
              height: 44,
              cursor: 'pointer',
            },
            '& .MuiInputBase-input': {
              cursor: 'pointer',
            },
          }}
        />

        {!isMobile && (
          <Dialog
            open={isOpen && isFocused}
            onClose={handleClickAway}
            maxWidth='md'
            fullWidth
            PaperProps={{
              sx: {
                position: 'fixed',
                top: { md: 40, lg: 50 },
                margin: 0,
                maxHeight: 'calc(100vh - 100px)',
                borderRadius: 2,
              },
            }}
            BackdropProps={{
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              },
            }}>
            <DialogContent sx={{ p: 0 }}>
              <SearchContent />
            </DialogContent>
          </Dialog>
        )}

        {isMobile && (
          <Drawer
            anchor='top'
            open={isOpen && isFocused}
            onClose={handleClose}
            PaperProps={{
              sx: {
                maxHeight: '100vh',
                backgroundColor: '#FFF !important',
                backgroundImage: 'none !important',
                borderRadius: '0 0 16px 16px',
              },
            }}
            BackdropProps={{
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}>
            <SearchContent />
          </Drawer>
        )}
      </Box>
    </ClickAwayListener>
  );
}
