import ShopCard from "../reuseable/shop-card";

export default function MitraRecomprod() {
    return (
        <div className='drop-shadow my-4'>
            <span className="font-bold text-2xl">Rekomendasi Product</span><br />
            <span>Lorem ipsum dolor sit amet</span>
            <div className="grid md:grid-cols-4 grid-cols-2 sm:grid-cols-3 min-[450px]:grid-cols-2 gap-3">
                <ShopCard id={1} rating={4} location={'Bandung, Indonesia'} name={'Hotel Amarossa'} category={'Tour & Traveller'} price={'Rp 750.000'} discount={'Rp 750.000'}/>
            </div>
        </div>
    );
};
