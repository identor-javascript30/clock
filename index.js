import {html, render} from '../node_modules/lit-html/lit-html.js';

class Clock extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.render();

    const adjustTime = () => {
      const calculateCoordinate = (radian, radius) => [
        160 + (Math.sin(radian) * radius),
        160 - (Math.cos(radian) * radius)
      ];

      const secondHand = this.shadowRoot.querySelector('svg line:nth-of-type(1)');
      const minuteHand = this.shadowRoot.querySelector('svg line:nth-of-type(2)');
      const hourHand = this.shadowRoot.querySelector('svg line:nth-of-type(3)');

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
    };

    // Show current time
    adjustTime();

    // Adjust persecond
    setInterval(adjustTime, 1000);
  }

  render() {
    const template = html`
      <style>
        svg {
          width: 100%;
          height: 100%;
        }
      </style>
      <svg>
        <circle cx="160" cy="160" r="120" fill="none" stroke="black" />
        <line x1="160" y1="160" x2="160" y2="60" stroke="black" />
        <line x1="160" y1="160" x2="160" y2="80" stroke="black" />
        <line x1="160" y1="160" x2="160" y2="100" stroke="black" />
      </svg>
    `;

    return render(template, this.shadowRoot);
  }
}

customElements.define('x-clock-app', Clock);

