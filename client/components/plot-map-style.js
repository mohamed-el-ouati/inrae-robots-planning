const FILL_COLOR = "#FFA27F";
const CLICKED_COLOR = "#FF0000";
const OUTLINE_COLOR = "#EE4E4E";

const OPACITY = 0.5;
const CLICKED_OPACITY = 1;

export const textLayerStyle = {
  id: "names",
  type: "symbol",
  layout: {
    "text-field": ["get", "name"],
    "text-size": 12,
    "text-offset": [0, 0.6],
    "text-anchor": "top",
    "text-justify": "center",
    "text-padding": 2,
  },
  paint: {
    "text-color": "#ffffff",
    "text-halo-color": "#000000",
    "text-halo-width": 1,
    "text-halo-blur": 1,
  },
};

export const layerOutlineStyle = {
  id: "outline",
  type: "line",
  layout: {},
  paint: {
    "line-color": OUTLINE_COLOR,
    "line-width": 1,
  },
};

export const layerStyle = (clickedFeatureId) => {
  return {
    id: "plot",
    type: "fill",
    layout: {},
    paint: {
      "fill-color": [
        "case",
        ["boolean", ["==", ["get", "id"], clickedFeatureId]],
        CLICKED_COLOR,
        FILL_COLOR,
      ],
      "fill-opacity": [
        "case",
        ["boolean", ["==", ["get", "id"], clickedFeatureId]],
        CLICKED_OPACITY,
        OPACITY,
      ],
    },
  };
};
