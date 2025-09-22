import ThankyouView from "src/sections/greetings/thankyou-view";

export const metadata = {
  title: "Thank you for registering",
};

export default function greetingPage() {
  return <ThankyouView title="Selamat anda berhasil mendaftar menjadi Mitra" desc="Harap menunggu konfirmasi dari tim kami untuk status pengajuan Anda!" />;
}
