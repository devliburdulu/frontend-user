import {
  Avatar,
  Card,
  Tab,
  Tabs,
  tabsClasses,
  Typography,
} from '@mui/material';
import Iconify from 'src/components/iconify';

function stringToColor(string) {
  let hash = 0;
  let i;

  //
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  //
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}

export default function MitraBanner({ seller }) {
  const shopTitle =
    typeof seller?.shop_title === 'string' ? seller?.shop_title : '';

  return (
    <div className=''>
      <div className='h-fit w-full'>
        <Card className='h-fit divide-y divide-gray'>
          <div className='h-full'>
            <div className='md:h-[150px] h-auto p-6 flex md:flex-row flex-col gap-3 md:gap-4'>
              {seller?.logo_pic === null ? (
                <Avatar
                  sx={{
                    height: 100,
                    width: 100,
                    bgcolor: 'rgba(29, 156, 171, 1)',
                  }}
                  className='shadow'
                  // {...stringAvatar(seller?.shop_title)}
                >
                  {shopTitle.charAt(0).toUpperCase()}
                </Avatar>
              ) : (
                <Avatar
                  sx={{
                    height: 100,
                    width: 100,
                    // bgcolor: "rgba(29, 156, 171, 1)",
                  }}
                  className='shadow'
                  // {...stringAvatar(seller.shop_title)}
                  src={`${process.env.NEXT_PUBLIC_MAGENTO_API}/media/${seller.logo_pic}`}></Avatar>
              )}
              <div className='flex flex-col gap-2 md:w-[75%]'>
                <div className='flex md:flex-row flex-col md:gap-0 gap-2'>
                  <span className='text-xl font-semibold me-2'>
                    {seller?.shop_title != null
                      ? seller?.shop_title
                      : seller?.shop_url}
                  </span>
                </div>
                <div>
                  <Typography
                    variant='body1'
                    className='line-clamp-3'
                    component='div'
                    sx={{ color: 'text.secondary' }}
                    fontSize={13}
                    dangerouslySetInnerHTML={{
                      __html:
                        seller?.company_description != null
                          ? seller?.company_description
                          : '',
                    }}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-2 md:px-2 '>
                {(seller?.youtube_id ||
                  seller?.facebook_id ||
                  seller?.twitter_id ||
                  seller?.tiktok_id ||
                  seller?.instagram_id) && (
                  <span className='text-xs font-semibold'>Social Media</span>
                )}
                <div className='flex gap-2'>
                  {seller?.youtube_id != null && (
                    <a
                      href={`https://www.youtube.com/${seller?.youtube_id}`}
                      className=''
                      target='_blank'>
                      <Iconify
                        icon='line-md:youtube'
                        sx={{ fontSize: 20, color: '#1D9CAB' }}
                      />
                    </a>
                  )}
                  {seller?.facebook_id != null && (
                    <a
                      href={`https://www.facebook.com/${seller?.facebook_id}`}
                      className=''
                      target='_blank'>
                      <Iconify
                        icon='line-md:facebook'
                        sx={{ fontSize: 20, color: '#1D9CAB' }}
                      />
                    </a>
                  )}
                  {seller?.twitter_id != null && (
                    <a
                      href={`https://x.com/${seller?.twitter_id}`}
                      className=''
                      target='_blank'>
                      <Iconify
                        icon='line-md:twitter-x'
                        sx={{ fontSize: 20, color: '#1D9CAB' }}
                      />
                    </a>
                  )}
                  {seller?.instagram_id != null && (
                    <a
                      href={`https://www.instagram.com/${seller?.instagram_id}`}
                      className=''
                      target='_blank'>
                      <Iconify
                        icon='line-md:instagram'
                        sx={{ fontSize: 20, color: '#1D9CAB' }}
                      />
                    </a>
                  )}
                  {seller?.tiktok_id != null && (
                    <a
                      href={`https://www.tiktok.com/@${seller?.tiktok_id}`}
                      className=''
                      target='_blank'>
                      <Iconify
                        icon='line-md:tiktok'
                        sx={{ fontSize: 20, color: '#1D9CAB' }}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              bgcolor: 'background.paper',
              [`& .${tabsClasses.flexContainer}`]: {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'start',
                },
              },
              paddingX: 1,
            }}
            className='ps-2'>
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </Tabs> */}
        </Card>
      </div>
    </div>
  );
}
