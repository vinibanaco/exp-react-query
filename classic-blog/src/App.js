import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import ListPostsPage from './post/pages/list';
import PostDetailsPage from './post/pages/details';

function App() {
  return (
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
  );
}

export default App;
