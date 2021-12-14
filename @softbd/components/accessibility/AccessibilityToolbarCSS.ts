const AccessibilityToolbarCSS = `

html.monochrome {
  filter: grayscale(100%) contrast(120%);
}
html.inverted {
  filter: invert(75%) contrast(120%);
}
html.inverted.monochrome {
  filter: grayscale(100%) invert(75%) contrast(120%);
}
html.bigCursor, html.bigcursor * {
  cursor: url('/images/cursor.svg'), auto !important 
}
html.highlightLinks a {
  background-color: #cde400 !important;
  color: black !important; 
}
html.highlightHeadings h1,
html.highlightHeadings h2,
html.highlightHeadings h3,
html.highlightHeadings h4,
html.highlightHeadings h5,
html.highlightHeadings h6
{
  background-color: #cde400 !important;
  color: black !important;
}
html.guide #readingGuide {
  background-color: #cde400;
  display: block !important;
}

`;

export default AccessibilityToolbarCSS;
