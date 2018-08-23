export default class MovieNotFoundException extends Error {

  constructor(title : String) {
    super("Movie not found with title: " + title);
    (<any>Object).setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}