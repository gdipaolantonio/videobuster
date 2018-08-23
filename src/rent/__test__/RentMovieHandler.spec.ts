import RentMovieHandler from "../RentMovieHandler";
import RentMovieCommand from "../RentMovieCommand";
import InMemoryEventStore from "../../eventstore/InMemoryEventStore";
import MovieAddedEvent from "../../catalog/MovieAddedEvent";
import MovieNotFoundException from "../MovieNotFoundException";
import MovieAddedEventV2 from "../../catalog/MovieAddedEventV2";
import MovieRentedEvent from "../MovieRentedEvent";

describe('RentMovieHandler', () => {
  let handler: RentMovieHandler;

  beforeEach(() => {
    handler = new RentMovieHandler();
  });

  it('should throw a MovieNotFoundException if the movie does not exist', () => {
    const eventStore = new InMemoryEventStore();

    expect(() => { handler.handle(new RentMovieCommand("Star Wars")); }).toThrow(MovieNotFoundException);

    expect(eventStore.list().length).toBe(0);
  });

  it('should emit a MovieRentedEvent if the movie exists and has enough availability', () => {
    const eventStore = new InMemoryEventStore();
    eventStore.append(new MovieAddedEventV2("Star Wars", 10))

    handler.handle(new RentMovieCommand("Star Wars"));

    expect(eventStore.list().length).toBe(1);
    expect(eventStore.list()).toContainEqual(new MovieRentedEvent("Star Wars"));
  });
});
