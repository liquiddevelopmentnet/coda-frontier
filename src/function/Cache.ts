export class Cachable<T> {
  private call: () => Promise<T>
  private cache: T | undefined
  private lastTime: number = 0

  constructor(func: () => Promise<T>) {
    this.call = func
    this.refresh()
  }

  public async get(): Promise<T | undefined> {
    if (this.shouldRefresh()) {
      await this.refresh()
    }
    return this.cache
  }

  public async refresh(): Promise<T> {
    this.cache = await this.call()
    this.lastTime = Date.now()
    return this.cache
  }

  public invalidate(): void {
    this.cache = undefined
  }

  public isPresent(): boolean {
    return this.cache !== undefined
  }

  public shouldRefresh(): boolean {
    return this.cache === undefined || Date.now() - this.lastTime > 1000 * 60
  }
}
