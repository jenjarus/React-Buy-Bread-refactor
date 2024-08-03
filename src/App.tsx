import { Header } from "./components/header";
import { ListProducts } from "./components/listProducts";
import { Footer } from "./components/footer";

export const App = () => {
  return (
    <>
      <Header />
      <ListProducts isDoneList={false} />
      <ListProducts isDoneList={true} />
      <Footer />
    </>
  );
};
