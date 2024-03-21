import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './Layout';
import HomePage from './pages/HomePage';
import JoinServer from './pages/JoinServer.tsx';
import SurvivalProgress from './pages/SurvivalProgress.tsx';
import MemberPage from './pages/Members';
import OpenSourcePage from './pages/OpenSource.tsx';
import Partner from './pages/Partner.tsx';
import ArchitectureCollection from './pages/ArchitectureCollection.tsx';
import RedstoneCollection from './pages/RedstoneCollection.tsx';
import NotFoundPage from './pages/NotFoundPage';

import initI18n from './i18n/i18nConfig';
import 'antd/dist/reset.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

initI18n();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="join" element={<JoinServer />} />
          <Route path="survival" element={<SurvivalProgress />} />
          <Route path="member" element={<MemberPage />} />
          <Route path="openSource" element={<OpenSourcePage />} />
          <Route path="collaborative" element={<Partner />} />
          <Route path="partner" element={<Partner />} />
          <Route path="redstoneCollection" element={<RedstoneCollection />} />
          <Route
            path="architectureCollection"
            element={<ArchitectureCollection />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
