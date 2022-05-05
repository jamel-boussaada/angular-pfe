import { Route } from '@angular/router';
import { ScrumboardBoardsComponent } from 'app/modules/ingenieur/scrumboard/boards/boards.component';
import { ScrumboardBoardResolver, ScrumboardBoardsResolver, ScrumboardCardResolver } from 'app/modules/ingenieur/scrumboard/scrumboard.resolvers';
import { ScrumboardBoardComponent } from 'app/modules/ingenieur/scrumboard/board/board.component';
import { ScrumboardCardComponent } from 'app/modules/ingenieur/scrumboard/card/card.component';

export const scrumboardRoutes: Route[] = [
    {
        path     : '',
        component: ScrumboardBoardsComponent,
        resolve  : {
            boards: ScrumboardBoardsResolver
        }
    },
    {
        path     : ':boardId',
        component: ScrumboardBoardComponent,
        resolve  : {
            board: ScrumboardBoardResolver
        },
        children : [
            {
                path     : 'card/:cardId',
                component: ScrumboardCardComponent,
                resolve  : {
                    card: ScrumboardCardResolver
                }
            }
        ]
    }
];
