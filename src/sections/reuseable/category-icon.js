import { Avatar, Skeleton, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCategoryById } from 'src/fetch-global';

export default function CategoryIcon({ moveToProduct, item, is_active }) {
  const [data, setData] = useState();
  const [hasImage, setHasImage] = useState(false);
  const [attribute, setAttribute] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (item.id != 53) {
          const result = await getCategoryById(item.id);
          setData(result);
          setAttribute(result.custom_attributes);
          //
          setHasImage(icon());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [item.id]);

  const icon = () => {
    let exist = false;
    attribute.forEach((attr) => {
      if (attr.attribute_code === 'image' && attr.value) {
        exist = true;
      }
    });
    return exist;
  };

  return (
    <Card
      variant='outlined'
      sx={{
        backgroundColor: 'transparent',
        borderRadius: '8px',
        boxShadow: { xs: 0, sm: 2 },
        border: { xs: 0, sm: '1px solid #EBEBEB' },
      }}>
      {data && (
        <button
          onClick={() => moveToProduct(data.id, data.name)}
          className='w-full'
          disabled={!is_active}>
          <div className='flex flex-col lg:flex-row h-auto lg:h-auto items-center justify-center lg:justify-start space-x-0 lg:space-x-2 p-[2px] sm:p-0.5 md:p-2 lg:p-3.5'>
            <div className='flex-shrink-0'>
              <Avatar
                sx={{
                  height: { xs: 50, md: 45 },
                  width: { xs: 50, md: 45 },
                  bgcolor: 'rgba(29, 156, 171, 0.2)',
                }}>
                <div className='relative h-[50px] w-[50px] md:h-[45px] md:w-[45px]'>
                  {icon() ? (
                    attribute.map((attr) => {
                      if (attr.attribute_code === 'image' && attr.value) {
                        return (
                          <img
                            key={attr.value}
                            src={`${process.env.NEXT_PUBLIC_MAGENTO_API}/pub${attr.value}`}
                            className='absolute h-[50px] md:h-[45px] object-contain block'
                            alt='category'
                          />
                        );
                      }
                      return null;
                    })
                  ) : (
                    <img
                      src='iconhotel-convention.png'
                      className='absolute h-[60px] object-contain'
                      alt='default'
                    />
                  )}
                  {!is_active && (
                    <div className='absolute bg-liburdulu-white h-full w-full opacity-50'></div>
                  )}
                </div>
              </Avatar>
            </div>
            <span className='font-medium text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-gray-700 text-center lg:text-left text-wrap mt-1 lg:mt-0'>
              {data.name}
            </span>
          </div>
        </button>
      )}
    </Card>
  );
}
