import React, {useState, useEffect} from 'react';
import DatePicker from 'react-date-picker';

import menuMock from '../../mock/menu.json';
import tableDataMock from '../../mock/tableData.json';
import tableDataFacturasMock from '../../mock/tableDataFacturas.json';
import headerBoletasMock from '../../mock/headerBoletas.json';
import headerFacturasMock from '../../mock/headerFacturas.json';
import DocType from '../../mock/doctype.json';

import './SalesBook.scss';
import {Accordion} from '../Accordion';
import ReactModal from 'react-modal';

export const SalesBook = ({handleRender}: any) => {
  const [date, setDate] = useState(new Date());
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleModalStep1, setToggleModalStep1] = useState(false);
  const [toggleModalStep2, setToggleModalStep2] = useState(false);
  const [toggleModalStep3, setToggleModalStep3] = useState(false);
  const [docData, setDocData] = useState({
    doctype: '',
  });
  const [menu, setMenu] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [tableDataBoletas, setTableDataBoletas] = useState<any>([]);
  const [header, setHeader] = useState<any>([]);
  const [doctypeOptions, setDoctype] = useState<any>([]);
  const [toggle, setToggle] = useState<any>(false);
  const [tab, setTab] = useState<any>('Boletas');
  const [totalTab, setTotalTab] = useState<any>('Total General');

  const handleDate = (e: any) => {
    const value = e;
    setDate(value);
  };

  const handleChange = (e: any) => {
    setDocData({...docData, [e.target.name]: e.target.value});
  };

  useEffect(() => {
    const result: any = menuMock;
    setMenu(result.data.results);

    const doctype: any = DocType;
    setDoctype(doctype.data.results);

    if (tab === 'Boletas') {
      const headerData: any = headerBoletasMock;
      const resultData: any = tableDataMock;
      setHeader(headerData.data.results);
      setTableDataBoletas(resultData.data.results);
    } else {
      const headerData: any = headerFacturasMock;
      const resultData: any = tableDataFacturasMock;
      setHeader(headerData.data.results);
      setTableData(resultData.data.results);
    }
    console.log('b', doctype.data.results);
  }, [tab]);

  return (
    <article className="terminal">
      <header className="terminal--page-title p-1 pb-0">
        <div className="flex-container flex--spaceBetween">
          <div className="flex-item flex-item__18 mb-0 mr-0">
            <h1>Libro Ventas</h1>
            <nav className="breadcrumbs mt-1">
              <a href="#">
                Inicio <span className="icofont-simple-right"></span>
              </a>
              <span className="breadcrumbs active">Libro Ventas</span>
            </nav>
          </div>
        </div>
      </header>
      <section className="animate__animated animate__fast animate__fadeIn">
        <section className="terminal--filter m-1">
          <fieldset className="flex-container mb-1">
            <legend>Filtros</legend>
            <div className="flex-item flex-item__3 mb-0">
              <span className="label-input">Locales</span>
              <select
                name="local"
                onChange={() => {
                  console.log('a');
                }}>
                <option value="all">Local 1-ROSAS 1665</option>
                <option value="arica">Local 1-ROSAS 1665</option>
              </select>
            </div>

            <div className="flex-item flex-item__3 mb-0">
              <span className="label-input">Fecha</span>
              <DatePicker onChange={handleDate} value={date} />
            </div>
          </fieldset>
          <button
            className="btn  btn-secondary btn-small my-2 mx-3"
            onClick={handleRender}>
            Ver estado Libro de Ventas
          </button>
          <button
            className="btn  btn-secondary btn-small my-2 mx-3"
            onClick={() => setToggleModal(!toggleModal)}>
            Ingreso de documentos
          </button>
          <section className="flex-container">
            <div className="flex-item  flex-item--top flex--right mb-0 mr-0 terminal--tables">
              <div className="flex justify-start">
                <div className="flex flex-col w-full">
                  <ul className="flex  list-none flex-wrap pt-2 p-0 -mb-px  flex-row">
                    {menu.length > 0 &&
                      menu.map((data: any, i: any) => (
                        <li
                          className=" mx-1 last:mr-0  text-center cursor-pointer"
                          key={i}
                          onClick={() =>
                            (data.menu === 'Boletas' ||
                              data.menu === 'Facturas' ||
                              data.menu === 'Notas Credito Boletas' ||
                              data.menu === 'Notas Credito Facturas') &&
                            setTab(data.menu)
                          }>
                          <a
                            className={`text-l font-bold uppercase px-4 py-4 rounded block leading-normal   ${
                              data.menu === tab
                                ? 'bg-blue-300 active-tab shadow-md '
                                : 'bg-gray-200 tab'
                            } ${
                              (data.menu === 'Guias' ||
                                data.menu === 'Tickets' ||
                                data.menu === 'Notas de Debitos' ||
                                data.menu === 'Cuadratura ZZZ' ||
                                data.menu === 'Detalle por Jerarquia') &&
                              'disabled-tab'
                            }`}>
                            {data.menu}
                          </a>
                        </li>
                      ))}
                  </ul>
                  <div className="flex justify-start max-h-screen">
                    <div className="flex justify-between py-12 pl-6   table-container table-container--tables">
                      <table className="m-0 ">
                        <thead>
                          <tr>
                            {header.mainHeaders &&
                              header.mainHeaders.length > 0 &&
                              header.mainHeaders.map((item: any, i: any) => (
                                <th colSpan={item.colspan} key={i}>
                                  {item.title}
                                </th>
                              ))}
                          </tr>
                          <tr>
                            {header.secondaryHeaders &&
                              header.secondaryHeaders.length > 0 &&
                              header.secondaryHeaders.map(
                                (item: any, i: any) => (
                                  <th scope="col" key={i}>
                                    {item.title}
                                  </th>
                                )
                              )}
                          </tr>
                        </thead>
                        <tbody>
                          {tab === 'Boletas' && tableDataBoletas.length > 0 ? (
                            <>
                              {tableDataBoletas.map((data: any, i: any) => (
                                <>
                                  <tr>
                                    <td>{data.terminal}</td>
                                    <td>{data.rollNumber}</td>
                                    <td>{data.counter.start}</td>
                                    <td>{data.counter.end}</td>
                                    <td>{data.invoices.start}</td>
                                    <td>{data.invoices.end}</td>
                                    <td>{data.invoices.quantity}</td>
                                    <td>{data.totalSales.tax}</td>
                                    <td>{data.totalSales.otherTax}</td>
                                    <td>{data.totalSalesTerc}</td>
                                    <td>{data.totalSalesExempt}</td>
                                    <td>{data.zzzAmount}</td>
                                    <td>{data.difference}</td>
                                    <td
                                      className={`${
                                        data.state === 'Cuadrado'
                                          ? 'cuadrado'
                                          : data.state === 'Descuadrado'
                                          ? 'descuadrado'
                                          : 'zz'
                                      }`}>
                                      {data.state}
                                    </td>
                                  </tr>
                                </>
                              ))}
                            </>
                          ) : (
                            <>
                              {tableData.map((data: any, i: any) => (
                                <>
                                  <tr>
                                    <td>{data.terminal}</td>
                                    <td>{data.docNumber}</td>
                                    <td>{data.rut}</td>
                                    <td>{data.name}</td>
                                    <td>{data.neto}</td>
                                    <td>{data.tax}</td>
                                    <td>{data.otherTax}</td>
                                    <td>{data.total}</td>
                                    <td
                                      className={`${
                                        data.state === 'Cuadrado'
                                          ? 'cuadrado'
                                          : data.state === 'Descuadrado'
                                          ? 'descuadrado'
                                          : 'zz'
                                      }`}>
                                      {data.state}
                                    </td>
                                  </tr>
                                </>
                              ))}
                            </>
                          )}
                        </tbody>
                        {tab === 'Boletas' ? (
                          <thead>
                            <tr>
                              <th>Totales</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th></th>
                            </tr>
                          </thead>
                        ) : (
                          <thead>
                            <tr>
                              <th>Totales</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th>0</th>
                              <th></th>
                            </tr>
                          </thead>
                        )}
                      </table>
                      <div
                        className="flex justify-center items-center w-18 toggle-arrow -my-12"
                        onClick={() => setToggle(!toggle)}>
                        {toggle ? (
                          <span className="icofont-simple-right text-4xl"></span>
                        ) : (
                          <span className="icofont-simple-left text-4xl"></span>
                        )}
                      </div>
                    </div>
                    <div
                      className={`toggle-sidebar mx-4 animate__animated  ${
                        toggle
                          ? 'animate__fadeIn block'
                          : ' animate__fadeOut hidden'
                      } `}>
                      <ul className="flex  list-none flex-wrap  p-0 -mb-px  flex-row">
                        {tab === 'Boletas'
                          ? header?.totalTabs?.map((data: any, i: any) => (
                              <li
                                className=" mr-1/10 last:mr-0 text-center"
                                key={i}
                                onClick={() => setTotalTab(data.title)}>
                                <a
                                  className={`text-l font-bold tab-small uppercase px-2 py-4 rounded block leading-normal bg-gray-200 
                            ${
                              data.title === totalTab
                                ? 'bg-blue-300 active-tab shadow-md '
                                : 'bg-gray-200 tab'
                            }`}>
                                  {data.title}
                                </a>
                              </li>
                            ))
                          : tab === 'Facturas'
                          ? header?.totalTabsFacturas?.map(
                              (data: any, i: any) => (
                                <li
                                  className=" mr-1/10 last:mr-0  text-center"
                                  key={i}
                                  onClick={() => setTotalTab(data.title)}>
                                  <a
                                    className={`text-l font-bold tab-small uppercase px-2 py-4 rounded block leading-normal bg-gray-200 
                            ${
                              data.title === totalTab
                                ? 'bg-blue-300 active-tab shadow-md '
                                : 'bg-gray-200 tab'
                            }`}>
                                    {data.title}
                                  </a>
                                </li>
                              )
                            )
                          : header?.totalTabsNC?.map((data: any, i: any) => (
                              <li
                                className=" mr-1/10 last:mr-0  text-center"
                                key={i}
                                onClick={() => setTotalTab(data.title)}>
                                <a
                                  className={`text-l font-bold tab-small uppercase px-2 py-4 rounded block leading-normal bg-gray-200 
                            ${
                              data.title === totalTab
                                ? 'bg-blue-300 active-tab shadow-md '
                                : 'bg-gray-200 tab'
                            }`}>
                                  {data.title}
                                </a>
                              </li>
                            ))}
                      </ul>
                      <div className="py-8  flex flex-col">
                        {header?.totalFacturas?.map((data: any, i: any) => (
                          <Accordion data={data} key={i + 1} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
      <ReactModal
        className="popUp popUp-column"
        isOpen={toggleModal}
        onRequestClose={() => setToggleModal(!toggleModal)}
        style={{overlay: {background: 'rgba(0, 0, 0, 0.50)'}}}>
        <header className="popUp--header">
          <h3 className="popUp--header__title">Ingreso de documentos</h3>
          <button
            className="btn popUp--header__closeButton"
            onClick={() => {
              setToggleModal(!toggleModal);
            }}>
            <span className="icofont-close-circled"></span>
          </button>
        </header>
        <section className="popUp--body w-full">
          <fieldset className="flex-container mb-1">
            <legend>Seleccione</legend>
            <div className="flex-item flex-item__3 mb-0">
              <span className="label-input">Tipo de documento</span>
              <select
                name="doctype"
                onChange={(e) => {
                  {
                    setToggleModalStep1(!toggleModalStep1);
                    setToggleModal(!toggleModal);
                    handleChange(e);
                  }
                }}>
                <option value="all">Seleccione</option>
                {doctypeOptions.length > 0 &&
                  doctypeOptions.map((item: {type: string}, i: any) => (
                    <option value={item.type} key={i}>
                      {item.type}
                    </option>
                  ))}
              </select>
            </div>
          </fieldset>
        </section>
      </ReactModal>

      <ReactModal
        className="popUp popUp-column"
        isOpen={toggleModalStep2}
        onRequestClose={() => setToggleModalStep2(!toggleModalStep2)}
        style={{overlay: {background: 'rgba(0, 0, 0, 0.50)'}}}>
        <header className="popUp--header">
          <h3 className="popUp--header__title">Ingreso de documentos</h3>
          <button
            className="btn popUp--header__closeButton"
            onClick={() => {
              setToggleModalStep2(!toggleModalStep2);
            }}>
            <span className="icofont-close-circled"></span>
          </button>
        </header>
        <section className="popUp--body w-full">
          <section className="flex-container m-1 flex--justifyCenter flex--center">
          {(docData.doctype === 'Nota de credito' ||
              docData.doctype === 'Reversa de Guia del Mes' ||
              docData.doctype === 'Reversa de Guia Mes Anterior') ? (
              
                <div className="flex-item flex-item__1 z-10">
                  <div className="flex-container flex--left">
                    <div className="flex-item flex-item__1 mb-0 ml-0 mt-8 -mr-8 text-center">
                      <img
                        src="./../../images/svg/step-2-of-3.svg"
                        alt="Documento"
                      />
                      
                    </div>
                  </div>
                </div>
              
            ) : <div className="flex-item flex-item__1 z-10">
            <div className="flex-container flex--right">
              <div className="flex-item flex-item__1 mb-0 ml-0 mt-8 -mr-8 text-center">
                <img
                  src="./../../images/svg/step-2-of-2.svg"
                  alt="Documento"
                />
                
              </div>
            </div>
          </div>}
          </section>
          <span className="label-input">Montos</span>
          <div className="modal-table-container modal-table-container--tables">
            <table>
              <thead>
                <tr>
                  <th>Concepto</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Neto</td>
                  <td>
                    <input
                      type="number"
                      name="netAmount"
                      placeholder="0"
                      autoComplete="off"
                      min="1"
                    />
                  </td>
                </tr>
                <tr>
                  <td>IVA</td>
                  <td>
                    <input
                      type="number"
                      name="tax"
                      placeholder="0"
                      autoComplete="off"
                      min="1"
                    />
                  </td>
                </tr>
                <tr>
                  <td>IVA 3</td>
                  <td>
                    <input
                      type="number"
                      name="tax3"
                      placeholder="0"
                      autoComplete="off"
                      min="1"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Impuesto Adicional</td>
                  <td>
                    <input
                      type="number"
                      name="additionalTax"
                      placeholder="0"
                      autoComplete="off"
                      min="1"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Validez de Iva</td>
                  <td>
                    <div className="flex-container flex--center ">
                      <input type="radio" name="pivot" id="pivota" />
                      <span>Normal</span>
                      <input type="radio" name="pivot" id="pivota" />
                      <span>Fuera de Plazo</span>
                    </div>
                  </td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th>Total</th>
                  <th className="total-th">0</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="flex justify-end mt-3">
            <button
              className="btn-secondary mx-2"
              onClick={() => {
                setToggleModalStep2(!toggleModalStep2);
              }}>
              Cancelar
            </button>
            {docData.doctype === 'Nota de credito' ||
            docData.doctype === 'Reversa de Guia del Mes' ||
            docData.doctype === 'Reversa de Guia Mes Anterior' ? (
              <button
                className="btn-primary mx-2"
                onClick={() => {
                  {
                    setToggleModalStep3(!toggleModalStep3);
                    setToggleModalStep2(!toggleModalStep2);
                  }
                }}>
                Siguiente <span className="icofont-arrow-right"></span>
              </button>
            ) : (
              <button
                className="btn-primary mx-2"
                onClick={() => {
                  {
                    setToggleModalStep2(!toggleModalStep2);
                  }
                }}>
                <span className="icofont-save"></span> Guardar
              </button>
            )}
          </div>
        </section>
      </ReactModal>

      <ReactModal
        className="popUp popUp-column"
        isOpen={toggleModalStep1}
        onRequestClose={() => setToggleModalStep1(!toggleModalStep1)}
        style={{overlay: {background: 'rgba(0, 0, 0, 0.50)'}}}>
        <header className="popUp--header">
          <h3 className="popUp--header__title">Ingreso de documentos</h3>
          <button
            className="btn popUp--header__closeButton"
            onClick={() => {
              setToggleModalStep1(!toggleModalStep1);
            }}>
            <span className="icofont-close-circled"></span>
          </button>
        </header>
        <section className="popUp--body w-full px-4">
          <section className="flex-container m-1 flex--justifyCenter flex--center">
            
            {(docData.doctype === 'Nota de credito' ||
              docData.doctype === 'Reversa de Guia del Mes' ||
              docData.doctype === 'Reversa de Guia Mes Anterior') ? (
              
                <div className="flex-item flex-item__1 z-10">
                  <div className="flex-container flex--left">
                    <div className="flex-item flex-item__1 mb-0 ml-0 mt-8 -mr-8 text-center">
                      <img
                        src="./../../images/svg/step-1-of-3.svg"
                        alt="Documento"
                      />
                      
                    </div>
                  </div>
                </div>
              
            ) : <div className="flex-item flex-item__1 z-10">
            <div className="flex-container flex--right">
              <div className="flex-item flex-item__1 mb-0 ml-0 mt-8 -mr-8 text-center">
                <img
                  src="./../../images/svg/step-1-of-2.svg"
                  alt="Documento"
                />
                
              </div>
            </div>
          </div>}
          </section>
          <fieldset className="flex-container mb-1">
            <legend>Identificacion del documento</legend>
            <div className="flex-item flex-item__4 mb-2 mr-2">
              <span className="label-input">Numero de documento</span>
              <input
                type="number"
                name="docNumber"
                placeholder="0"
                autoComplete="off"
                min="1"
              />
            </div>
            <div className="flex-item flex-item__4 mb-0 mr-2">
              <span className="label-input">Fecha</span>
              <DatePicker onChange={handleDate} value={date} />
            </div>
            <div className="flex-item flex-item__4 mb-2 mr-2">
              <span className="label-input">Estado</span>
              <select name="status">
                <option value="all">Seleccione</option>
                {doctypeOptions.length > 0 &&
                  doctypeOptions.map((item: {type: string}, i: any) => (
                    <option value="arica" key={i}>
                      {item.type}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex-item flex-item__4 mb-2 mr-2">
              <span className="label-input">Local</span>
              <select name="local">
                <option value="all">Seleccione</option>
                {doctypeOptions.length > 0 &&
                  doctypeOptions.map((item: {type: string}, i: any) => (
                    <option value="arica" key={i}>
                      {item.type}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex-item flex-item__4 mb-2 mr-2">
              <span className="label-input">Terminal</span>
              <select name="terminal">
                <option value="all">Seleccione</option>
                {doctypeOptions.length > 0 &&
                  doctypeOptions.map((item: {type: string}, i: any) => (
                    <option value="arica" key={i}>
                      {item.type}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex-item flex-item__4 mb-2 mr-2">
              <span className="label-input">Secuencia</span>
              <input
                type="number"
                name="sequence"
                placeholder="0"
                autoComplete="off"
                min="1"
              />
            </div>

            <div className="flex-item flex-item__4 mb-2 mr-2">
              <span className="label-input">Fecha de proceso</span>
              <p className="m-1 text-2xl">12/12/2022</p>
            </div>
          </fieldset>
          <fieldset className="flex-container mb-1">
            <legend>Datos del cliente</legend>
            <div className="flex-item flex-item__5 mb-2 mr-2">
              <span className="label-input">Rut</span>
              <input
                type="text"
                name="rut"
                placeholder="11.111.111-K"
                autoComplete="off"
              />
            </div>

            <div className="flex-item flex-item__12 mb-2 mr-2">
              <span className="label-input">Nombre</span>
              <input
                type="text"
                name="name"
                placeholder="Escriba el nombre de persona natural o razon social"
                autoComplete="off"
              />
            </div>
          </fieldset>
          <div className="flex justify-end mt-3">
            <button
              className="btn-secondary mx-2"
              onClick={() => {
                setToggleModalStep1(!toggleModalStep1);
              }}>
              Cancelar
            </button>
            <button
              className="btn-primary mx-2"
              onClick={() => {
                {
                  setToggleModalStep1(!toggleModalStep1);
                  setToggleModalStep2(!toggleModalStep2);
                }
              }}>
              Siguiente <span className="icofont-arrow-right"></span>
            </button>
          </div>
        </section>
      </ReactModal>

      <ReactModal
        className="popUp popUp-column"
        isOpen={toggleModalStep3}
        onRequestClose={() => setToggleModalStep3(!toggleModalStep3)}
        style={{overlay: {background: 'rgba(0, 0, 0, 0.50)'}}}>
        <header className="popUp--header">
          <h3 className="popUp--header__title">Ingreso de documentos</h3>
          <button
            className="btn popUp--header__closeButton"
            onClick={() => {
              setToggleModalStep3(!toggleModalStep3);
            }}>
            <span className="icofont-close-circled"></span>
          </button>
        </header>
        <section className="popUp--body w-full px-4">
          <section className="flex-container m-1 flex--justifyCenter flex--center">
         
              
                <div className="flex-item flex-item__1 z-10">
                  <div className="flex-container flex--left">
                    <div className="flex-item flex-item__1 mb-0 ml-0 mt-8 -mr-8 text-center">
                      <img
                        src="./../../images/svg/step-3-of-3.svg"
                        alt="Documento"
                      />
                      
                    </div>
                  </div>
                </div>
              
            
          </section>
          <fieldset className="flex-container mb-1">
            <legend>Tipo</legend>
            <div className="flex-container flex--center ">
              <input type="radio" name="pivot" id="pivota" />
              <span>Boleta</span>
              <input type="radio" name="pivot" id="pivota" />
              <span>Factura</span>
            </div>
          </fieldset>
          <fieldset className="flex-container mb-1">
            <legend>Origen del documento</legend>
            <div className="flex-item flex-item__4 mb-2 mr-2">
              <span className="label-input">Transaccion</span>
              <input
                type="number"
                name="transaction"
                placeholder="0"
                autoComplete="off"
                min="1"
              />
            </div>
            <div className="flex-item flex-item__4 mb-0 mr-2">
              <span className="label-input">Fecha</span>
              <DatePicker onChange={handleDate} value={date} />
            </div>
            <div className="flex-item flex-item__4 mb-2 mr-2">
              <span className="label-input">Secuencia</span>
              <input
                type="number"
                name="docNumber"
                placeholder="0"
                autoComplete="off"
                min="1"
              />
            </div>
            <div className="flex-item flex-item__4 mb-2 mr-2">
              <span className="label-input">Numero de documento</span>
              <input
                type="number"
                name="docNumber"
                placeholder="0"
                autoComplete="off"
                min="1"
              />
            </div>
          </fieldset>
          <div className="flex justify-end mt-3">
            <button
              className="btn-secondary mx-2"
              onClick={() => {
                setToggleModalStep3(!toggleModalStep3);
              }}>
              Cancelar
            </button>
            <button
              className="btn-primary mx-2"
              onClick={() => {
                {
                  setToggleModalStep3(!toggleModalStep3);
                }
              }}>
              <span className="icofont-save"></span> Guardar
            </button>
          </div>
        </section>
      </ReactModal>
    </article>
  );
};
