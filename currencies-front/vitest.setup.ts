  import 'vitest-canvas-mock'
  import "@testing-library/jest-dom/vitest";
  window.URL.createObjectURL = function() { return null; };
