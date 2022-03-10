import React, {useState} from 'react';
import {Menu} from '../components/Menu';
// import {Arching} from '../components/Arching'; //VER PANEL DE ARQUEO
import {SalesBook} from '../components/SalesBook'; //VER ESTADO DE TERMINALES
import {Terminal} from '../components/Terminal';

export const Template = () => {
  const [terminal, setTerminal] = useState(false);

  const handleRender = () => {
    setTerminal(!terminal);
  };
  return (
    <div>
      <header className="topheader">
        <img
          className="topheader--img"
          src="../images/svg/logo-white.svg"
          alt="Falabella"
        />
        <section className="topheader--help-country">
          <section className="flags flex-container flex--right">
            <div className="flags--business flex-item flex-item__10 mb-0 mt-5 ">
              <p></p>
            </div>
            <div className="flex-item flex-item__5 mb-0">
              <span className="flags-huge-chile"></span>
            </div>
          </section>
          <a href="#">
            <i className="icofont-question-circle"></i>
            <span>AYUDA</span>
          </a>
        </section>
      </header>
      <section className="routers">
        <Menu />
        {terminal ? (
          <Terminal handleRender={handleRender} />
        ) : (
          <SalesBook handleRender={handleRender} />
        )}
      </section>
    </div>
  );
};
