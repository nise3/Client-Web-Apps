import moment from 'moment';
import {APP_TITLE} from '../common/constants';
import {Layout} from 'antd';

const {Footer: AntFooter} = Layout;

const Footer = () => {
  return (
    <AntFooter style={{background: 'white'}}>
      &copy; {moment().format('YYYY')} {APP_TITLE}
    </AntFooter>
  );
};

export default Footer;
