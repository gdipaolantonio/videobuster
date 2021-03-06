import AddMovieHandler from "../AddMovieHandler";
import AddMovieCommand from "../AddMovieCommand";
import InMemoryEventStore from "../../eventstore/InMemoryEventStore";
import MovieAddedEvent from "../MovieAddedEvent";
import EventStore from "../../eventstore/EventStore";
import MovieAlreadyPresentException from "../MovieAlreadyPresentException";
import MovieRemovedEvent from "../MovieRemovedEvent";
import MovieAddedEventV2 from "../MovieAddedEventV2";

/*
 * - Empty command and empty event
 * - No validation for command -> for example we cannot have duplicated movie titles
 */

describe('AddMovieHandler', () => {
  it('should append a MovieAdded event when Event Store is empty', () => {
    const eventStore = new InMemoryEventStore();
    const handler = new AddMovieHandler(eventStore);

    handler.handle(new AddMovieCommand("Star Wars"));

    expect(eventStore.list()).toContainEqual(new MovieAddedEventV2("Star Wars", 0));
  });

  it('should discard command if movie already present', () => {
    const eventStore = new InMemoryEventStore();
    eventStore.append(new MovieAddedEvent("Star Wars"));

    const handler = new AddMovieHandler(eventStore);

    expect(() => { handler.handle(new AddMovieCommand("Star Wars")) }).toThrow(MovieAlreadyPresentException);

    expect(eventStore.list().length).toBe(1);
  });

  it('should allow the insert of a movie with the same title after its removal', () => {
    const eventStore = new InMemoryEventStore();
    eventStore.append(new MovieAddedEvent("Star Wars"));
    eventStore.append(new MovieRemovedEvent("Star Wars"));

    const handler = new AddMovieHandler(eventStore);

    handler.handle(new AddMovieCommand("Star Wars"));

    expect(eventStore.list().length).toBe(3);
  });

  it('should allow the insert of a movie with availability', () => {
    const command = new AddMovieCommand("Star Wars", 2);
    const eventStore = new InMemoryEventStore();

    const handler = new AddMovieHandler(eventStore);

    handler.handle(command);

    expect(eventStore.list()).toContainEqual(
      new MovieAddedEventV2("Star Wars", 2)
    );
  });
});
