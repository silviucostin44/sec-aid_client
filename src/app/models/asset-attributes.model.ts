export class AssetAttributes {
  private id: number;

  private description: string;

  private assetId: number;

  constructor(assetId: number) {
    this.description = '';
    this.assetId = assetId;
  }
}
