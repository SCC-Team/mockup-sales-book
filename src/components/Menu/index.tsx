import React from 'react';

import './Routers.scss';

export const Menu = () => {
  return (
    <aside className="menu">
      <section className="menu--user">
        <figure className="mt-10">
          <img src="../images/svg/business-man-alt-2.svg" alt="user" />
          <figcaption>
            <p>Camilo A Gonzalez M</p>
            <span className="icofont-ui-user-group"></span> Desarrollo
          </figcaption>
        </figure>
        <div className="change-profile">
          <button className="btn btn-white">
            <span className="icofont-exchange"></span>Cambiar Perfil
          </button>
        </div>
        <nav>
          <div className="icofont-ul menu--pather">
            <div className="accordion-item">
              <a className="menu--pather " href="#">
                <span className="mr-5 icofont-dashboard-web"></span> Inicio
              </a>
            </div>
            <div className="accordion-item">
              <header className="accordion-title">
                <a className="menu--pather " href="#">
                  <span className="icofont-gear-alt"></span> Configuración
                </a>
                <div className="flex-item mr-0 mb-0 menu--pather__icon-right">
                  <span className="icofont-rounded-down"></span>
                </div>
              </header>
            </div>
            <div className="accordion-item">
              <header className="accordion-title">
                <a aria-current="page" className="menu--pather" href="#">
                  <span className="icofont-chart-pie"></span> Conciliación
                </a>
                <div className="flex-item mr-0 mb-0 menu--pather__icon-right">
                  <span className="icofont-rounded-down"></span>
                </div>
              </header>
            </div>
            <div className="accordion-item">
              <header className="accordion-title">
                <a className="menu--pather " href="#">
                  <span className="icofont-money"></span> Recaudación
                </a>
                <div className="flex-item mr-0 mb-0 menu--pather__icon-right">
                  <span className="icofont-rounded-down"></span>
                </div>
              </header>
            </div>
            <div className="accordion-item">
              <a className="menu--pather active" href="#">
                <span className="mr-5 icofont-bars"></span> Panel de Arqueo
              </a>
            </div>
          </div>
        </nav>
      </section>
      <button className="menu--logout pl-10">
        <span className="icofont-power"></span> Salir
      </button>
    </aside>
  );
};
