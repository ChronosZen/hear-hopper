import { SvgXml } from "react-native-svg";

const SVG = ({ xml, width = "100%", height = "100%", fill = null }) => {
  let modifiedXml = xml;
  if (fill) {
    modifiedXml = xml.replace(/fill="(.*?)"/g, `fill="${fill}"`);
  }
  return <SvgXml xml={modifiedXml} width={width} height={height} />;
};

export default SVG;
