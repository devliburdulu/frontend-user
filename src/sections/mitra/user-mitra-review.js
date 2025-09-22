import { Card } from "@mui/material";
import ReviewContent from "../reuseable/review-content";
import { Container } from "@mui/system";
import { getSellerReview } from "src/fetch-global";
import { useEffect, useState } from "react";
import Iconify from "src/components/iconify";

export default function UserMitraReview({ id }) {
  const [page, setPage] = useState(1);
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getReview = async () => {
    try {
      const data = await getSellerReview(id, 10, page);
      setReview(data.items);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReview();
  }, [id]);

  return (
    <Card className="p-3">
      <Container>
        {isLoading && (
          <div className="grid grid-cols-1 h-[600px] place-content-center">
            <div className="place-self-center">
              <Iconify
                icon="line-md:loading-loop"
                sx={{ fontSize: 20, color: "#000000" }}
              />
            </div>
            <p className="place-self-center text-3xl font-semibold">
              Mohon Tunggu
            </p>
          </div>
        )}
        {!isLoading && review.length == 0 && (
          <div className="grid grid-cols-1 h-[600px] place-content-center">
            <span className="place-self-center text-3xl font-semibold">
              Maaf, Seller ini belum ada ulasan!
            </span>
            {/* <span className="place-self-center text-xs font-medium">Sorry, we couldn’t find the Reviews you’re looking for.</span>
                        <span className="place-self-center text-xs font-medium">Mungkin kamu salah ketik? Koreksi dan cek yang kamu ketik.</span> */}
          </div>
        )}
        {!isLoading && review.length != 0 && (
          <div className="divide-y divide-gray">
            {review.map((rev) => {
              const sum =
                (parseInt(rev.feed_price) / 20 +
                  parseInt(rev.feed_value) / 20 +
                  parseInt(rev.feed_quality) / 20) /
                3;
              return (
                <ReviewContent
                  img={rev.feed_nickname}
                  nama={rev.feed_nickname}
                  rating={sum}
                  tgl={rev.created_at}
                  comment={rev.feed_review}
                />
              );
            })}
            {/* <ReviewContent img={"icon-opentrip.png"} nama={"Jayvion Simon"} rating={4} tgl={"01 Jul 2024"} comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus."} />
                    <ReviewContent img={"icon-opentrip.png"} nama={"Jayvion Simon"} rating={4} tgl={"01 Jul 2024"} comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus."} />
                    <ReviewContent img={"icon-opentrip.png"} nama={"Jayvion Simon"} rating={4} tgl={"01 Jul 2024"} comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus."} />
                    <ReviewContent img={"icon-opentrip.png"} nama={"Jayvion Simon"} rating={4} tgl={"01 Jul 2024"} comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus."} />
                    <ReviewContent img={"icon-opentrip.png"} nama={"Jayvion Simon"} rating={4} tgl={"01 Jul 2024"} comment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus."} /> */}
          </div>
        )}
      </Container>
    </Card>
  );
}
