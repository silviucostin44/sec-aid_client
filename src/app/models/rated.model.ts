export class Rated {
  protected rating?: number;

  public getRating(): number {
    return this.rating;
  }

  public setRating(value: number) {
    this.rating = value;
  }
}
