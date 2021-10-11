//import AppPage from '../@crema/hoc/DefaultPage';
import asyncComponent from '../@crema/utility/asyncComponent';
import NiseFrontPage from '../@softbd/layouts/hoc/NiseFrontPage';

const Home = asyncComponent(() => import('../modules/home'));

export default NiseFrontPage(() => {
  return <Home />;
});
