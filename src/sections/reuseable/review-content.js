import { Avatar, Rating, Typography } from "@mui/material";
import { useState } from "react";
import Iconify from "src/components/iconify/iconify";
import moment from "moment";
import { fDate } from "src/utils/format-time";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

export default function ReviewContent({
  img,
  rating,
  nama,
  tgl,
  comment,
  // data,
  // title,
}) {
  // const [value, setValue] = useState(rating);
  // let objectDate = moment(tgl).format('DD-MM-YYYY');
  //
  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex flex-row">
        <div className="flex w-auto">
          <Avatar sx={{ width: 70, height: 70 }} {...stringAvatar(img)} />
        </div>
        <div className="flex flex-col w-full mx-2 justify-center">
          <span className="text-xs md:text-sm font-semibold">{nama}</span>
          <span className="text-[11px] sm:text-xs font-medium text-[#637381]">
            {/* {objectDate} */}
            {fDate(tgl)}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-1">
        <div className="w-auto -mb-2">
          <Rating icon={<Iconify icon="line-md:star-filled" sx={{ fontSize: 13 }} />} emptyIcon={<Iconify icon="line-md:star-twotone" sx={{ fontSize: 13 }} />} name="read-only" value={rating} readOnly />
        </div>
        <Typography variant="body2" sx={{ color: "text.secondary" }} fontSize={13} marginTop={1}>
          {comment}
        </Typography>
      </div>
    </div>
  );
}
