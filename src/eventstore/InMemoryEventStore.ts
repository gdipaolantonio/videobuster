import EventStore from "./EventStore";
import Event from "../Event";

export default class InMemoryEventStore implements EventStore {

  events: Array<Event>;

  constructor() {
    this.events = [];
  }

  list(): Array<Event> {
    return this.events;
  }

  append(event: Event) {
    this.events.push(event);
  }
}