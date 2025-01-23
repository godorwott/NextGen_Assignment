import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => {
  const { children } = props;

  return (
    <div className="app">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
