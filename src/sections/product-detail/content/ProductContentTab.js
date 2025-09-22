import { Typography, Box, Card, Divider } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  hasUlLiContent,
  processItineraryContent,
  decodeHtml,
} from './itineraryUtils';
import ItineraryDialog from './ItineraryDialog';
import ItineraryDrawer from './ItineraryDrawer';

export default function ProductContentTab({
  tabs,
  tabRefs,
  // activeTab,
  // onTabChange,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {tabs.map((tab, idx) => {
        const isProductOptions = tab.code === 'product_options';
        const isDescription = tab.code === 'short_description';
        const isItinerary = tab.code === 'itinerary';
        const hasUlLi = hasUlLiContent(tab.value);
        const itineraryData = processItineraryContent(tab.value);

        const content = (
          <Box
            component='section'
            id={`section-${tab.code}`}
            ref={(el) => (tabRefs.current[idx] = el)}
            sx={{
              scrollMarginTop: { xs: '120px', md: '200px' },
              padding:
                !isProductOptions && !isDescription
                  ? {
                      xs: '1.5rem 1rem 0.5rem 2.25rem',
                      md: '10px 20px 12px 0',
                    }
                  : {
                      xs: '0',
                      md: '0',
                    },
            }}>
            {!isProductOptions && !isDescription && (
              <Typography
                variant='h6'
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  color: '#1D9CAB',
                }}>
                {tab.label}
              </Typography>
            )}

            {tab.component ? (
              <Box>{tab.component}</Box>
            ) : isItinerary && hasUlLi ? (
              <Box sx={{ mb: { xs: 0.5, md: 2 } }}>
                {itineraryData.sections.length > 0 && (
                  <Box sx={{ mb: 0 }}>
                    <Typography
                      variant='body2'
                      paragraph
                      color='text.primary'
                      sx={{
                        mt: 1,
                        mb: 0,
                        fontWeight: 600,
                        fontSize: { xs: '0.875rem', md: '1rem' },
                      }}>
                      {itineraryData.sections[0].title}
                    </Typography>
                    <Timeline sx={{ p: '0.5rem 0', m: 0 }}>
                      {itineraryData.sections[0].items.map((item, index) => (
                        <TimelineItem
                          key={index}
                          sx={{
                            '&:before': { display: 'none' },
                            minHeight: { xs: 65, md: 55 },
                            ...(index ===
                            itineraryData.sections[0].items.length - 1
                              ? { minHeight: 30 }
                              : {}),
                          }}>
                          <TimelineSeparator>
                            <TimelineDot
                              variant='outlined'
                              color='inherit'
                              sx={{
                                color: '#1D9CAB',
                                borderColor: '#1D9CAB',
                                width: { xs: 12, md: 16 },
                                height: { xs: 12, md: 16 },
                                margin: '0.25rem 0',
                              }}
                            />
                            {index <
                              itineraryData.sections[0].items.length - 1 && (
                              <TimelineConnector sx={{ bgcolor: '#1D9CAB' }} />
                            )}
                          </TimelineSeparator>
                          <TimelineContent
                            sx={{ py: 0, px: { xs: 1, md: 1.25 } }}>
                            <Typography
                              variant='body2'
                              sx={{
                                fontSize: {
                                  xs: '0.875rem',
                                  md: '1rem',
                                },
                                lineHeight: {
                                  xs: '1.25rem',
                                  md: '1.5rem',
                                },
                                color: 'text.primary',
                              }}>
                              {decodeHtml(item)}
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </Box>
                )}
                {itineraryData.sections.length > 1 && (
                  <Typography
                    component='button'
                    onClick={() => setOpenDialog(true)}
                    sx={{
                      color: '#1D9CAB',
                      fontWeight: 600,
                      fontSize: '1rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      p: 0,
                      mt: -5,
                      textAlign: 'left',
                    }}>
                    Baca Selengkapnya
                  </Typography>
                )}
                {isMobile ? (
                  <ItineraryDrawer
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    itineraryData={itineraryData}
                    decodeHtml={decodeHtml}
                  />
                ) : (
                  <ItineraryDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    itineraryData={itineraryData}
                    decodeHtml={decodeHtml}
                  />
                )}
              </Box>
            ) : (
              <Typography
                variant='body2'
                paragraph
                color={isDescription ? '#212b36' : 'inherit'}
                sx={{
                  fontSize: {
                    xs: '0.875rem',
                    md: '1rem',
                    marginBottom: '0.75rem',
                  },
                  '& p': { typography: '1rem', m: '0 0 0.25rem' },
                  '& ul': {
                    listStyle: 'disc',
                    pl: '1.25rem',
                    mb: '0.85rem',
                  },
                  '& p strong': { fontWeight: 600 },
                  '& p span': {
                    fontSize: {
                      xs: '0.875rem !important',
                      md: '1rem !important',
                    },
                  },
                  '& a': { color: 'inherit', textDecoration: 'none' },
                  '& strong': { typography: '1rem' },
                  '& p span strong': {
                    fontWeight: 600,
                  },
                  '& ol': {
                    listStyle: 'auto',
                    pl: '0.5rem',
                    mb: '0.85rem',
                  },
                  '& ol li': {
                    marginLeft: '0.5rem',
                  },
                  '& ol li span': {
                    fontSize: {
                      xs: '0.875rem !important',
                      md: '1rem !important',
                    },
                    lineHeight: {
                      xs: '1rem !important',
                      md: '1.25rem !important',
                    },
                  },
                  '& ol li span strong': {
                    fontWeight: 600,
                  },
                }}
                dangerouslySetInnerHTML={{ __html: tab.value }}
              />
            )}
          </Box>
        );
        return isProductOptions ? (
          <div className='mb-2 md:mb-8' id={`section-${tab.code}`}>
            {isProductOptions && (
              <Typography
                variant='h6'
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  color: '#1D9CAB',
                  margin: { xs: '0 1rem 0.75rem 2.25rem', md: '0 0 0.75rem' },
                }}>
                {tab.label}
              </Typography>
            )}
            <Card
              id={`section-${tab.code}`}
              key={tab.code}
              sx={{
                background: '#F8F8F8',
                boxShadow: 'none',
                borderRadius: 2,
                padding: {
                  xs: '1.5rem 1rem',
                  md: '1.5rem 1.25rem',
                },
                margin: {
                  xs: '0 1rem 0 2.25rem',
                  md: '0 0 0 2.5rem',
                  lg: '0 0 1.25rem',
                },
              }}>
              {content}
            </Card>
          </div>
        ) : isDescription ? (
          <Card
            key={tab.code}
            sx={{
              background: '#FCF6F2',
              boxShadow: 'none',
              borderRadius: 2,
              padding: {
                xs: '0.5rem 1rem',
                md: '1.25rem 1.75rem',
              },
              margin: {
                xs: '1.5rem 1rem 1.5rem 2.25rem',
                md: '1.5rem 0 2rem',
              },
            }}>
            {content}
          </Card>
        ) : (
          <>
            <Box key={tab.code}>{content}</Box>
            <Divider sx={{ mb: { xs: 0, md: 2 } }} />
          </>
        );
      })}
    </>
  );
}
