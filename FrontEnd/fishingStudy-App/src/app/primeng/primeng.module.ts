import { NgModule } from '@angular/core';

import { ScrollTopModule } from 'primeng/scrolltop';
import { CardModule } from 'primeng/card';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import {CalendarModule} from 'primeng/calendar';
import {FullCalendarModule} from 'primeng/fullcalendar';
import { FieldsetModule } from 'primeng/fieldset';
import { AccordionModule } from 'primeng/accordion';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';


@NgModule({
  declarations: [],
  exports:[
    ScrollTopModule,
    CardModule,
    FileUploadModule,
    HttpClientModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    FieldsetModule,
    AccordionModule,
    FullCalendarModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    SelectButtonModule
    
  ]
})
export class PrimengModule { }
