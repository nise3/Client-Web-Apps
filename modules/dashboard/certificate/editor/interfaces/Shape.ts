import Konva from 'konva';

export enum ShapeType {
  Rectangle = 'rectangle',
  Text = 'text',
  Image = 'image',
  Line = 'line',
  Input = 'input',
  RegulaPolygon = 'regularPolygon',
}

export type ImageFit = 'fill' | 'scale';

export interface ImageConfig extends Konva.ImageConfig {
  imageFit: ImageFit;
}

export type TextConfig = Konva.TextConfig & {};
