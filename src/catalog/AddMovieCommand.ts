
export default class AddMovieCommand {

  public readonly title : string;
  public readonly availability : number;

  constructor(title : string, availability: number = 0) {
    this.title = title;
    this.availability = availability;
  }
}