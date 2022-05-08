import Konva from 'konva';
import {Filter} from 'konva/lib/Node';
import {uniq} from 'ramda';
import {EditorPanel} from './interfaces/Editor';
import {ShapeType} from './interfaces/Shape';

export const CANVAS_STROKE = 1;
export const EDITOR_MARGIN = 8 + CANVAS_STROKE;

export const IMAGE_FILTERS: {[filter: string]: Filter} = {
  blur: Konva.Filters.Blur,
};

export const SHAPE_PROPERTIES_PANEL: Partial<{
  [key in ShapeType]: EditorPanel;
}> = {
  [ShapeType.Image]: EditorPanel.ImageProperties,
  [ShapeType.Text]: EditorPanel.TextProperties,
  [ShapeType.Rectangle]: EditorPanel.RectangleProperties,
  [ShapeType.Line]: EditorPanel.LineProperties,
  [ShapeType.Input]: EditorPanel.InputProperties,
};

export const SHAPE_TOOL_PANEL: Partial<{[key in ShapeType]: EditorPanel}> = {
  [ShapeType.Image]: EditorPanel.Image,
  [ShapeType.Text]: EditorPanel.Text,
  [ShapeType.Rectangle]: EditorPanel.Elements,
  [ShapeType.Line]: EditorPanel.Elements,
  [ShapeType.Input]: EditorPanel.Input,
};

export enum DefaultFonts {
  Headline = 'Archivo Black',
  Regular = 'Arial',
  Cursive = 'cursive',
}

// export const ALL_FONTS = [
//   "Abril Fatface",
//   "Alfa Slab One",
//   "Anton",
//   "Archivo Black",
//   "Arial",
//   "Arial Black",
//   "Arimo",
//   "Bad Script",
//   "Bangers",
//   "Cinzel",
//   "Courier",
//   "Georgia",
//   "Iceberg",
//   "Lobster",
//   "Open Sans",
//   "Oleo Script",
//   "Oswald",
//   "Pacifico",
//   "Permanent Marker",
//   "Playfair Display",
//   "Rakkas",
//   "Roboto",
//   "Rubik",
//   "Shrikhand",
//   "Squada One",
//   "Times",
//   "Titan One",
//   "Work Sans",
//   "ZCOOL KuaiLe",
//   "Zilla Slab Highlight",
// ].sort();

// export const PROPRIETARY_FONTS = [
//   "Courier",
//   "Arial",
//   "Arial Black",
//   "Georgia",
//   "Times",
// ];

// export const LOADABLE_FONTS = ALL_FONTS.filter(
//   (font) => !PROPRIETARY_FONTS.includes(font)
// );

// export const PRELOAD_FONTS = uniq([
//   ...Object.values(DefaultFonts).filter((font) =>
//     LOADABLE_FONTS.includes(font)
//   ),
//   ...LOADABLE_FONTS.slice(0, 8),
// ]);
