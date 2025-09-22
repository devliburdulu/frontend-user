import { EduDetailsView } from "src/sections/edu/view";

export const metadata = {
  title: "Pusat Edukasi : Details",
};

export default function EduDetails({ params }) {
  const { id } = params;

  return <EduDetailsView id={id} />;
}
