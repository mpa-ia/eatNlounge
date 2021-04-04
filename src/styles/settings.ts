export const variables = {
  color: {
    lightShades: '#F5F3F1',
    lightAccent: '#EA781E',
    mainBrand: '#8CBFBB',
    darkAccent: '#BC404B',
    darkShade: '#1F2227',
    success: '#5fb470',
    warning: '#dda438',
    danger: '#f44336',
    default: '#999999',
  },
};

export const themes = {
  light: {
    body: {
      background: variables.color.lightShades,
      color: variables.color.darkShade,
    },
  },
  dark: {
    body: {
      background: variables.color.darkShade,
      color: variables.color.lightShades,
    },
  },
};