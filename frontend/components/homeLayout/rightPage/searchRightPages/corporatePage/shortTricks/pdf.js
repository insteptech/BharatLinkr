import { useDispatch } from "react-redux";
import { getCorporateData } from "../../../../../../redux/actions/corporate/addcorporate";
import { useEffect } from "react";
import { apibasePath } from "../../../../../../config";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";


export default function PdfComponent(props) {
  const { item } = props;
  const dispatch = useDispatch();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    dispatch(getCorporateData());
  }, []);

  return (
    <>
      {item?.pdf ? (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.js">
          <div
          // style={{
          //   height: "750px",
          //   width: "900px",
          //   marginLeft: "",
          //   marginRight: "auto",
          // }}
          >
            <Viewer
              fileUrl={`${apibasePath}documents/corporate/${item?.pdf}`}
              plugins={[defaultLayoutPluginInstance]}
            />
          </div>
        </Worker>
      ) : (
        "no pdf"
      )}
    </>
  );
}
