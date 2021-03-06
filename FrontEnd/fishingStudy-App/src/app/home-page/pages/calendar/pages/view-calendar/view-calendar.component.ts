import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

import { CalendarService } from '../../services/calendar.service';
import { ShowEvent } from '../../interfaces/event';

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.css']
})
export class ViewCalendarComponent implements OnInit {

  data:ShowEvent[] = []

  
  constructor( private calendarService:CalendarService) { }
  
  calendarOptions!: CalendarOptions;
  
  ngOnInit()	:void{
    this.getEvents();

  }  

  getEvents(){
    
    this.calendarService.getEvents().subscribe( res => {
      res.events.forEach((event)=>{
        this.data.push({title: event.title, start: event.start, end: event.end})
      });

      this.calendarOptions = {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
          left: 'prevYear,prev,next,nextYear,today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText:{
          today:'hoy',
          month:'mes',
          week:'semana',
          day:'dia'
        },
        allDayText:'Todo el dia',
        slotLabelFormat : {
          hour:'2-digit',
          minute:'2-digit',

        },
      
        events: this.data

      };
    });
    
  } 
 
  
}