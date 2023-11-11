import MonitoringPanelDetails from "../../components/RightPanelDetails";
function MonitoringPanel() {
  const styles = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: 500,
  };
  return (
    <div style={{ height: "100%" }}>
      <div style={styles}>
        <h1>Monitoring</h1>
      </div>
      <MonitoringPanelDetails />
    </div>
  );
}
export default MonitoringPanel;
