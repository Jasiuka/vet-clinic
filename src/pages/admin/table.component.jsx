import PropTypes from "prop-types";
import {
  ChangeDateFormat,
  ExtractDate,
  RemoveSeconds,
} from "/src/utils/helper-fncs.js";
import { useEffect, useState } from "react";
import EditIcon from "/src/components/icon-components/edit-icon.component.jsx";
import DeleteIcon from "/src/components/icon-components/delete-icon.component.jsx";
export const Table = ({ data, tableName }) => {
  const [headings, setHeadings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const getHeadings = (data) => {
    const headingsArray = [...Object.keys(data[0])];
    return headingsArray;
  };

  const fixObject = (dataObject) => {
    let fixedObject = {};
    for (const [key, value] of Object.entries(dataObject)) {
      let temp = value;
      if (key.toLowerCase() === "data") {
        temp = ExtractDate(ChangeDateFormat(value));
      }
      if (key.toLowerCase() === "laikas") {
        temp = RemoveSeconds(value);
      }
      fixedObject[key] = temp;
    }
    return fixedObject;
  };

  //   Object.values(dataObject).some((value) =>
  //   value.toString().includes(searchQuery)

  const searchedValues = data?.filter((dataObject) =>
    Object.values(dataObject).toString().includes(searchQuery)
  );

  useEffect(() => {
    if (data) {
      setHeadings(getHeadings(data));
    }
  }, [data]);

  return (
    <>
      <div className="wrapper">
        <h2>{tableName}</h2>
        <label htmlFor="table-search">Paieška</label>
        <input
          placeholder="Ieškoti pagal reikšmę"
          id="table-search"
          className="table-search"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>
      <div className="table__add-new-form"></div>
      <table className="table">
        <thead className="table-head">
          <tr>
            {headings?.map((heading) => (
              <td key={heading}>{heading}</td>
            ))}
            <td>Veiksmai</td>
          </tr>
        </thead>
        <tbody className="table-body">
          {searchedValues?.map((dataObject, index) => {
            return (
              <tr className="table-data-row" key={index}>
                {Object.values(fixObject(dataObject)).map((value) => {
                  return <td key={value}>{value}</td>;
                })}
                <td>
                  <button title="ištrinti" className="table-button">
                    <DeleteIcon uniqueClassName={"table-delete"} />
                  </button>
                  <button title="koreguoti" className="table-button">
                    <EditIcon uniqueClassName={"table-edit"} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

Table.propTypes = {
  data: PropTypes.array,
};
export default Table;
