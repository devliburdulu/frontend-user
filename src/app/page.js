import { HomepageView } from 'src/sections/homepage/view';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Liburdulu.id - Teman Terbaik Liburanmu',
};

export default function HomePage() {
  return (
    <div className='mt-16 md:mt-20'>
      <HomepageView />
    </div>
  );
}
