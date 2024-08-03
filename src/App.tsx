import { Header } from "./components/header";
import { InputProductsSection } from "./components/inputProduct";
import { ListProducts } from "./components/listProducts";
import { Footer } from "./components/footer";

export const App = () => {
  return (
    <>
      <Header />
      <InputProductsSection />
      <ListProducts isDoneList={false} />
      <ListProducts isDoneList={true} />
      <Footer />
    </>
  );
};
