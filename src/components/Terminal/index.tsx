import React, {useState, useCallback, useEffect} from 'react';
import DatePicker from 'react-date-picker';
import moment from 'moment-timezone';
import {TerminalCalendar} from '@scc/react-big-calendar';

import terminalCalendarMock from './../../mock/terminalCalendar.json';
import allLocalMock from './../../mock/allLocal.json';
import allTerminalMock from './../../mock/allTerminal.json';
import terminalPendingMock from './../../mock/terminalPending.json';
import terminalPendingIncomeMock from './../../mock/terminalPendingIncome.json';
import terminalSquareMock from './../../mock/terminalSquare.json';

import './Terminal.scss';

export const Terminal = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<any>([]);
  const [allLocal, setAllLocal] = useState<any>([]);
  const [allTerminal, setTerminal] = useState<any>([]);

  const onSelectEvent = useCallback((item) => {
    getStatusTerminal(item.type)
  }, []);

  const terminalDetailClick = (type: any) => {
    console.log(type)
    getStatusTerminal(type)
  }

  const getStatusTerminal = (type: any) => {
    setAllLocal([]);
    if(type === 'pendingIncome'){
      const result: any = terminalPendingIncomeMock;
      setTerminal(result.data.results);
    }
    if(type === 'pending'){
      const result: any = terminalPendingMock;
      setTerminal(result.data.results);
    }
    if(type === 'square'){
      const result: any = terminalSquareMock;
      setTerminal(result.data.results);
    }
  }

  const handleDate = (e: any) => {
    const value = e;
    setDate(value);
  };

  const handleInputChangeLocal = (e: any) =>  {
    const value = e.target.value;
    
    if(value === 'all'){
      const result: any = allLocalMock;
      setAllLocal(result.data.results);
      setTerminal([]);
    }
    if(value === 'arica'){
      const result: any = allTerminalMock;
      setTerminal(result.data.results);
      setAllLocal([]);
    }
    // debugger; // eslint-disable-line no-debugger
  } 

  const allLocalClick = (local: any) => {
    const result: any = allTerminalMock;
    setTerminal(result.data.results);
    setAllLocal([]);
  }

  useEffect(() => {

    //Calendar
    if (terminalCalendarMock.data.pendingIncome.length > 0) {
      let eventsResult = [];
      const pendingIncome = terminalCalendarMock.data.pendingIncome.map((item: any) => {
        return {
          title: item.title,
          start: moment(item.date).utc().format('YYYY-MM-DD'),
          end: moment(item.date).utc().format('YYYY-MM-DD'),
          description: 'Pendiente - Recaudación',
          count: item.count,
          bgcolor: '#FFDB04',
          color: '#897711',
          success: true,
          type: 'pendingIncome',
        };
      });

      const pending = terminalCalendarMock.data.pending.map((item: any) => {
        return {
          title: item.title,
          start: moment(item.date).utc().format('YYYY-MM-DD'),
          end: moment(item.date).utc().format('YYYY-MM-DD'),
          description: 'Pendiente',
          count: item.count,
          bgcolor: '#ffe6ee',
          color: '#ee0c64',
          success: true,
          type: 'pending',
        };
      });

      const square = terminalCalendarMock.data.square.map((item: any) => {
        return {
          title: item.title,
          start: moment(item.date).utc().format('YYYY-MM-DD'),
          end: moment(item.date).utc().format('YYYY-MM-DD'),
          description: 'Cuadrado',
          count: item.count,
          bgcolor: '#d6eae8',
          color: '#238f51',
          success: true,
          type: 'square',
        };
      });

      eventsResult = pendingIncome.concat(pending).concat(square);
      setEvents(eventsResult);


      //Sidebar
      const result: any = allLocalMock;
      setAllLocal(result.data.results);

    } else {
      setEvents([]);
    }
  }, []);

  return (
    <article className="terminal">
      <header className="terminal--page-title p-1 pb-0">
        <div className="flex-container flex--spaceBetween">
          <div className="flex-item flex-item__18 mb-0 mr-0">
            <h1>Estado de Terminales</h1>
            <nav className="breadcrumbs mt-1">
              <a href="#">
                Iincio <span className="icofont-simple-right"></span>
              </a>
              <span className="breadcrumbs active">Estado de Terminales</span>
            </nav>
          </div>
        </div>
      </header>
      <section className="animate__animated animate__fast animate__fadeIn">
        <section className="terminal--filter m-1">
          <fieldset className="flex-container mb-1">
            <legend>Filtro</legend>
            <div className="flex-item flex-item__3 mb-0">
              <span className="label-input">Locales</span>
              <select name="local" onChange={handleInputChangeLocal}>
                <option value="all" >Todos</option>
                <option value="arica">Expo Arica</option>
              </select>
            </div>
            <div className="flex-item flex-item__3 mb-0">
              <span className="label-input">Fecha</span>
              <DatePicker maxDetail="year" onChange={handleDate} value={date} />
            </div>
          </fieldset>
          <section className="flex-container">
            <div className="flex-container flex--center flex-item--top sidebar">
              <div className="flex-item mr-0 mb-0">
                <div className="flex-container btn-group mt-4">
                  {/* Todos los locales */}
                {allLocal.length > 0
                && allLocal.map((data: any, i: any) => (
                  <button className="flex-item btn mb-0" key={ i + 1 } onClick={ () => allLocalClick( data.local)}>
                    <span className="flex-item left">{ data.local }</span>
                    <div className="right">
                    <span className="flex-item count pendingIncome">{ data.pendingIncome }</span>
                    <span className="flex-item count pending">{ data.pending }</span>
                    <span className="flex-item count square">{ data.square }</span>
                    </div>
                  </button>
                )) }

                  {/* Detalle por local */}
                {allTerminal.length > 0
                && allTerminal.map((data: any, i: any) => (
                  <button className="flex-item_19 btn mb-0 w-100 terminal" key={ i + 1 }  onClick={ () => terminalDetailClick( data.status)}>
                    <span className="flex-item left">{ data.terminal }</span>
                    <span className={ `right flex-item count ${ data.status }`}></span>
                  </button>
                )) }
                </div>
              </div>
            </div>
            <div className="flex-item  flex-item--top flex--right mb-0 mr-0">
              <TerminalCalendar
                onSelectEvent={onSelectEvent}
                date={date}
                events={events}
              />
            </div>
          </section>
        </section>
      </section>
    </article>
  );
};
