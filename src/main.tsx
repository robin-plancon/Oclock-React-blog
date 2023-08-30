import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App/App';

import { CategoriesProvider } from './contexts/CategoriesContext';
import { ZenModeProvider } from './contexts/ZenModeContext';
import { PostsProvider } from './contexts/PostsContext';

import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // Context : utilisation
  <CategoriesProvider>
    <PostsProvider>
      <ZenModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ZenModeProvider>
    </PostsProvider>
  </CategoriesProvider>
);
