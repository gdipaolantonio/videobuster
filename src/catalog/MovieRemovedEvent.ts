import Event from "../Event";

export default class MovieRemovedEvent implements Event {

  public readonly title : string;

  constructor(title : string) {
    this.title = title;
  }
}