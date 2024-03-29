import { SvgXml } from "react-native-svg";

const SVG = ({ xml, width = "100%", height = "auto", fill = null, stroke = null }) => {
  let modifiedXml = xml;
  if (fill) {
    modifiedXml = xml.replace(/fill="(.*?)"/g, `fill="${fill}"`);
  }
    // fill と stroke の両方が指定されている場合
    if (fill && stroke) {
      modifiedXml = modifiedXml.replace(/(fill|stroke)="(.*?)"/g, (match, p1, p2) => {
        if (p1 === "fill") {
          return `fill="${fill}"`;
        } else if (p1 === "stroke") {
          return `stroke="${stroke}"`;
        } else {
          return match;
        }
      });
    }
    // fill のみが指定されている場合
    else if (fill) {
      modifiedXml = modifiedXml.replace(/fill="(.*?)"/g, `fill="${fill}"`);
    }
    // stroke のみが指定されている場合
    else if (stroke) {
      modifiedXml = modifiedXml.replace(/stroke="(.*?)"/g, `stroke="${stroke}"`);
    }
  return <SvgXml xml={modifiedXml} width={width} height={height} />;
};

export default SVG;
