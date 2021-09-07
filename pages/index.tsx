//import AppPage from '../@crema/hoc/DefaultPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const Home = asyncComponent(() => import('../modules/home'));
//export default Home(() => <Home />);

const HomePage = () => {
  return <Home />;
};

export default HomePage;
