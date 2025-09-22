import { Card, Skeleton, Typography, Grid } from "@mui/material";
import { useResponsive } from "src/hooks/use-responsive";
// Individual Card Skeleton Component
export function ShopCardSkeleton() {
  return (
    <div className="relative drop-shadow">
      <Card
        className="p-2 rounded-[20px]"
        sx={{
          height: { xs: 375, md: 400 },
          minHeight: 320,
        }}
      >
        {/* Product Image Skeleton */}
        <Card
          className="rounded-[10px] relative"
          sx={{
            aspectRatio: "1 / 1",
            width: "100%",
            maxHeight: "50%",
          }}
        >
          <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
        </Card>

        {/* Product Details Skeleton */}
        <div className="flex flex-col justify-between h-2/4 pt-2">
          <div className="grid grid-flow-row p-1">
            {/* Location */}
            <div className="flex justify-between gap-4">
              <div className="text-liburdulu-blue flex items-center">
                <Skeleton variant="circular" width={25} height={21} animation="wave" />
                <Skeleton variant="text" width={80} height={20} animation="wave" sx={{ ml: 1 }} />
              </div>
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={19}
                    height={19}
                    animation="wave"
                    sx={{
                      mx: 0.5,
                      borderRadius: 1,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Product Name */}
            <div className="px-1">
              <Skeleton variant="text" width="100%" height={50} animation="wave" />
            </div>

            {/* Rating */}
            <div className="flex items-center">
              <Skeleton variant="text" width={60} height={24} animation="wave" />
            </div>
          </div>

          {/* Prices */}
          <div className="grid grid-flow-row p-1 justify-items-start">
            <Skeleton variant="text" width={100} height={30} animation="wave" />
          </div>
        </div>
      </Card>
    </div>
  );
}

// Grid Container Component with 4 Skeletons and Loading Message
export function ShopCardSkeletonGrid() {
  const isDekstop = useResponsive("up", "md");
  return (
    <div className="relative w-full">
      {/* Skeleton Cards Grid */}

      {isDekstop ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {[...Array(4)].map((_, index) => (
            <ShopCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <Grid item xs={12}>
          <div className="w-full text-center mt-4 mb-8">
            <Typography variant="body2" className="text-liburdulu-blue font-medium">
              Halo Liburians mohon ditunggu ya kami sedang mencari kamar terbaik untuk kamu
              <div className="flex items-center pl-10 justify-center mt-3">
                <div className="flex items-center">
                  <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>

                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-blue-600 rounded-full animate-pulse"></span>
                    <span className="h-2 w-2 bg-blue-600 rounded-full animate-pulse"></span>
                    <span className="h-2 w-2 bg-blue-600 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>
            </Typography>
          </div>
        </Grid>
      )}

      {/* Overlay with Loading Message */}
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white bg-opacity-90 px-6 py-4 rounded-lg shadow-md text-center">
          <Typography variant="h6" className="text-liburdulu-blue font-medium">
            Halo Liburians mohon ditunggu ya kami sedang mencari kamar terbaik untuk kamu
          </Typography>
        </div>
      </div> */}
      {/* <Grid item xs={12}>
        <div className="w-full text-center mt-14 mb-8">
          <Typography variant="h6" className="text-liburdulu-blue font-medium">
            Halo Liburians mohon ditunggu ya kami sedang mencari kamar terbaik untuk kamu
          </Typography>
        </div>
      </Grid> */}
    </div>
  );
}
