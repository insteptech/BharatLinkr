<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.2/css/swiper.css"
></link>;
import { SSRProvider } from "react-bootstrap";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "../components/Layout/Wrapper";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SSRProvider>
        <Wrapper>
          <Component {...pageProps} />
          <ToastContainer  autoClose={1000}/>
        </Wrapper>
      </SSRProvider>
    </Provider>
  )

}

export default MyApp;
