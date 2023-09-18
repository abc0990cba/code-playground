// Abstractions
abstract class UI {
  constructor(protected backend: Backend) {}

  abstract render(): void;
}

abstract class Backend {
  abstract getData(): string;
}

// Implementations
class AndroidUI extends UI {
  public render() {
    const backendData = this.backend.getData();
    console.log(`AndroidUI <- ${backendData}`);
  }
}

class IPhoneUI extends UI {
  public render() {
    const backendData = this.backend.getData();
    console.log(`IphoneUI <- ${backendData}`);
  }
}

class WebUI extends UI {
  public render() {
    const backendData = this.backend.getData();
    console.log(`WebUI <- ${backendData}`);
  }
}

class MobileBackend extends Backend {
  public getData() {
    return 'MobileBackend';
  }
}

class WebBackend extends Backend {
  public getData() {
    return 'WebBackend';
  }
}

// Client code
const mobileBackend = new MobileBackend();
const webBackend = new WebBackend();

const iphoneUI = new IPhoneUI(mobileBackend);
iphoneUI.render();

const webUI = new WebUI(webBackend);
webUI.render();

const androidUI = new AndroidUI(mobileBackend);
androidUI.render();

const androidWebUI = new AndroidUI(webBackend);
androidWebUI.render();