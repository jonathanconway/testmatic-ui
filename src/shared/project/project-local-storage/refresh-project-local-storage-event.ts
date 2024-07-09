export class RefreshProjectLocalStorageEvent extends Event {
  static type = "refreshprojectlocalstorage";
  constructor() {
    super(RefreshProjectLocalStorageEvent.type);
  }
}
