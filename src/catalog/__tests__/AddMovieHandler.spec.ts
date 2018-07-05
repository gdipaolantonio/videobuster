import AddMovieHandler from "../AddMovieHandler";
import AddMovieCommand from "../AddMovieCommand";
import InMemoryEventStore from "../../eventstore/InMemoryEventStore";
import MovieAddedEvent from "../MovieAddedEvent";
import EventStore from "../../eventstore/EventStore";

/*
 * - Empty command and empty event
 * - No validation for command -> for example we cannot have duplicated movie titles
 */

describe('AddMovieHandler', () => {
  it('should append a MovieAdded event when Event Store is empty', () => {
    const eventStore = new InMemoryEventStore();
    const handler = new AddMovieHandler(eventStore);

    handler.handle(new AddMovieCommand("Star Wars"));

    expect(eventStore.list()).toContainEqual(new MovieAddedEvent("Star Wars"));
  });
});
