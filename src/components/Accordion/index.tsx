import React, {useState} from 'react';

export const Accordion = ({data}: any) => {
  const [open, setOpen] = useState(true);

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
    <div className="flex-item flex-full border-box">
      <div>
        <table className="ml-2 mb-1">
          <tbody>
            <tr>
              <td className={`${data.important ? 'font-bold' : 'font-normal'}`}>
                <span
                  className={`collapse-z icofont-${open ? 'minus' : 'plus'}`}
                  onClick={() => {
                    setOpen(!open);
                  }}></span>
                {data.group}
              </td>
              <td></td>
            </tr>
            {open && (
              <>
                {data.detail.length > 0
                  ? data.detail.map((item: any) => (
                      <>
                        <tr>
                          <td
                            className={`${
                              item.important ? 'font-bold' : 'font-normal'
                            }`}>
                            {item.key}
                          </td>
                          <td>{item.value}</td>
                        </tr>
                      </>
                    ))
                  : notFound()}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
