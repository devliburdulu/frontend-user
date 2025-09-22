import { RegisterMitraView } from "src/sections/auth";
import { RegisterMitraMainView } from "src/sections/auth";
import { RegisterMitraStepperView } from "src/sections/auth";

export const metadata = {
  title: "Register Mitra",
};

export default function RegisterMitraPage() {
  return (
    <div>
      {/* <RegisterMitraView /> */}
      {/* <RegisterMitraMainView /> */}
      <RegisterMitraStepperView />
    </div>
  );
}
