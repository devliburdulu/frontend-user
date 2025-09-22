import { Card } from "@mui/material";
import Iconify from "src/components/iconify";

export default function MitraRating() {
    return (
        <Card className="p-3 flex flex-row justify-center h-full">
            <div className="flex flex-col place-items-center">
                <div className='flex items-center'>
                    <Iconify icon="line-md:star-filled" sx={{ fontSize: 13, color: '#ffaa00' }} /><span className="text-base font-semibold">5.0</span>
                </div>
                <div>
                    <span className="text-liburdulu-blue text-xs font-medium">Rating & Ulasan</span>
                </div>
            </div>
        </Card>
    );
};
