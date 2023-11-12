import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import ListStrip from "../ListStrip";

export default function RightPanelPrimaryDetails(props) {
  const [sortedData, setSortedData] = useState([]);
  const [sortSettings, setSortSettings] = useState({ asc: null, desc: null });
  const data = props.items;
  const status = props.status;
  const filterByRisk = props.filterByRisk;
  const filterByReason = props.filterByReason;
  const searchBy = props.searchBy;

  useEffect(() => {
    let finalData =
      status === "pending"
        ? data.filter((item) => !item.completed)
        : data.filter((item) => item.completed);

    if (filterByRisk !== "") {
      finalData = finalData.filter(
        (item) => item.riskLevel.toLowerCase() === filterByRisk
      );
    }

    if (filterByReason !== "") {
      finalData = finalData.filter((item) => {
        if (item.triggerReason) {
          return item.triggerReason.toLowerCase() === filterByReason;
        }
        return item.actionReason.toLowerCase() === filterByReason;
      });
    }

    if (searchBy !== "") {
      finalData = finalData.filter((item) =>
        item.name.toLowerCase().includes(searchBy.toLowerCase())
      );
    }

    setSortedData([...finalData]);
  }, [data, status, filterByRisk, filterByReason, searchBy]);
  const sortData = (sortBy) => {
    const sorted = [...sortedData];
    const newSortSettings = { asc: null, desc: null };

    switch (sortBy) {
      case "Risk Level":
        const riskOrder = { High: 1, Medium: 2, Low: 3 };
        if (sortSettings.asc !== "Risk Level") {
          sorted.sort((a, b) =>
            riskOrder[a.riskLevel] > riskOrder[b.riskLevel] ? 1 : -1
          );
          newSortSettings.asc = "Risk Level";
        } else {
          sorted.sort((a, b) =>
            riskOrder[a.riskLevel] > riskOrder[b.riskLevel] ? -1 : 1
          );
          newSortSettings.desc = "Risk Level";
        }
        break;
      case "In queue for":
        if (sortSettings.asc !== "In queue for") {
          sorted.sort((a, b) => b.inQueueFor.localeCompare(a.inQueueFor));
          newSortSettings.asc = "In queue for";
        } else {
          sorted.sort((a, b) => a.inQueueFor.localeCompare(b.inQueueFor));
          newSortSettings.desc = "In queue for";
        }
        break;
      case "Date added on":
        if (sortSettings.asc !== "Date added on") {
          sorted.sort(
            (a, b) => new Date(b.dateAddedOn) - new Date(a.dateAddedOn)
          );
          newSortSettings.asc = "Date added on";
        } else {
          sorted.sort(
            (a, b) => new Date(a.dateAddedOn) - new Date(b.dateAddedOn)
          );
          newSortSettings.desc = "Date added on";
        }
        break;
      case "Time to Close":
        if (sortSettings.asc !== "Time to Close") {
          sorted.sort(
            (a, b) => parseInt(b.timeToClose) - parseInt(a.timeToClose)
          );
          newSortSettings.asc = "Time to Close";
        } else {
          sorted.sort(
            (a, b) => parseInt(a.timeToClose) - parseInt(b.timeToClose)
          );
          newSortSettings.desc = "Time to Close";
        }
        break;
      default:
        break;
    }

    setSortedData([...sorted]);
    setSortSettings(newSortSettings);
  };

  const headers = [
    "User",
    "Risk Level",
    status === "pending" ? "Trigger Reason" : "Action Reason",
    status === "pending" ? "In queue for" : "Time to Close",
    "Date added on",
    status === "pending" ? "Previously Reviewed" : "Action Taken By",
  ];

  return (
    <div className={styles.rightPanelPrimaryDetailsContainer}>
      <div className={styles.heading}>
        {headers.map((header, idx) => (
          <div style={{ display: "flex", gap: "0.3rem" }} key={idx}>
            {header}
            {[
              "Risk Level",
              "In queue for",
              "Date added on",
              "Time to Close",
            ].includes(header) && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FontAwesomeIcon
                  icon={faAngleUp}
                  size="xs"
                  onClick={() => sortData(header)}
                  style={{ color: sortSettings.asc === header && "grey" }}
                />
                <FontAwesomeIcon
                  icon={faAngleDown}
                  size="xs"
                  onClick={() => sortData(header)}
                  style={{ color: sortSettings.desc === header && "grey" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.content}>
        {sortedData.map((item, idx) => (
          <ListStrip items={item} key={idx} />
        ))}
      </div>
    </div>
  );
}
