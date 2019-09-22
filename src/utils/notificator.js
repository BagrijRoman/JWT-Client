import { toast } from 'react-toastify';

class notificator {
  constructor(notificator) {
    this.notificator = notificator;

    this.defaultConfig = {
      position: notificator.POSITION.TOP_RIGHT,
      autoClose: 5000,
      className: 'app-notification',
    };
  }

  _notification(content, config ) {
    const { notificator, defaultConfig } = this;

    notificator(content, { ...defaultConfig, ...config });
  }

  success(msg) {
    const { _notification, notificator } = this;
    _notification(msg, { type: notificator.TYPE.SUCCESS });
  }

  info(msg) {
    const { _notification, notificator } = this;
    _notification(msg, { type: notificator.TYPE.INFO });
  }

  warning(msg) {
    const { _notification, notificator } = this;
    _notification(msg, { type: notificator.TYPE.WARNING });
  }

  error(msg) {
    const { _notification, notificator } = this;
    _notification(msg, { type: notificator.TYPE.ERROR });
  }
}

export default new notificator(toast);
