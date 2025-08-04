import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { lazyLoad } from 'utility/lazyLoad';

// Lazy load pages
const MainMenu = lazyLoad(() => import('pages/MainMenu/MainMenu'), <p>Loading...</p>);
const PVP = lazyLoad(() => import('pages/PVP/PVP'), <p>Loading...</p>);
const PVAI = lazyLoad(() => import('pages/PVAI/PVAI'), <p>Loading...</p>);
const CreateGame = lazyLoad(() => import('pages/CreateGame/CreateGame'), <p>Loading...</p>);

const Multiplayer = lazyLoad(() => import('pages/Multiplayer/Multiplayer'), <p>Loading...</p>);


const NotFound = lazyLoad(() => import('pages/NotFound/NotFound'), <p>Loading...</p>);


export default function Routing() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game" element={<PVP />} />
          <Route path="/game/ai" element={<PVAI />} />
          <Route path="/game/create" element={<CreateGame />} />
          <Route path="/game/:gameId" element={<Multiplayer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
