import React, {useState, useCallback, useEffect} from 'react';
import DatePicker from 'react-date-picker';
import moment from 'moment-timezone';
import {TerminalCalendar} from '@scc/react-big-calendar';

import terminalCalendarMock from './../../mock/terminalCalendar.json';
import terminalCalendarDetailMock from './../../mock/terminalCalendarDetail.json';
import terminalCalendarDetailPendingMock from './../../mock/terminalCalendarDetailPending.json';
import terminalCalendarDetailPendingIncomeMock from './../../mock/terminalCalendarDetailPendingIncome.json';
import terminalCalendarDetailquadrateMock from './../../mock/terminalCalendarDetailQuadrate.json';
import allLocalMock from './../../mock/allLocal.json';
import allTerminalMock from './../../mock/allTerminal.json';
import terminalPendingMock from './../../mock/terminalPending.json';
import terminalPendingIncomeMock from './../../mock/terminalPendingIncome.json';
import terminalquadrateMock from './../../mock/terminalquadrate.json';
import terminalCalendarquadrateMock from './../../mock/terminalCalendarQuadrate.json';
import terminalCalendarPendingMock from './../../mock/terminalCalendarPending.json';
import terminalCalendarPendingIncomeMock from './../../mock/terminalCalendarPendingIncome.json';
import localPendingMock from './../../mock/localPending.json';
import localPendingIncomeMock from './../../mock/localPendingIncome.json';
import localquadrateMock from './../../mock/localQuadrate.json';

import './Terminal.scss';

export const Terminal = () => {
  const [date, setDate] = useState(new Date());
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
    redirectF8(item.clickeable);
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

  const redirectF8 = (clickeable: any) => {
    if (clickeable) {
      alert('Llévame al F8!!');
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
    console.log(option)
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
    let pendingIncome = [];
    let pending = [];
    let quadrate = [];
    // let all = [];
    if (calendar.data.pendingIncome.length > 0) {
      pendingIncome = calendar.data.pendingIncome.map((item: any) => {
        return {
          title: item.title,
          start: moment(item.date).utc().format('YYYY-MM-DD'),
          end: moment(item.date).utc().format('YYYY-MM-DD'),
          description: 'P. Recaudación',
          count: item.count,
          bgcolor: '#FFDB04',
          color: '#897711',
          type: 'pendingIncome',
          seeDay: false,
          seeCount: count,
        };
      });
    }
    if (calendar.data.pending.length > 0) {
      pending = calendar.data.pending.map((item: any) => {
        return {
          title: item.title,
          start: moment(item.date).utc().format('YYYY-MM-DD'),
          end: moment(item.date).utc().format('YYYY-MM-DD'),
          description: 'Pendiente',
          count: item.count,
          bgcolor: '#ffe6ee',
          color: '#ee0c64',
          type: 'pending',
          seeDay: false,
          seeCount: count,
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
          count: item.count,
          bgcolor: '#d6eae8',
          color: '#238f51',
          type: 'quadrate',
          seeDay: false,
          seeCount: count,
        };
      });
    }

    eventsResult = pendingIncome.concat(pending).concat(quadrate);
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
                <option value="all">Todos</option>
                <option value="arica">Expo Arica</option>
              </select>
            </div>
            <div className="flex-item flex-item__3 mb-0">
              <span className="label-input">Estado</span>
              <select name="local" onChange={handleInputChangeState}>
                <option value="all">Todos</option>
                <option value="pending">Pendiente</option>
                <option value="pendingIncome">Pendiente Recaudación</option>
                <option value="quadrate">Cuadrado</option>
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
                <div className="btn-group">
                  {/* Todos los locales */}

                  {/* Detalle por local */}
                  {allLocal.length > 0 && (
                    <>
                      <fieldset className="flex-container mb-1 mr-1 items-center">
                        <span className="flex-item label-input py-4 px-0 m-0">
                          Todos los locales
                        </span>
                      </fieldset>

                      <div className="listing-buttons">
                        {allLocal.length > 0 &&
                          allLocal.map((data: any, i: any) => (
                            <button
                              key={i + 1}
                              className="flex-item_19 btn mb-0 w-11/12 terminal"
                              onClick={() => allLocalClick(data.local)}>
                              <span className="flex-item left">
                                {data.local}
                              </span>
                              <div>
                                {data.pendingIncome && (
                                  <span className="right flex-item count text-sm pendingIncome circle">
                                  </span>
                                )}
                                {data.pending && (
                                  <span className="right flex-item count text-sm pending circle">
                                  </span>
                                )}
                                {data.quadrate && (
                                  <span className="right flex-item count text-sm quadrate circle">
                                  </span>
                                )}
                              </div>
                            </button>
                          ))}
                      </div>
                    </>
                  )}

                  {/* Detalle por local */}
                  {allTerminal.length > 0 && (
                    <>
                      <fieldset className="flex-container mb-1 mr-1 items-center">
                        <span className="flex-item label-input py-4 px-0 m-0">
                          Local {local}
                        </span>
                        <button
                          className="btn btn-small btn-secondary float-right m-0"
                          onClick={() => handleLocal('all')}>
                          <span className="icofont-exit"></span>Volver
                        </button>
                      </fieldset>
                      <div className="listing-buttons">
                        {allTerminal.length > 0 &&
                          allTerminal.map((data: any, i: any) => (
                            <button
                              className="flex-item_19 btn mb-0 w-11/12 terminal"
                              key={i + 1}
                              onClick={() =>
                                terminalDetailClick(data.terminal, data.status)
                              }>
                              <span className="flex-item left">
                                {data.terminal}
                              </span>
                              <span
                                className={`right flex-item count text-sm ${data.status}`}></span>
                            </button>
                          ))}
                      </div>
                    </>
                  )}

                  {/* Detalle por terminal */}
                  {terminal.show && (
                    <>
                      <fieldset className="flex-container mb-1 mr-1 items-center">
                        <span className="flex-item label-input py-4 px-0 m-0">
                        Local {local}
                        </span>
                        <button
                          className="btn btn-small btn-secondary float-right m-0"
                          onClick={() => allLocalClick(local)}>
                          <span className="icofont-exit"></span>Volver
                        </button>
                      </fieldset>
                      <button className="flex-item_19 btn mb-0 w-11/12 terminal terminal-detail">
                        <span className="flex-item left">
                          {terminal.terminal}
                        </span>
                        <span
                          className={`right flex-item count text-sm ${terminal.status}`}></span>
                      </button>
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
