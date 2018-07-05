export default class MovieAlreadyPresentException extends Error {

  constructor(title : String) {
    super("Movie already present with title: " + title);
    (<any>Object).setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}