import Konva from "konva";
import { ShapeConfig } from "konva/lib/Shape";
import React from "react";
import { KonvaNodeEvents } from "react-konva";
import InteractiveKonvaElement from "./InteractiveKonvaElement";

interface Props {
  id: string;
  component: React.ComponentType<ShapeConfig & KonvaNodeEvents>;
  props: Konva.ShapeConfig;
}

function GenericRenderer({ id, component: Component, props }: Props) {
  console.log("generic render:", id);
  return (
    <InteractiveKonvaElement id={id}>
      {(additionalProps) => <Component {...props} {...additionalProps} />}
    </InteractiveKonvaElement>
  );
}

export default GenericRenderer;
