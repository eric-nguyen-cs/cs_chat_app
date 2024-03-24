"use client";

type LocalItemKey = "token" | "username";
class LocalItem {
  key: LocalItemKey;
  public constructor(key: LocalItemKey) {
    this.key = key;
  }
  get() {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem(this.key);
  }
  set(data: string) {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(this.key, data);
  }
  reset() {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.removeItem(this.key);
  }
}

export const LocalToken = new LocalItem("token");
export const LocalUsername = new LocalItem("username");
