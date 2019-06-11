import {
  animate,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const slideFromBottom = trigger(
  'slideFromBottom',
  [
    transition(
      ':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('500ms 500ms', style({ transform: 'translateY(0)', 'opacity': 1 })),
      ],
    ),
    transition(
      ':leave', [
        style({ transform: 'translateY(0)', 'opacity': 1 }),
        animate('800ms', style({ transform: 'translateY(100%)', 'opacity': 0 })),

      ],
    )],
);


export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), {optional: true}),
    query(':enter', stagger('300ms', [
      animate('1s ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
        style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
      ]))]), {optional: true})
  ])
])
