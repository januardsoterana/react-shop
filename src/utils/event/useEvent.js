// useEvent.js
import { useEffect, useContext } from 'react';

import EventContext from './EventContext';

const useEvent = (event, callback) => {
  const [subscribe, unsubscribe, _dispatch] = useContext(EventContext);

  useEffect(() => {
    subscribe(event, callback);

    return () => unsubscribe(event, callback);
  }, [subscribe, unsubscribe, event, callback]);
};

export default useEvent