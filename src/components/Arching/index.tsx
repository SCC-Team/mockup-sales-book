import React, {useState} from 'react';
import DatePicker from 'react-date-picker';

import {Accordion} from '../Accordion';

import dataMock from './../../mock/mock.json';

import './Arching.scss';

export const Arching = () => {
  const [value, onChange] = useState(new Date());

  const notFound = () => {
    return (
      <tr>
        <td colSpan={5} className="text-center p-13">
          <span className="no-info">No se encontró información</span>
        </td>
      </tr>
    );
  };

  return (
    <article className="arching">
      <header className="arching--page-title p-1 pb-0">
        <div className="flex-container flex--spaceBetween">
          <div className="flex-item flex-item__18 mb-0 mr-0">
            <h1>Panel de Arqueo</h1>
            <nav className="breadcrumbs mt-1">
              <a href="#">
                Incio <span className="icofont-simple-right"></span>
              </a>
              <span className="breadcrumbs active">Panel de Arqueo</span>
            </nav>
          </div>
        </div>
      </header>
      <div className="animate__animated animate__fast animate__fadeIn">
      <section className="arching--filter m-1">
        <fieldset className="flex-container">
          <legend>Filtro</legend>
          <div className="flex-item flex-item__3 mb-0">
            <span className="label-input">Local</span>
            <select name="local">
              <option value="1">Selecione</option>
            </select>
          </div>
          <div className="flex-item flex-item__3 mb-0">
            <span className="label-input">Terminal</span>
            <select name="local">
              <option value="1">Selecione</option>
            </select>
          </div>
          <div className="flex-item flex-item__3 mb-0">
            <span className="label-input">Fecha</span>
            <DatePicker onChange={onChange} value={value} />
          </div>
          <div className="flex-item flex-item__3 mb-0">
            <span className="label-input">
              Empresa de Transporte de Valores
            </span>
            <input name="local" />
          </div>
          <div className="flex-item flex-item__3 mb-0">
            <span className="label-input">Recicladora</span>
            <input name="local" />
          </div>
          <div className="flex-item flex-item__1 mb-0 mt-2 mr-0">
            <span className={`icofont-ui-press fs-3 status_`}></span>
          </div>
        </fieldset>
      </section>
      <section className="arching--cards flex-container m-1">
        <div className="flex-item flex-item__15 mb-0">
          <div className="flex-container">
            <section className="card flex-item">
              <h2 className="card--title">Diferencia Caja</h2>
              <div className="card--content buttonBar-pink">
                <h3 className="card--content__number">$23.005</h3>
              </div>
            </section>
            <section className="card flex-item">
              <h2 className="card--title">Compensación</h2>
              <div className="card--content buttonBar-green">
                <h3 className="card--content__number">$23.005</h3>
              </div>
            </section>
            <section className="card flex-item">
              <h2 className="card--title">Diferencia Real</h2>
              <div className="card--content buttonBar-fuchsia">
                <h3 className="card--content__number">$23.005</h3>
              </div>
            </section>
          </div>
        </div>
        <div className="flex-item flex-item__ mr-0 mb-0">
          <section className="card">
            <h2 className="card--title">Diferencia Z</h2>
            <div className="card--content buttonBar-orange">
              <h3 className="card--content__number">$23.005</h3>
            </div>
          </section>
        </div>
      </section>
      <section className="flex-container arching--tables m-1">
        <div className="flex-item flex-item__15">
          <div className="arching--table-colection">
            <header className="flex-container flex--center">
              <div className="flex-item mr-0 mb-0">
                <h3 className="pl-1 fs-3">Recaudación</h3>
              </div>
            </header>
            <div className="mb-3">
              <table>
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th>Retiros</th>
                    <th>Recuentos Tesorería</th>
                    <th>Arqueo Z</th>
                    <th>Diferencia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Efectivo</td>
                    <td>$176.086,16</td>
                    <td>$1.531,18</td>
                    <td>$1.610,45</td>
                    <td>$1.827,29</td>
                  </tr>
                  <tr>
                    <td>Efectivo</td>
                    <td>0,00</td>
                    <td>0,00</td>
                    <td>0,00</td>
                    <td>0,00</td>
                  </tr>
                  <tr>
                    <td>Efectivo</td>
                    <td>0,00</td>
                    <td>0,00</td>
                    <td>0,00</td>
                    <td>0,00</td>
                  </tr>
                  <tr>
                    <td>Efectivo</td>
                    <td>0,00</td>
                    <td>0,00</td>
                    <td>0,00</td>
                    <td>0,00</td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th colSpan={4}> Diferencia Total</th>
                    <th className="result-ammount">1.827,9</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="arching--table-difference_management">
            <header className="flex-container flex--center">
              <div className="flex-item mr-0 mb-0">
                <h3 className="pl-1 fs-3">Gestion de Diferencias</h3>
              </div>
            </header>
            <div className="mb-3">
              <table>
                <thead>
                  <tr>
                    <th>Compensaciones</th>
                    <th>Observaciones</th>
                    <th>Monto Compensado</th>
                    <th>Diferencia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Diferencia no Imputable</td>
                    <td>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    </td>
                    <td>$1.531,18</td>
                    <td>$1.827.29</td>
                  </tr>
                  <tr>
                    <td>Carta Aviso Central</td>
                    <td>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    </td>
                    <td>0,00</td>
                    <td>0,00</td>
                  </tr>
                  <tr>
                    <td>Registro Certificado</td>
                    <td>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    </td>
                    <td>0,00</td>
                    <td>0,00</td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th colSpan={3}> Diferencia Real</th>
                    <th className="result-ammount">1.827,9</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="flex-container flex--right">
              <button type="button" className="btn btn-primary">
                <span className="icofont-plus"></span> Compensación
              </button>
            </div>
          </div>
        </div>
        <div className="flex-item flex-item__ mr-0">
          <header className="flex-container flex--center mb-1">
            <div className="flex-item mr-0 mb-0">
              <h3 className="pl-1 fs-3">Detalle Z</h3>
            </div>
            <div className=" m-0">
              <button className="btn btn-primary">
                <span className="icofont-ui-edit m-0"></span>
              </button>
            </div>
          </header>
          <fieldset className="flex-container">
            <header className="border-box flex-full  flex-container flex-full">
              <div className="flex-item">
                <p>{dataMock.localTerminal}</p>
              </div>
              <div className="flex-item text-center">
                <p>
                  <strong>Hora </strong>
                  {dataMock.hour}
                </p>
              </div>
              <div className="flex-item text-end">
                <p>{dataMock.originSequence}</p>
              </div>
            </header>
            {dataMock.zeta.length > 0
              ? dataMock.zeta.map((data: any, i: any) => (
                  <Accordion data={data} key={i + 1} />
                ))
              : notFound()}
          </fieldset>
        </div>
      </section>
      </div>
    </article>
  );
};
