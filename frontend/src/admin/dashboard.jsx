import React , {useEffect,useState} from "react";
import Header from "../components/Header";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import '../Styles/dashboard.css'


function Dashboard() {

  const [embedToken, setEmbedToken] = useState(null); // État pour stocker le token

  const fetchEmbedToken = async () => {
    try {
      const response = await fetch('https://marketplace-happyshop.up.railway.app/api/dashboard/generate-embed-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId: '7dbe80e4-d3bb-4103-8ad0-1750a7b515d2',
          reportId: 'ac045878-9ce1-4e20-910c-4b2f2aa70a24',
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Lire la réponse brute
        console.error('Erreur serveur :', errorText);
        throw new Error(errorText || 'Erreur inconnue');
      }
  
      const data = await response.json();
      setEmbedToken(data.token);
    } catch (error) {
      console.error('Erreur Frontend :', error.message);
    }
  };
  
  // Récupération du token au montage du composant
  useEffect(() => {
    fetchEmbedToken();
  }, []);
  
  return (
    <div>
      <Header />
      <div style={{ height: "80vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <PowerBIEmbed
            embedConfig={{
              type: "report",
              id: "ac045878-9ce1-4e20-910c-4b2f2aa70a24",
              embedUrl:"https://app.powerbi.com/reportEmbed?reportId=ac045878-9ce1-4e20-910c-4b2f2aa70a24&groupId=7dbe80e4-d3bb-4103-8ad0-1750a7b515d2&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
              accessToken: embedToken,
              tokenType: models.TokenType.Embed,
              settings: {
                panes: {
                  filters: {
                    expanded: false,
                    visible: false,
                  },
                },
                background: models.BackgroundType.Transparent,
              },
            }}
            cssClassName={"reportClass"}
            style={{
              width: "100%",
              height: "100%",
            }}
            eventHandlers={
              new Map([
                ["loaded", () => console.log("Report loaded")],
                ["rendered", () => console.log("Report rendered")],
                ["error", (event) => console.log(event.detail)],
              ])
            }
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
