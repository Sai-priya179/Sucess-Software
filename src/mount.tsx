import React from 'react';
import { createRoot } from 'react-dom/client';
import { SSAVideoExperience } from './components/the-signal/SSAVideoExperience';
import './index.css';

const rootEl = document.getElementById('youtube-showcase-root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <SSAVideoExperience />
    </React.StrictMode>
  );
}
