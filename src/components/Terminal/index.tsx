import React, { useState, useCallback, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import moment from 'moment-timezone';
import { TerminalCalendar } from '@scc/react-big-calendar';

import terminalCalendarMock from './../../mock/terminalCalendar.json';
import terminalCalendarDetailMock from './../../mock/terminalCalendarDetail.json';
import terminalCalendarDetailPendingMock from './../../mock/terminalCalendarDetailPending.json';
import terminalCalendarDetailPendingIncomeMock from './../../mock/terminalCalendarDetailPendingIncome.json';
import terminalCalendarDetailquadrateMock from './../../mock/terminalCalendarDetailQuadrate.json';
import allLocalMock from './../../mock/allLocal.json';
import allTerminalMock from './../../mock/allTerminal.json';

import terminalCalendarquadrateMock from './../../mock/terminalCalendarQuadrate.json';
import terminalCalendarPendingMock from './../../mock/terminalCalendarPending.json';
import terminalCalendarPendingIncomeMock from './../../mock/terminalCalendarPendingIncome.json';
import localPendingMock from './../../mock/localPending.json';
import localPendingIncomeMock from './../../mock/localPendingIncome.json';
import localquadrateMock from './../../mock/localQuadrate.json';

import './Terminal.scss';

export const Terminal = ({ handleRender }: any) => {
  const [date, setDate] = useState(new Date('Feb 15 2022 15:34:55 GMT-0300'));
  const [events, setEvents] = useState<any>([]);
  const [allLocal, setAllLocal] = useState<any>([]);
  const [allTerminal, setAllTerminal] = useState<any>([]);
  const [local, setLocal] = useState<string>('');
  const [terminal, setTerminal] = useState({
    terminal: '',
    status: '',
    show: false,
  });

  const onSelectEvent = useCallback((item) => {
    redirectSalesBook(item.type)
  }, []);

  const terminalDetailClick = (terminal: any, status: any) => {
    setAllTerminal([]);
    setAllLocal([]);
    setTerminal({
      terminal: terminal,
      status: status,
      show: true,
    });

    if (status === 'pending') {
      setDataCalendar(terminalCalendarDetailPendingMock, false);
    }
    if (status === 'pendingIncome') {
      setDataCalendar(terminalCalendarDetailPendingIncomeMock, false);
    }
    if (status === 'quadrate') {
      setDataCalendar(terminalCalendarDetailquadrateMock, false);
    }
  };

  const redirectSalesBook = (status: any) => {
    if (status === 'pending') {
      alert('Llévame al Sales Book!!');
    }
  };

  const handleDate = (e: any) => {
    const value = e;
    setDate(value);
  };

  const handleInputChangeLocal = (e: any) => {
    const value = e.target.value;
    setLocal('Expo Arica');
    handleLocal(value);
  };

  const handleInputChangeState = (e: any) => {
    const option = e.target.value;
    console.log(option);
    if (option === 'all') {
      const resultCalendar: any = terminalCalendarMock;
      setDataCalendar(resultCalendar, true);
      const resultLocal: any = allLocalMock;
      setAllLocal(resultLocal.data.results);
    }
    if (option === 'quadrate') {
      const resultCalendar: any = terminalCalendarquadrateMock;
      setDataCalendar(resultCalendar, true);
      const resultLocal: any = localquadrateMock;
      setAllLocal(resultLocal.data.results);
    }
    if (option === 'pending') {
      const resultCalendar: any = terminalCalendarPendingMock;
      setDataCalendar(resultCalendar, true);
      const resultLocal: any = localPendingMock;
      setAllLocal(resultLocal.data.results);
    }
    if (option === 'pendingIncome') {
      const resultCalendar: any = terminalCalendarPendingIncomeMock;
      setDataCalendar(resultCalendar, true);
      const resultLocal: any = localPendingIncomeMock;
      setAllLocal(resultLocal.data.results);
    }
  };

  const handleLocal = (option: any) => {
    if (option === 'all') {
      const result: any = allLocalMock;
      setAllLocal(result.data.results);
      setDataCalendar(terminalCalendarMock, true);
      setAllTerminal([]);
    }
    if (option === 'arica') {
      const result: any = allTerminalMock;
      setAllTerminal(result.data.results);
      setDataCalendar(terminalCalendarDetailMock, true);
      setAllLocal([]);
    }
  };

  const allLocalClick = (local: string) => {
    const result: any = allTerminalMock;
    setLocal(local);
    setDataCalendar(terminalCalendarDetailMock, true);
    setAllTerminal(result.data.results);
    setAllLocal([]);
    setTerminal({
      terminal: '',
      status: '',
      show: false,
    });
  };

  const setDataCalendar = (calendar: any, count: any) => {
    //Calendar
    let eventsResult = [];

    let pending = [];
    let quadrate = [];
    // let all = [];

    if (calendar.data.pending.length > 0) {
      pending = calendar.data.pending.map((item: any) => {
        return {
          title: item.title,
          start: moment(item.date).utc().format('YYYY-MM-DD'),
          end: moment(item.date).utc().format('YYYY-MM-DD'),
          description: 'Descuadrado',
          bgcolor: '#ffe6ee',
          color: '#ee0c64',
          type: 'pending',
          seeDay: false,
        };
      });
    }

    if (calendar.data.quadrate.length > 0) {
      quadrate = calendar.data.quadrate.map((item: any) => {
        return {
          title: item.title,
          start: moment(item.date).utc().format('YYYY-MM-DD'),
          end: moment(item.date).utc().format('YYYY-MM-DD'),
          description: 'Cuadrado',
          bgcolor: '#d6eae8',
          color: '#238f51',
          type: 'quadrate',
          seeDay: false,
        };
      });
    }

    eventsResult = pending.concat(quadrate);
    setEvents(eventsResult);
  };

  useEffect(() => {
    //Calendar
    setDataCalendar(terminalCalendarMock, true);
    //Sidebar
    const result: any = allLocalMock;
    setAllLocal(result.data.results);
  }, []);

  return (
    <article className="terminal">
      <header className="terminal--page-title p-1 pb-0">
        <div className="flex-container flex--spaceBetween">
          <div className="flex-item flex-item__18 mb-0 mr-0">
            <h1>Estado de Cierre Libro Ventas</h1>
            <nav className="breadcrumbs mt-1">
              <a href="#">
                Iincio <span className="icofont-simple-right"></span>
              </a>
              <span className="breadcrumbs active">
                Estado de Cierre Libro Ventas
              </span>
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
                <option value="all">Local 1-ROSAS 1665</option>
                <option value="arica">Local 1-ROSAS 1665</option>
              </select>
            </div>

            <div className="flex-item flex-item__3 mb-0">
              <span className="label-input">Fecha</span>
              <DatePicker maxDetail="year" onChange={handleDate} value={date} />
            </div>
          </fieldset>
          <button className="btn btn-secondary btn-small my-2" onClick={handleRender}><span className='icofont-arrow-left' />Volver</button>
          <section className="flex-container">

            <div className="flex-container flex--center flex-item--top sidebar">
              <div className="flex-item mr-0 mb-0">
                <div className="btn-group">
                  {/* Todos los locales */}

                  {/* Detalle por local */}
                  {allLocal.length > 0 && (
                    <>
                      <fieldset className="flex-container mb-1 mr-1 items-center">
                        <span className="flex-item label-input py-4 px-0 m-0">
                          Local 1-ROSAS 1665
                        </span>
                      </fieldset>

                      <div className="listing-buttons">
                        <button className="flex-item_19 btn mb-0 w-11/12 terminal">
                          <span className="flex-item left">
                            Local 1-ROSAS 1665
                          </span>
                          <div>
                            <span className="right flex-item count text-sm pending circle"></span>
                          </div>
                        </button>
                      </div>
                    </>
                  )}
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
