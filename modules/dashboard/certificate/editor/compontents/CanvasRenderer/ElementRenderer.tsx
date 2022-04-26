import React from "react";
import { Line, Rect, RegularPolygon } from "react-konva";
import { useRecoilValue } from "recoil";
import { ShapeType, TextConfig } from "../../interfaces/Shape";
import { elementSelector } from "../../state/selectors/elements";
import GenericRenderer from "./GenericRenderer";
import TextRenderer from "./TextRenderer";

interface Props {
  id: string;
}

function ElementRenderer({ id }: Props) {
  const element = useRecoilValue(elementSelector(id));
  if (!element) {
    return null;
  }
  console.log(element);
  const { props, type } = element;

  switch (type) {
    case ShapeType.Text:
      return <TextRenderer id={id} key={id} props={props as TextConfig} />;

    case ShapeType.Rectangle:
      return (
        <GenericRenderer id={id} key={id} props={props} component={Rect} />
      );
    case ShapeType.Line:
      return (
        <GenericRenderer id={id} key={id} props={props} component={Line} />
      );
    // case ShapeType.RegulaPolygon:
    //   return (
    //     <GenericRenderer
    //       id={id}
    //       key={id}
    //       props={props}
    //       component={RegularPolygon}
    //     />
    // );

    default:
      throw new Error(`Unsupported element ${type}`);
  }
}

export default ElementRenderer;
