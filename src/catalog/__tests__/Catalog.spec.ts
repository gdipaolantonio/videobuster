import Catalog from "../Catalog";
import MovieAddedEvent from "../MovieAddedEvent";
import AddMovieCommand from "../AddMovieCommand";
import MovieAlreadyPresentException from "../MovieAlreadyPresentException";
import MovieRemovedEvent from "../MovieRemovedEvent";
import MovieAddedEventV2 from "../MovieAddedEventV2";

describe('Catalog', () => {
  describe('when no movies are already in the catalog', () => {
    describe('and an AddMovieCommand is processed', () => {
      it('should add the movie to the catalog', () => {
        const catalog = Catalog.from([]);

        expect(catalog.process(new AddMovieCommand("Star Wars")))
          .toEqual(new MovieAddedEvent('Star Wars'));
      });
    });
  });

  describe('when a movie is already in the catalog', () => {
    describe('and an AddMovieCommand is processed', () => {
      it('should raise an exception', () => {
        const catalog = Catalog.from([
          new MovieAddedEvent("Star Wars")
        ]);

        expect(() => {
          catalog.process(new AddMovieCommand("Star Wars"));
        })
          .toThrow(MovieAlreadyPresentException);
      });
    });
  });

  describe('when a movie was previously removed from the catalog', () => {
    describe('and an AddMovieCommand is processed', () => {
      it('should add the movie to the catalog', () => {
        const catalog = Catalog.from([
          new MovieAddedEvent("Star Wars"),
          new MovieRemovedEvent("Star Wars")
        ]);

        expect(catalog.process(new AddMovieCommand("Star Wars")))
          .toEqual(new MovieAddedEvent('Star Wars'));
      });
    });
  });

  describe('when a movie with availability is added', () => {
    it('should add the movie with the availability', () => {
        const catalog = Catalog.from([]);

        expect(catalog.process(new AddMovieCommand("Star Wars", 2)))
          .toEqual(new MovieAddedEventV2('Star Wars', 2));
    });
  });

  describe('when a movie (v2) is already in the catalog', () => {
    describe('and an AddMovieCommand is processed', () => {
      it('should raise an exception', () => {
        const catalog = Catalog.from([
          new MovieAddedEventV2("Star Wars", 10)
        ]);

        expect(() => {
          catalog.process(new AddMovieCommand("Star Wars", 10));
        })
          .toThrow(MovieAlreadyPresentException);
      });
    });
  });
});
