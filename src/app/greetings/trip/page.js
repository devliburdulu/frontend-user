// import ThankyouView from "src/sections/greetings/thankyou-view";
import ThankyouTripView from "src/sections/greetings/trip/thankyou-trip-view";

export const metadata = {
  title: "Thank you for requesting a trip",
};

export default function greetingPage() {
  return <ThankyouTripView />;
}
