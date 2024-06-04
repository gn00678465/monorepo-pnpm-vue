interface LoadingOptions {
  title?: string;
  subtitle?: string;
  once?: boolean;
}

export class Loading {
  private loading: HTMLElement | null;
  private loadingNode: HTMLElement;

  private initialFlagKey = 'initialFlag';
  private once = false;
  constructor(options: LoadingOptions = {}) {
    const { title, subtitle, once = false } = options;
    this.loading = document.querySelector('#loading');
    this.loadingNode = document.createElement('cube-loading');
    this.loadingNode.title = title ? title : 'Loading...';
    if (subtitle && 'description' in this.loadingNode) {
      this.loadingNode.description = subtitle;
    }
    this.once = once;
  }

  get flag(): string | null {
    return window.sessionStorage.getItem(this.initialFlagKey);
  }

  set flag(v: string) {
    window.sessionStorage.setItem(this.initialFlagKey, v);
  }

  start(): void {
    if (this.once && this.flag === 'y') return;
    this.loading?.appendChild(this.loadingNode);
  }

  stop(): void {
    if (this.once) {
      this.flag = 'y';
    }
    setTimeout(() => {
      if (this.loading) {
        this.loading.style.opacity = '0.02';
      }
      setTimeout(
        () => this.loading && document.body.removeChild(this.loading),
        600
      );
    });
  }
}
