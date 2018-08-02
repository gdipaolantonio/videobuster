import Event from "../Event";

export default class MovieAddedEventV2 implements Event {

  public readonly title : string;
  public readonly availability : number;

  constructor(title : string, availability: number) {
    this.title = title;
    this.availability = availability;
  }
}