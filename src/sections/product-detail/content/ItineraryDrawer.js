import { Drawer, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function ItineraryDrawer({
  open,
  onClose,
  itineraryData,
  decodeHtml,
}) {
  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          p: '1.25rem 1rem',
        },
      }}>
      <Box sx={{ position: 'relative', p: 0 }}>
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 0,
            top: -8,
            color: '#333',
          }}>
          <CloseIcon />
        </IconButton>
        <Typography
          variant='h6'
          sx={{ mb: 2, textAlign: 'left', color: '#1D9CAB' }}>
          Itinerary
        </Typography>
        <Box sx={{ maxHeight: '70vh' }}>
          {itineraryData.sections.map((section, sectionIndex) => (
            <Box key={sectionIndex} sx={{ mb: 0 }}>
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
                {decodeHtml(section.title)}
              </Typography>
              <Timeline sx={{ p: '0.5rem 0', m: 0 }}>
                {section.items.map((item, index) => (
                  <TimelineItem
                    key={index}
                    sx={{
                      '&:before': { display: 'none' },
                      minHeight: 65,
                      ...(index === section.items.length - 1
                        ? { minHeight: 55 }
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
                      {index < section.items.length - 1 && (
                        <TimelineConnector sx={{ bgcolor: '#1D9CAB' }} />
                      )}
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: 0, px: { xs: 1, md: 1.25 } }}>
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
          ))}
        </Box>
      </Box>
    </Drawer>
  );
}
