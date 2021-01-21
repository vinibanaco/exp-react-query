import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import ListPostsPage from './post/pages/list';
import PostDetailsPage from './post/pages/details';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
