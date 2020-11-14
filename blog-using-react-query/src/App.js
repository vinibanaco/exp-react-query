import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';

import ListPostsPage from './post/pages/list';
import PostDetailsPage from './post/pages/details';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
