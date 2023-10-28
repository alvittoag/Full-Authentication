// ** Import Components
import Banner from "@/components/Banner";
import PrivateRoute from "@/components/PrivateRoute";

export default function Home() {
  return (
    <PrivateRoute>
      <Banner />
    </PrivateRoute>
  );
}
