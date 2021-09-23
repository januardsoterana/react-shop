// useEventDispatch.js
import { useContext } from 'react';

import EventContext from './EventContext';

const useEventDispatch = () => {
  const [_subscribe, _unsubscribe, dispatch] = useContext(EventContext);
  return dispatch;
};

export default useEventDispatch