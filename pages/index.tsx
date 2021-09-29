//import AppPage from '../@crema/hoc/DefaultPage';
import asyncComponent from '../@crema/utility/asyncComponent';
import FrontPage from '../@crema/hoc/FrontPage';

const Home = asyncComponent(() => import('../modules/home'));

export default FrontPage(() => {
  return <Home />;
});
