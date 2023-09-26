import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { CalendarUtils, CalendarWeekViewComponent } from 'angular-calendar';
import { WeekView, GetWeekViewArgs} from 'calendar-utils';

const EVENT_WIDTH = 150;

interface DayViewScheduler extends WeekView {
  users: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DayViewSchedulerService extends CalendarUtils {

  getWeekView(args: GetWeekViewArgs): DayViewScheduler {
    const view: DayViewScheduler = {
      ...super.getWeekView(args),
      users: []
    };
    view.hourColumns[0].events.forEach(({ event }) => {
      // assumes user objects are the same references,
      // if 2 users have the same structure but different object references this will fail
      if (!view.users.includes(event.meta.user)) {
        view.users.push(event.meta.user);
      }
    });
    // sort the users by their names
    view.users.sort((user1, user2) => user1.name.localeCompare(user2.name));
    view.hourColumns[0].events = view.hourColumns[0].events.map(
      dayViewEvent => {
        const index = view.users.indexOf(dayViewEvent.event.meta.user);
        dayViewEvent.left = index * EVENT_WIDTH; // change the column of the event
        dayViewEvent.width = EVENT_WIDTH;
        return dayViewEvent;
      }
    );
    return view;
  }


}


