import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Layout.css";
import Main from "./Main/Main";
import Navbar from "./Navbar/Navbar";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <Header />
                <Navbar />
                <Main />
            <Footer />
        </div>
    );
}

export default Layout;
