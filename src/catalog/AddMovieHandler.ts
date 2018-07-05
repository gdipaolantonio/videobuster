import CommandHandler from "../CommandHandler";
import AddMovieCommand from "./AddMovieCommand";
import EventStore from "../eventstore/EventStore";
import MovieAddedEvent from "./MovieAddedEvent";
import Event from "../Event";
import MovieAlreadyPresentException from "./MovieAlreadyPresentException";
import MovieRemovedEvent from "./MovieRemovedEvent";
import Movie from "./Movie";

export default class AddMovieHandler implements CommandHandler {

  private readonly eventStore: EventStore;
  private readonly movies: any

  constructor(eventStore: EventStore) {
    this.eventStore = eventStore;
    this.movies = {};
  }

  handle(command: AddMovieCommand) {
    const events : Array<Event> = this.eventStore.list();

    events
      .forEach(event => {
        if (event instanceof MovieAddedEvent) {
          this.movies[event.title] = new Movie(event.title);
        }

        if (event instanceof MovieRemovedEvent) {
          if (this.movies[event.title]) {
            delete this.movies[event.title];
          }
        }
      });

    if (this.movies.hasOwnProperty(command.title)) {
      throw new MovieAlreadyPresentException(command.title);
    }

    this.movies[command.title] = new Movie(command.title);
    this.eventStore.append(new MovieAddedEvent(command.title));
  }
}
