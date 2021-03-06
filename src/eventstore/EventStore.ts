import Event from "../Event";

export default interface EventStore {
  append(event: Event);
  list() : Array<Event>;
}