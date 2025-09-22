import { useState, useEffect, useRef } from 'react';
import { Box, Tab, Tabs, Grid, Card, Typography } from '@mui/material';
import ProductContentTab from './ProductContentTab';
import ProductContentAction from './ProductContentAction';

export default function ProductContentDetail({
  childrenProduct,
  subSku,
  data,
  tabs,
  seller,
  image,
  price,
  specialPrice,
  downPayment,
  qty,
  cart,
  value,
  valueMin,
  valueMax,
  setValue,
  handleChange,
  handleChangeCustomOption,
  isAddToCart,
  isBuyNow,
  handleAddToCart,
  handleBuyNow,
  isHotelConvention,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]);
  const [isManualScroll, setIsManualScroll] = useState(false);

  const handleClick = (index) => {
    setIsManualScroll(true);
    const targetId = `section-${tabs[index].code}`;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(index); // Set manual active tab
      // setTimeout(() => {
      //   setIsManualScroll(false);
      // }, 700); // waktu animasi scroll
    }
  };

  useEffect(() => {
    if (!tabs.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -49% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      // Ambil semua entry yang intersecting
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      // Cari section yang paling atas di viewport (top >= 0, paling kecil)
      let topEntry = null;
      let minTop = Infinity;
      visibleEntries.forEach((entry) => {
        if (
          entry.boundingClientRect.top >= 0 &&
          entry.boundingClientRect.top < minTop
        ) {
          minTop = entry.boundingClientRect.top;
          topEntry = entry;
        }
      });

      // Jika tidak ada yang top >= 0, ambil yang paling besar < 0 (sudah lewat atas)
      if (!topEntry && visibleEntries.length > 0) {
        let maxNegativeTop = -Infinity;
        visibleEntries.forEach((entry) => {
          if (
            entry.boundingClientRect.top < 0 &&
            entry.boundingClientRect.top > maxNegativeTop
          ) {
            maxNegativeTop = entry.boundingClientRect.top;
            topEntry = entry;
          }
        });
      }

      if (topEntry) {
        const id = topEntry.target.id.replace('section-', '');
        const index = tabs.findIndex((tab) => tab.code === id);
        if (index !== -1 && !isManualScroll && index !== activeTab) {
          setActiveTab(index);
        }
      }
    }, observerOptions);

    tabRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      tabRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [tabs, isManualScroll, activeTab]);

  return (
    <div className=''>
      {/* Sticky Tabs Menu */}
      <Box
        sx={{
          position: 'sticky',
          margin: { xs: '0', md: '1.5rem 0 1rem' },
          top: { xs: 60, md: 130 },
          zIndex: 10,
          backgroundColor: '#fff',
          borderBottom: '1px solid #e0e0e0',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}>
        <Tabs
          value={activeTab}
          onChange={(e, val) => {
            handleClick(val);
          }}
          variant='scrollable'
          scrollButtons={false}
          allowScrollButtonsMobile={false}
          TabIndicatorProps={{
            style: { backgroundColor: '#1D9CAB', height: '2px' },
          }}
          sx={{
            padding: { xs: '0 12px 0', md: '0' },
          }}>
          {tabs.map((tab, idx) => (
            <Tab
              key={tab.code}
              label={tab.label}
              sx={{
                textTransform: 'none',
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: activeTab === idx ? 700 : 500,
                color:
                  activeTab === idx ? '#1D9CAB !important' : '#333 !important',
                borderBottom:
                  activeTab === idx ? '2px solid' : '2px solid transparent',
                borderColor: activeTab === idx ? '#1D9CAB' : 'transparent',
                transition: 'all 0.2s ease-in-out',
                whiteSpace: 'nowrap',
                marginRight: {
                  xs: '1.5rem !important',
                  md: '2rem !important',
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      <Grid
        container
        spacing={{ xs: 3, md: 5, lg: 4 }}
        sx={{ position: 'relative' }}>
        <Grid
          xs={12}
          md={8}
          lg={8}
          sx={{
            padding: {
              xs: '1rem 0 0',
              md: '1.25rem 0 0 2.5rem',
              lg: '1.25rem 0 0 2rem',
            },
          }}>
          {/* Render all tab sections here */}
          <ProductContentTab tabs={tabs} tabRefs={tabRefs} />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          sx={{
            position: { xs: 'fixed', md: 'relative' },
            bottom: { xs: 0, md: 'auto' },
            right: { xs: 0, md: 'auto' },
            width: { xs: '100%', md: 'auto' },
            zIndex: { xs: 15, md: 5 },
            backgroundColor: { xs: '#fff', md: 'transparent' },
            boxShadow: { xs: '0 -2px 8px rgba(0,0,0,0.08)', md: 'none' },
            padding: {
              xs: '0.5rem 0.85rem !important',
              md: '2rem 0 0 1.5rem !important',
            },
          }}>
          <Card
            sx={{
              p: { xs: 0, md: 3 },
              borderRadius: { xs: 0, md: 2 },
              boxShadow: { xs: 'none', md: 2 },
              position: { xs: 'static', md: 'sticky' },
              top: { md: 220 },
            }}>
            <ProductContentAction
              data={data}
              seller={seller}
              image={image}
              price={price}
              specialPrice={specialPrice}
              downPayment={downPayment}
              qty={qty}
              cart={cart}
              value={value}
              valueMin={valueMin}
              valueMax={valueMax}
              setValue={setValue}
              handleChange={handleChange}
              handleChangeCustomOption={handleChangeCustomOption}
              isAddToCart={isAddToCart}
              isBuyNow={isBuyNow}
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
              isHotelConvention={isHotelConvention}
              childrenProduct={childrenProduct}
              subSku={subSku}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
