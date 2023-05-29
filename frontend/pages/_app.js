import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import AdminPage from "./admin";
import { Container, Row, SSRProvider } from "react-bootstrap";
import Home from ".";
import LeftMenuPage from "../components/admin/LeftMenu";
import Header from "../components/layout/Header";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.2/css/swiper.css"
></link>;
import homeLayout from "../components/homeLayout";
import CommonHead from "../components/common-components/UserHead/CommonHead";
import UserLayout from "../components/userLayout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let role = "user";

  switch (router.pathname) {
    case "/login":
      return (
        <Provider store={store}>
          <SSRProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </SSRProvider>
        </Provider>
      );
    case "/signup":
      return (
        <Provider store={store}>
          <SSRProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </SSRProvider>
        </Provider>
      );
    case "/admin/login":
      return (
        <Provider store={store}>
          <SSRProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </SSRProvider>
        </Provider>
      );
    case "/admin/login":
      return (
        <Provider store={store}>
          <SSRProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </SSRProvider>
        </Provider>
      );
    case '/forget': return (
      <Provider store={store}>
        <SSRProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </SSRProvider>
      </Provider>
    )

    default:
      if (role == "admin") {
        return (
          // <Provider store={store}>
          //   <SSRProvider>
          //     <Home>
          //       <Component {...pageProps} />
          //       <ToastContainer />
          //     </Home>
          //   </SSRProvider>
          //   ;
          // </Provider>

          <Provider store={store}>
            <SSRProvider>
              <div className="main_body_bg">
                <Container>
                  <Row>
                    <div className="col-lg-1 col-md-2 col-0 mobile_leftmenu">
                      <LeftMenuPage />
                    </div>
                    <div className="col-lg-11 col-md-10 col-12">
                      <Row>
                        <div className="header_padding header_bg">
                          <Header />
                        </div>
                      </Row>

                      <Row>
                        <div className="header_padding">
                          <Component {...pageProps} />
                        </div>
                      </Row>
                    </div>
                  </Row>
                  <ToastContainer />
                </Container>
              </div>
            </SSRProvider>
          </Provider>
        );
      } else if (role == "user") {
        return (
          <Provider store={store}>
            <SSRProvider>
              {/* <Container> */}
              {/* <Row>
                  <CommonHead />
                </Row> */}
              <UserLayout>
                <Component {...pageProps} />
                <ToastContainer />
              </UserLayout>
              {/* </Container> */}
            </SSRProvider>
          </Provider>

          // <Provider store={store}>
          //   <SSRProvider>
          //     {/* <HomeLayout> */}
          //     <Home>
          //       <Component {...pageProps} />
          //       <ToastContainer />
          //       {/* </HomeLayout> */}
          //     </Home>
          //   </SSRProvider>
          // </Provider>
        );
      }
  }
}

export default MyApp;
