import CommandHandler from "../CommandHandler";
import AddMovieCommand from "./AddMovieCommand";
import EventStore from "../eventstore/EventStore";
import MovieAddedEvent from "./MovieAddedEvent";

export default class AddMovieHandler implements CommandHandler {

  private readonly eventStore: EventStore;

  constructor(eventStore: EventStore) {
    this.eventStore = eventStore;
  }

  handle(command: AddMovieCommand) {
    this.eventStore.append(new MovieAddedEvent(command.title));
  }
}
