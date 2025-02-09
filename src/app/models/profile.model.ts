import {ImplementationTierEnum} from './enums/implementation-tier.enum';
import {NistCoreSubcategory} from './nist-core-subcategory.model';

export class Profile {
  implementationTier: ImplementationTierEnum;
  nistCoreSubcategoryList: NistCoreSubcategory[];
  private id: number;

  constructor() {
    this.nistCoreSubcategoryList = [];
  }
}
