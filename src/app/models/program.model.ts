import {Asset} from './asset.model';
import {Profile} from './profile.model';

export class Program {
  readonly id: number;
  name: string;
  assets: Asset[];
  targetProfile: Profile;
  currentProfile: Profile;

  constructor(id: string, name: string) {
    this.id = Number(id);
    this.name = name;
  }
}
