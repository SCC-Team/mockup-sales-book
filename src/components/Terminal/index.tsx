import React, {useState, useEffect} from 'react';
import DatePicker from 'react-date-picker';

import menuMock from './../../mock/menu.json';
import tableDataMock from './../../mock/tableData.json';
import headerBoletasMock from './../../mock/headerBoletas.json';

import './Terminal.scss';

export const Terminal = () => {
  const [date, setDate] = useState(new Date());
  const [menu, setMenu] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [headerBoletas, setHeaderBoletas] = useState<any>([]);
  const [toggle, setToggle] = useState<any>(false);

  const handleDate = (e: any) => {
    const value = e;
    setDate(value);
  };

  useEffect(() => {
    const result: any = menuMock;
    setMenu(result.data.results);

    const resultData: any = tableDataMock;
    setTableData(resultData.data.results);

    const headerData: any = headerBoletasMock;
    console.log(headerData.data.results);
    setHeaderBoletas(headerData.data.results);
  }, []);

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
            <div className="flex-item  flex-item--top flex--right mb-0 mr-0 terminal--tables">
              
              <div className="flex justify-start">
                <div className="flex flex-col w-full">
                  <ul className="flex  list-none flex-wrap pt-2 p-0 -mb-px  flex-row">
                    {menu.length > 0 &&
                      menu.map((data: any, i: any) => (
                        <li className=" mr-1/10 last:mr-0  text-center" key={i}>
                          <a
                            className={`text-l font-bold uppercase px-4 py-4 rounded block leading-normal   ${
                              i === 0
                                ? 'bg-blue-300 active-tab shadow-md '
                                : 'bg-gray-200 tab'
                            }`}>
                            {data.menu}
                          </a>
                        </li>
                      ))}
                  </ul>
                  <div className="flex justify-start max-h-screen">
                    <div className="flex justify-between py-12 pl-6   table-container  ">
                      <table className="m-0 ">
                        <thead>
                          <tr>
                            {headerBoletas.mainHeaders &&
                              headerBoletas.mainHeaders.length > 0 &&
                              headerBoletas.mainHeaders.map(
                                (item: any, i: any) => (
                                  <th colSpan={item.colspan} key={i}>
                                    {item.title}
                                  </th>
                                )
                              )}
                          </tr>
                          <tr>
                            {headerBoletas.secondaryHeaders &&
                              headerBoletas.secondaryHeaders.length > 0 &&
                              headerBoletas.secondaryHeaders.map(
                                (item: any, i: any) => (
                                  <th scope="col" key={i}>
                                    {item.title}
                                  </th>
                                )
                              )}
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((data: any, i: any) => (
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
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                      <div
                        className="flex justify-center items-center w-20 toggle-arrow"
                        onClick={() => setToggle(!toggle)}>
                        {toggle ? (
                          <span className="icofont-arrow-right text-4xl"></span>
                        ) : (
                          <span className="icofont-arrow-left text-4xl"></span>
                        )}
                      </div>
                    </div>
                    <div
                      className={`toggle-sidebar mx-4 animate__animated  ${
                        toggle
                          ? 'animate__bounceInRight block'
                          : ' animate__bounceOutRight hidden'
                      } `}>
                      <ul className="flex  list-none flex-wrap  p-0 -mb-px  flex-row">
                        <li className=" mr-1/10 last:mr-0  text-center">
                          <a
                            className={`text-l font-bold uppercase px-2 py-4 rounded block leading-normal bg-gray-200 active-tab
                            `}>
                            Total general
                          </a>
                        </li>
                        <li className=" mr-1/10 last:mr-0  text-center">
                          <a
                            className={`text-l font-bold uppercase px-2 py-4 rounded block leading-normal bg-gray-200 tab
                            `}>
                            Iva Terceros
                          </a>
                        </li>
                      </ul>
                      <div className="py-8 pl-8 flex flex-col">
                        <div className="flex-item py-4">
                          <h5 className="text-xl">+ Total Venta Dia</h5>
                          <p>Cantidad: 20981</p>
                          <p>Neto: 281</p>
                          <p>Iva: 201</p>
                          <p>Otros Impuestos: 0</p>
                          <p>Total: 2181</p>
                        </div>
                        <div className="flex-item py-4">
                          <h5 className="text-xl">
                            + Total Arrastre Dias Anteriores
                          </h5>
                          <p>Cantidad: 20981</p>
                          <p>Neto: 281</p>
                          <p>Iva: 201</p>
                          <p>Otros Impuestos: 0</p>
                          <p>Total: 2181</p>
                        </div>
                        <div className="flex-item py-4">
                          <h5 className="text-xl">+ Total Acumulado Al Dia</h5>
                          <p>Cantidad: 20981</p>
                          <p>Neto: 281</p>
                          <p>Iva: 201</p>
                          <p>Otros Impuestos: 0</p>
                          <p>Total: 2181</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </article>
  );
};
