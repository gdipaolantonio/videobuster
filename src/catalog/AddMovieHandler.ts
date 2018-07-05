import CommandHandler from "../CommandHandler";
import AddMovieCommand from "./AddMovieCommand";
import EventStore from "../eventstore/EventStore";
import MovieAddedEvent from "./MovieAddedEvent";
import Event from "../Event";
import MovieAlreadyPresentException from "./MovieAlreadyPresentException";

export default class AddMovieHandler implements CommandHandler {

  private readonly eventStore: EventStore;

  constructor(eventStore: EventStore) {
    this.eventStore = eventStore;
  }

  handle(command: AddMovieCommand) {
    const events : Array<Event> = this.eventStore.list();

    events
      .filter(event => {
        return event instanceof MovieAddedEvent;
      })
      .forEach(event => {
        if ((<MovieAddedEvent>event).title === command.title) {
          throw new MovieAlreadyPresentException(command.title);
        }
      });

    this.eventStore.append(new MovieAddedEvent(command.title));
  }
}
