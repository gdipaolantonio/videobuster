import CommandHandler from "../CommandHandler";
import AddMovieCommand from "./AddMovieCommand";
import EventStore from "../eventstore/EventStore";
import MovieAddedEvent from "./MovieAddedEvent";
import Event from "../Event";
import MovieAlreadyPresentException from "./MovieAlreadyPresentException";
import MovieRemovedEvent from "./MovieRemovedEvent";
import Movie from "./Movie";
import Catalog from "./Catalog";

export default class AddMovieHandler implements CommandHandler {

  private readonly eventStore: EventStore;
  private readonly movies: any

  constructor(eventStore: EventStore) {
    this.eventStore = eventStore;
    this.movies = {};
  }

  handle(command: AddMovieCommand) {
    const events : Array<Event> = this.eventStore.list();

    const event = Catalog.from(events).process(command);

    this.eventStore.append(event);
  }
}
