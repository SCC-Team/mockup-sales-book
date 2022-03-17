import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';

import menuMock from '../../mock/menu.json';
import tableDataMock from '../../mock/tableData.json';
import tableDataFacturasMock from '../../mock/tableDataFacturas.json';
import headerBoletasMock from '../../mock/headerBoletas.json';
import headerFacturasMock from '../../mock/headerFacturas.json';

import './SalesBook.scss';
import { Accordion } from '../Accordion';
import { Paginate } from '../Pagination';
import { Searcher } from '../Searcher';
import { KebabMenu } from '../KebabMenu';

export const SalesBook = ({ handleRender }: any) => {
  const [date, setDate] = useState(new Date());
  const [menu, setMenu] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [tableDataBoletas, setTableDataBoletas] = useState<any>([]);
  const [header, setHeader] = useState<any>([]);
  const [toggle, setToggle] = useState<any>(false);
  const [tab, setTab] = useState<any>('Boletas');
  const [totalTab, setTotalTab] = useState<any>('Total General');

  const handleDate = (e: any) => {
    const value = e;
    setDate(value);
  };

  useEffect(() => {
    const result: any = menuMock;
    setMenu(result.data.results);

    if (tab === 'Boletas') {
      const headerData: any = headerBoletasMock;
      const resultData: any = tableDataMock;
      setHeader(headerData.data.results);
      setTableDataBoletas(resultData.data.results);
      console.log('a', tab);
    } else {
      const headerData: any = headerFacturasMock;
      const resultData: any = tableDataFacturasMock;
      setHeader(headerData.data.results);
      setTableData(resultData.data.results);
      console.log('b', tab);
    }
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
          <button className='btn  btn-secondary btn-small my-2' onClick={handleRender}>Ver estado Libro de Ventas</button>
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
                            className={`text-l font-bold uppercase px-4 py-4 rounded block leading-normal   ${data.menu === tab
                              ? 'bg-blue-300 active-tab shadow-md '
                              : 'bg-gray-200 tab'
                              } ${(data.menu === 'Guias' ||
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
                  <div className='container-header-options'>
                    <div>
                      <KebabMenu items={['Exportar a Excel']} />
                    </div>
                    <div>
                      <Searcher />
                    </div>
                    <div>
                      <Paginate data={tableData} />
                    </div>
                  </div>
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
                                      className={`${data.state === 'Cuadrado'
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
                                      className={`${data.state === 'Cuadrado'
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
                      className={`toggle-sidebar mx-4 animate__animated  ${toggle
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
                            ${data.title === totalTab
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
                            ${data.title === totalTab
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
                            ${data.title === totalTab
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
        </section >
      </section >
    </article >
  );
};
