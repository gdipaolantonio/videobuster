import AddMovieHandler from "../AddMovieHandler";
import AddMovieCommand from "../AddMovieCommand";
import InMemoryEventStore from "../../eventstore/InMemoryEventStore";
import MovieAddedEvent from "../MovieAddedEvent";
import EventStore from "../../eventstore/EventStore";

describe('AddMovieHandler', () => {
  it('should append a MovieAdded event', () => {
    const eventStore = new InMemoryEventStore();
    const handler = new AddMovieHandler(eventStore);

    handler.handle(new AddMovieCommand());

    expect(eventStore.list()).toContainEqual(expect.any(MovieAddedEvent));
  });
});
