// EventContext.js
import { createContext } from 'react';

const EventContext = createContext([
  (_event, _cb) => {}, // subscribe
  (_event, _cb) => {}, // unsubscribe
  (_event, _payload) => {}, // dispatch
]);

export default EventContext