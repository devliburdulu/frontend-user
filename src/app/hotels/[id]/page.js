import { HotelDetailsView } from 'src/sections/hotels/view';

export const metadata = {
  title: 'Hotel : Details',
};

export default function EduDetails({ params }) {
  const { id } = params;

  return <HotelDetailsView id={id} />;
}
