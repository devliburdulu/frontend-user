export default function ProductName({ data }) {
  return (
    <div className='pt-0 lg:pt-4 px-1 pb-1 '>
      <div className='flex items-center gap-2 mb-1'>
        <p className='text-[24px] font-semibold'>{data.name}</p>
      </div>
    </div>
  );
}
