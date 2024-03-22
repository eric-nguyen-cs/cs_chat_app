type LocalItemKey = 'token' | 'username';
class LocalItem {
  key: LocalItemKey;
  public constructor(key: LocalItemKey) {
    this.key = key;
  }
  get() {
    return localStorage.getItem(this.key);
  }
  set(data: string) {
    localStorage.setItem(this.key, data);
  }
  reset() {
    localStorage.removeItem(this.key);
  }
}

export const LocalToken = new LocalItem('token');
export const LocalUsername = new LocalItem('username');
