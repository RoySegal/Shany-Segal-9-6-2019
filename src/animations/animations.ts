import { animate, state, style, transition, trigger } from '@angular/animations';

export const changeInputState = trigger('changeInputState', [
  state('withText', style({
    left: '1%',
  })),
    state('noText',   style({
      transform: 'translate(45vw, 45vh) scale(1.5)',
    })),
  transition('* => *', animate('1000ms ease')),
]);

export const slideFromBottom = trigger(
  'slideFromBottom',
  [
    transition(
      ':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('800ms 800ms', style({ transform: 'translateY(0)', 'opacity': 1 })),
      ],
    ),
    transition(
      ':leave', [
        style({ transform: 'translateY(0)', 'opacity': 1 }),
        animate('800ms', style({ transform: 'translateY(100%)', 'opacity': 0 })),

      ],
    )],
);
