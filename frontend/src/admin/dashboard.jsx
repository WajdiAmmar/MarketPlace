import React from "react";
import Header from "../components/Header";
import "../Styles/dashboard.css";

function Dashboard() {
  return (
    <div>
      <Header />
      <div style={{ height: "80vh", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <iframe
            title="marketplacewajdi"
            width="1140"
            height="541.25"
            src="https://app.powerbi.com/reportEmbed?reportId=ac045878-9ce1-4e20-910c-4b2f2aa70a24&autoAuth=true&ctid=dbd6664d-4eb9-46eb-99d8-5c43ba153c61&filterPaneEnabled=false&navContentPaneEnabled=false"
            frameborder="0"
            allowFullScreen="true"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
