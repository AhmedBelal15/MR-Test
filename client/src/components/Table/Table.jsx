import styles from "./table.module.css";
import TextField from "../TextField/TextField";

const Table = ({ tableData, handleInputChange }) => {
  return (
    <table className={styles["styled-table"]}>
      <thead>
        <tr>
          <th>Input (Numbers Only)</th>
          <th>Points</th>
          <th>Average</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => {
          return (
            <tr>
              <td>
                <TextField maxLength="6" onChange={e => {handleInputChange(e, index)}} value={row.input} />
              </td>
              <td>{row.data}</td>
              <td>{row.average}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
