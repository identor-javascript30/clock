function adjustTime() {
  const calculateCoordinate = (radian, radius) => [
    160 + (Math.sin(radian) * radius),
    160 - (Math.cos(radian) * radius)
  ];

  const secondHand = document.querySelector('svg line:nth-of-type(1)');
  const minuteHand = document.querySelector('svg line:nth-of-type(2)');
  const hourHand = document.querySelector('svg line:nth-of-type(3)');

  const date = new Date();

  const second = date.getSeconds();
  const minute = date.getMinutes();
  const hour = date.getHours();

  const [secondX, secondY] = calculateCoordinate(2 * Math.PI * second / 60, 100);
  const [minuteX, minuteY] = calculateCoordinate(2 * Math.PI * minute / 60, 80);
  const [hourX, hourY] = calculateCoordinate(2 * Math.PI * hour / 12, 60);

  secondHand.setAttribute('x2', secondX);
  secondHand.setAttribute('y2', secondY);

  minuteHand.setAttribute('x2', minuteX);
  minuteHand.setAttribute('y2', minuteY);

  hourHand.setAttribute('x2', hourX);
  hourHand.setAttribute('y2', hourY);
}

// Show current time
adjustTime();

// Adjust persecond
setInterval(adjustTime, 1000);

