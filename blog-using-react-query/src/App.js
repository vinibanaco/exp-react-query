import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import ListPostsPage from './post/pages/list';
import PostDetailsPage from './post/pages/details';

const queryCache = new QueryCache();

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/posts" />
          <Route exact path="/posts">
            <ListPostsPage />
          </Route>
          <Route exact path="/posts/:id">
            <PostDetailsPage />
          </Route>
        </Switch>
      </Router>

      <ReactQueryDevtools />
    </ReactQueryCacheProvider>
  );
}

export default App;
