import React, {useState, useEffect, useRef, useCallback} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import headerFacturasMock from '../../mock/headerFacturas.json';
import Modal from 'react-modal';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import './SalesBook.scss';

export const SalesBook = ({customColumns, customDensity}: any) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [density, setDensity] = useState('regular');
  const [toggleModal, setToggleModal] = useState<any>(false);
  const {items, hasMore, loading} = useInfiniteScroll(pageNumber);
  const [header, setHeader] = useState<any>(
    headerFacturasMock.data.results.mainHeaders
  );

  const observer: any = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleOnDragEnd(result: any) {
    if (!result?.destination) return;
    const items = Array.from(header);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setHeader(items);
  }

  const handleChecked = (e: any, i: any) => {
    const newArr: any = Array.from(header);
    newArr[i].active = e.target.checked;

    setHeader(newArr);
  };

  return (
    <article className="terminal">
      <section className="animate__animated animate__fast animate__fadeIn">
        <section className="terminal--filter m-1">
          <div className="h-20 self-end">
            {customColumns && (
              <button
                className="btn btn-secondary"
                onClick={() => setToggleModal(!toggleModal)}>
                <span className="icofont-layout p-0"></span>
              </button>
            )}
            {customDensity && (
              <>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => setDensity('condensed')}>
                  Condensed
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => setDensity('regular')}>
                  Regular
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => setDensity('relaxed')}>
                  Relaxed
                </button>
                {/* <div className="has-tooltip">
                  <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8">
                    Some Nice Tooltip Text
                  </span>
                  Custom Position (above)
                </div> */}
              </>
            )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-start max-h-screen">
              <div className="flex justify-between  px-12   table-container table-container--tables">
                <table className="m-0">
                  <thead>
                    <tr>
                      {header &&
                        header.length > 0 &&
                        header.map((item: any, i: any) => {
                          if (item.active) {
                            return (
                              <th colSpan={item.colspan} key={i}>
                                {item.title}
                              </th>
                            );
                          }
                        })}
                    </tr>
                  </thead>
                  <tbody className="py-2 h-full">
                    {items.map((data: any, index: any) => (
                      <>
                        <tr className={density}>
                          {header &&
                            header.length > 0 &&
                            header.map((item: any, i: any) => {
                              if (item.active) {
                                if (items.length === index + 1) {
                                  return (
                                    <td ref={lastElementRef}>
                                      {data[item.col_id]}
                                    </td>
                                  );
                                } else {
                                  return <td>{data[item.col_id]}</td>;
                                }
                              }
                            })}
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
                {loading && (
                  <span className="container">
                    <span className="icofont-spinner-alt-2 icofont-3x rotation-animation"></span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      </section>
      <Modal
        className="popUp popUp-column"
        isOpen={toggleModal}
        onRequestClose={() => setToggleModal(!toggleModal)}
        style={{overlay: {background: 'rgba(0, 0, 0, 0.50)'}}}>
        <header className="popUp--header">
          <h3 className="popUp--header__title">Personalizar Columnas</h3>
          <button
            className="btn popUp--header__closeButton"
            onClick={() => {
              setToggleModal(!toggleModal);
            }}>
            <span className="icofont-close-circled"></span>
          </button>
        </header>
        <section className="popUp--body w-full">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="columns">
              {(provided) => (
                <ul
                  className="list-none draggable-list p-0"
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {header &&
                    header.length > 0 &&
                    header.map((item: any, i: any) => (
                      <Draggable
                        key={item.title}
                        draggableId={item.title}
                        isDragDisabled={!item.active}
                        index={i}>
                        {(provided) => (
                          <li
                            className={`my-2 shadow-md ${
                              !item.active && 'text-disabled shadow-none'
                            }`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <div className="pr-10">
                              <input
                                type="checkbox"
                                checked={item.active}
                                onChange={(e) => handleChecked(e, i)}
                              />
                              {item.title}
                            </div>

                            <span>
                              <img
                                src={`${
                                  !item.active
                                    ? './images/svg/navigation-menu.svg'
                                    : './images/svg/navigation-primary.svg'
                                }`}
                                alt="Drag"
                                width="20px"
                                height="20px"
                                color="blue"
                              />
                            </span>
                          </li>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <div className="flex justify-end mt-3">
            <button
              className="btn-secondary mx-2"
              onClick={() => {
                setToggleModal(!toggleModal);
              }}>
              Cerrar
            </button>
          </div>
        </section>
      </Modal>
    </article>
  );
};
