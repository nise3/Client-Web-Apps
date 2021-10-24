import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {API_NOTICE_BOARD} from '../../@softbd/common/apiRoutes';

export function useFetchNoticeBoard() {
  return useAxiosSWR(API_NOTICE_BOARD);
}
