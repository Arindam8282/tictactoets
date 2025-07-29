import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyLoad } from 'utility/lazyLoad';

// Lazy load pages
const MainMenu = lazyLoad(() => import('pages/MainMenu/MainMenu'), <p>Loading...</p>);
const PVP = lazyLoad(() => import('pages/PVP/PVP'), <p>Loading...</p>);
const PVAI= lazyLoad(() => import('pages/PVAI/PVAI'), <p>Loading...</p>);

const NotFound = lazyLoad(() => import('pages/NotFound/NotFound'), <p>Loading...</p>);


export default function Routing() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game" element={<PVP />} />
          <Route path="/game/ai" element={<PVAI />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
          <Route path="/game" element={<Game />} /> */}
          {/* Catch-all unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
