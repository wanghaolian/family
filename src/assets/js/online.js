function OnLine(data) {
  OnLine.timer = null; // 定时器
  OnLine.time = data ? data.time : 500; // 检测断网间隔时间

  let isOnline = true;

  window.addEventListener('online', () => {
    isOnline = true;
    OnLine.onLineCallback();
  });

  window.addEventListener('offline', () => {
    isOnline = false;

    setTimeout(() => {
      if (isOnline === false) {
        OnLine.offLineCallback();
      }
    }, 1000);
  });

  if (!navigator.onLine) {
    // 发送一次断网提示
    OnLine.once();
  }

  return OnLine;
}

OnLine.success = function handleOnLine(fun) {
  OnLine.onLineCallback = fun;

  if (navigator.onLine) {
    OnLine.onLineCallback();
  }
};

OnLine.error = function handleOffLine(fun) {
  OnLine.offLineCallback = fun;
};

OnLine.once = function once() {
  OnLine.timer = setInterval(() => {
    OnLine.offLineCallback();
    clearInterval(OnLine.timer);
    OnLine.timer = null;
  }, OnLine.time);
};

window.HMMOnLine = OnLine;

