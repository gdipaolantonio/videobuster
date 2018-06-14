import AddMovieHandler from "../AddMovieHandler";

describe('AddMovieHandler', () => {
  it('should append a MovieAdded event', () => {
    const handler = new AddMovieHandler();

    handler.handle(new AddMovieCommand());

    expect(eventStore.append).toHaveBeenCalledWith(expect.any(MovieAddedEvent));
  });
});
