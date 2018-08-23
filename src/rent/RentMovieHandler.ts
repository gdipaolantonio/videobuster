import CommandHandler from "../CommandHandler";
import RentMovieCommand from "./RentMovieCommand";
import MovieNotFoundException from "./MovieNotFoundException";

export default class RentMovieHandler implements CommandHandler {

  handle(aCommand: RentMovieCommand) {
    throw new MovieNotFoundException(aCommand.title);
  }
}
