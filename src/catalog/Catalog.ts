import Event from "../Event";
import MovieAddedEvent from "./MovieAddedEvent";
import MovieRemovedEvent from "./MovieRemovedEvent";
import Movie from "./Movie";
import AddMovieCommand from "./AddMovieCommand";
import MovieAlreadyPresentException from "./MovieAlreadyPresentException";
import MovieAddedEventV2 from "./MovieAddedEventV2";

export default class Catalog {

  private readonly movies : any;

  public static from(events : Array<Event>) : Catalog {
    let catalog = new Catalog({});

    events
      .forEach(event => {
        catalog = catalog.apply(event);
      });

    return catalog;
  }

  private constructor(movies : any) {
    this.movies = movies;
  }

  public apply(event : Event) : Catalog {

    let movies = {...this.movies};  // Spread operator

    if (event instanceof MovieAddedEvent) {
      movies[event.title] = new Movie(event.title);
    }

    if (event instanceof MovieRemovedEvent) {
      if (movies[event.title]) {
        delete movies[event.title];
      }
    }

    return new Catalog(movies);
  }

  public process(command : AddMovieCommand) : Event {
    if (this.movies.hasOwnProperty(command.title)) {
      throw new MovieAlreadyPresentException(command.title);
    }

    if (command.availability === 0) {
      return new MovieAddedEvent(command.title);
    }

    return new MovieAddedEventV2(command.title, command.availability);
  }
}
