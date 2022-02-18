import React, {useState, useCallback, useEffect} from 'react';
import DatePicker from 'react-date-picker';
import moment from 'moment-timezone';
import {TerminalCalendar} from '@scc/react-big-calendar';

import terminalCalendarMock from './../../mock/terminalCalendar.json';
import terminalCalendarDetailMock from './../../mock/terminalCalendarDetail.json';
import terminalCalendarDetailPendingMock from './../../mock/terminalCalendarDetailPending.json';
import terminalCalendarDetailPendingIncomeMock from './../../mock/terminalCalendarDetailPendingIncome.json';
import terminalCalendarDetailSquareMock from './../../mock/terminalCalendarDetailSquare.json';
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
  const [allTerminal, setAllTerminal] = useState<any>([]);
  const [terminal, setTerminal] = useState({
    terminal: '',
    status: '',
    show: false,
  });

  const onSelectEvent = useCallback((item) => {
    getStatusTerminal(item.type, item.clickeable);
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
    if (status === 'square') {
      setDataCalendar(terminalCalendarDetailSquareMock, false);
    }
  };

  const getStatusTerminal = (type: any, clickeable: any) => {
    if (clickeable) {
      setAllLocal([]);
      setTerminal({
        terminal: '',
        status: '',
        show: false,
      });
      if (type === 'pendingIncome') {
        const result: any = terminalPendingIncomeMock;
        setAllTerminal(result.data.results);
      }
      if (type === 'pending') {
        const result: any = terminalPendingMock;
        setAllTerminal(result.data.results);
      }
      if (type === 'square') {
        const result: any = terminalSquareMock;
        setAllTerminal(result.data.results);
      }
      if (type === 'all') {
        const result: any = allTerminalMock;
        setAllTerminal(result.data.results);
      }
    }
  };

  const handleDate = (e: any) => {
    const value = e;
    setDate(value);
  };

  const handleInputChangeLocal = (e: any) => {
    const value = e.target.value;

    handleLocal(value);
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

  const allLocalClick = () => {
    const result: any = allTerminalMock;
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
    let square = [];
    let all = [];
    if (calendar.data.pendingIncome.length > 0) {
      pendingIncome = calendar.data.pendingIncome.map((item: any) => {
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
          success: true,
          type: 'pending',
          seeDay: false,
          seeCount: count,
        };
      });
    }

    if (calendar.data.square.length > 0) {
      square = calendar.data.square.map((item: any) => {
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
          seeDay: false,
          seeCount: count,
        };
      });
    }

    if (calendar.data.all.length > 0) {
      all = calendar.data.all.map((item: any) => {
        return {
          title: item.title,
          start: moment(item.date).utc().format('YYYY-MM-DD'),
          end: moment(item.date).utc().format('YYYY-MM-DD'),
          description: '',
          count: item.count,
          bgcolor: '#0058a3',
          color: '#fff',
          success: true,
          type: 'all',
          seeDay: true,
          seeCount: false,
        };
      });
    }
    eventsResult = pendingIncome.concat(pending).concat(square).concat(all);
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
              <span className="label-input">Fecha</span>
              <DatePicker maxDetail="year" onChange={handleDate} value={date} />
            </div>
          </fieldset>
          <section className="flex-container">
            <div className="flex-container flex--center flex-item--top sidebar">
              <div className="flex-item mr-0 mb-0">
                <div className="btn-group pt-1">
                  {/* Todos los locales */}

                  {/* Detalle por local */}
                  {allLocal.length > 0 && (
                    <span className="label-input flex-container normal-case mb-2">
                      Listado de Locales
                    </span>
                  )}

                  {allLocal.length > 0 &&
                    allLocal.map((data: any, i: any) => (
                      <button
                        className="flex-container flex-item btn mb-0 w-100"
                        key={i + 1}
                        onClick={() => allLocalClick()}>
                        <span className="flex-item text-left flex-left">
                          {data.local}
                        </span>
                        <div>
                          <span className="flex-item count pendingIncome">
                            {data.pendingIncome}
                          </span>
                          <span className="flex-item count pending">
                            {data.pending}
                          </span>
                          <span className="flex-item count square">
                            {data.square}
                          </span>
                        </div>
                      </button>
                    ))}

                  {/* Detalle por local */}
                  {allTerminal.length > 0 && (
                    <>
                      <span className="label-input normal-case">
                        Listado de Terminales
                      </span>
                      <button
                        className="btn btn-secondary float-right mr-1"
                        onClick={() => handleLocal('all')}>
                        <span className="icofont-exit"></span>Volver
                      </button>
                    </>
                  )}

                  {allTerminal.length > 0 &&
                    allTerminal.map((data: any, i: any) => (
                      <button
                        className="flex-item_19 btn mb-0 w-11/12 terminal"
                        key={i + 1}
                        onClick={() =>
                          terminalDetailClick(data.terminal, data.status)
                        }>
                        <span className="flex-item left">{data.terminal}</span>
                        <span
                          className={`right flex-item count text-sm ${data.status}`}></span>
                      </button>
                    ))}

                  {/* Detalle por terminal */}
                  {terminal.show && (
                    <>
                      <span className="label-input normal-case">
                        Detalle del Terminal
                      </span>
                      <button
                        className="btn btn-secondary float-right mr-1"
                        onClick={() => allLocalClick()}>
                        <span className="icofont-exit"></span>Volver
                      </button>
                    </>
                  )}
                  {terminal.show && (
                    <button className="flex-item_19 btn mb-0 w-11/12 terminal terminal-detail">
                      <span className="flex-item left">
                        {terminal.terminal}
                      </span>
                      <span
                        className={`right flex-item count text-sm ${terminal.status}`}></span>
                    </button>
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
