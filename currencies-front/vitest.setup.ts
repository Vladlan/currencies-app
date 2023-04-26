import '@testing-library/jest-dom/extend-expect'
import 'vitest-canvas-mock'
window.URL.createObjectURL = function() { return null; };
