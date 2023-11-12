import styles from "./styles.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark, faXmark } from "@fortawesome/free-solid-svg-icons";
import RightPanelPrimaryDetails from "../RightPanelPrimaryDetails";
import data from "../../utils/data.json";
import { useNavigate } from "react-router-dom";
export default function MonitoringPanelDetails() {
  const [status, setStatus] = useState("pending");
  const [activePopup, setActivePopup] = useState(false);
  const triggerReasons = ["IP Change", "FIFO"];
  const actionReasons = ["Flagged", "Closed", "SOI Requested", "Cleared"];
  const reasons = status === "pending" ? triggerReasons : actionReasons;
  const nav = useNavigate();
  const riskLevels = ["Low", "Medium", "High"];
  const handleCloseAccount = () => {
    setActivePopup(!activePopup);
  };
  const handleClick = () => {
    nav("/monitoring");
    setActivePopup(!activePopup);
  };

  const [riskLevelVal, setRiskLevelVal] = useState("");
  const handleRiskLevelChange = (e) => {
    setRiskLevelVal(e.target.value);
  };
  const [reason, setReason] = useState("");
  const handleReason = (e) => {
    setReason(e.target.value);
  };
  const [searchText, setSearchText] = useState("");
  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };
  console.log(searchText);
  return (
    <div className={styles.monitoringPanelDetailsContainer}>
      {activePopup && <div className={styles.overlay} />}
      <div className={styles.statusBar}>
        <div className={styles.status}>
          <div
            className={styles.pending}
            onClick={() => setStatus("pending")}
            style={{ borderBottom: status === "pending" && "2.5px solid blue" }}
          >
            Pending
          </div>
          <div
            className={styles.completed}
            onClick={() => setStatus("completed")}
            style={{ borderBottom: status === "completed" && "2px solid blue" }}
          >
            Completed
          </div>
        </div>
        <div className={styles.closeAccount} onClick={handleCloseAccount}>
          <div>
            <FontAwesomeIcon icon={faCircleXmark} />
          </div>{" "}
          Close Account
        </div>
      </div>
      <div className={styles.searchAndFilter}>
        <div className={styles.inputDiv}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#bbbcbe" }}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchText}
          />
        </div>
        <div className={styles.filterDiv}>
          <select
            name="triggerReason"
            id="triggerReason"
            value={reason}
            onChange={handleReason}
          >
            <option style={{ color: "grey" }} value="">
              {status === "pending" ? "Trigger Reason" : "Action Reason"}
            </option>
            {reasons.map((reason, idx) => {
              return <option value={reason.toLowerCase()}>{reason}</option>;
            })}
          </select>
        </div>
        <div className={styles.filterDiv}>
          {" "}
          <select
            name="riskLevelOptions"
            id="riskLevelOptions"
            value={riskLevelVal}
            onChange={handleRiskLevelChange}
          >
            <option style={{ color: "grey" }} value="">
              Risk Level
            </option>
            {riskLevels.map((riskLevel, idx) => {
              return (
                <option value={riskLevel.toLowerCase()}>{riskLevel}</option>
              );
            })}
          </select>
        </div>
      </div>
      <div className={styles.primaryDetails}>
        <RightPanelPrimaryDetails
          items={data}
          status={status}
          filterByRisk={riskLevelVal}
          filterByReason={reason}
          searchBy={searchText}
        />
      </div>
      {activePopup && (
        <div className={styles.popup}>
          <div className={styles.popupHeading}>
            <div className={styles.popupHeadingText}>Close Account</div>
            <div className={styles.closeButton}>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={handleCloseAccount}
                style={{ color: "grey" }}
              />
            </div>
          </div>
          <div className={styles.email}>
            <label htmlFor="email">Email</label>
            <input type="email" />
          </div>
          <div className={styles.radioButtons}>
            <div className={styles.radioButtonsText}>Want to file UAR?</div>
            <div className={styles.radioButtonsBtn}>
              <input type="radio" name="radio" id="yes" checked />
              <label htmlFor="yes">Yes</label>

              <input type="radio" name="radio" id="no" />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div className={styles.selectBoxReason}>
            <label htmlFor="reason">Reason</label>
            <select name="reason" id="reason">
              <option selected="selected"></option>
              <option value="flagging">Flagging Logics Triggered</option>
              <option value="fifo">FIFO Logics Triggered</option>
              <option value="IP">IP Logics Triggered</option>
              <option value="Payment">Payment Logics Triggered</option>
              <option value="Un flag">Un flag Logics Triggered</option>
            </select>
          </div>
          <div className={styles.reasonTextBox}>
            <label htmlFor="reasonTextBox">Note</label>
            <textarea
              name="reasonTextBox"
              id="reasonTextBox"
              draggable={false}
            />
          </div>
          <div className={styles.submitRow}>
            <div className={styles.submitRowRadioBtn}>
              <input type="radio" name="chargeClosureFee" id="submitRadioBtn" />
              <label htmlFor="submitRadioBtn">Charge closure fee</label>
            </div>
            <div className={styles.submitButton}>
              <button onClick={handleClick}>Close Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
