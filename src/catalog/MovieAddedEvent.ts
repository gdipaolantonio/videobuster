import Event from "../Event";

export default class MovieAddedEvent implements Event {

  public readonly title : string;

  constructor(title : string) {
    this.title = title;
  }
}