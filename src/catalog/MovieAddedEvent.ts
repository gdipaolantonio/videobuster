import Event from "../Event";

export default class MovieAddedEvent implements Event {

  private title : string;

  constructor(title : string) {
    this.title = title;
  }
}