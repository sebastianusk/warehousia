const asyncLocalStorage = {
  async setItem(key: string, value: string) {
    await null;
    return localStorage.setItem(key, value);
  },
  async getItem(key: string) {
    await null;
    return localStorage.getItem(key);
  },
};

export default asyncLocalStorage;
