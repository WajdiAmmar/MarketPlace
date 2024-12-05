import React from "react";
import Header from "../components/Header";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import '../Styles/dashboard.css'
function Dashboard() {
  return (
<div>
    <Header />
    <div style={{ height: "80vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <PowerBIEmbed
          embedConfig={{
            type: "report",
            id: "ac045878-9ce1-4e20-910c-4b2f2aa70a24",
            embedUrl: "https://app.powerbi.com/reportEmbed?reportId=ac045878-9ce1-4e20-910c-4b2f2aa70a24&groupId=7dbe80e4-d3bb-4103-8ad0-1750a7b515d2&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
                        accessToken: "H4sIAAAAAAAEACWTx7KrSAJE_-VumQi8m4i3wAhvhDc7PIjCqBAg6Oh_nzvd-7PJk5l__TyLCyxF_fPfH5Hokkfa5ugShfal0Mxc6JQGCu7C7_daQ2E91FQD74Gaxg8hbAXgWPNVTm23b0kngWmxuREPhMxQXsdhDPkDh8Dld7WOMU0-gmFxDUpJfR-jL5VRhAOT-UDDr8GHdHA7X2M2dZV_XkrWEcNhzMU82naaowJMej2DB9OZp_gorDAudXwWsto68KYM5bywXC7M2voIG6cxPvggB-T13AqC6eTkWs9kvJpIloFpufUUhzWySRqgNsSEquBnEkl_B8-LwjP0sPVzjOlLBal3DJQrE8EQF-3nSLfEwLXdaWuAXsdU3tR41t0gFgSFIYME-EJDU5PoHevjMPuA8Ga0qOX1kkJGFnqxGiYkJyjVYvRsE8VFqcOXDNIvJkkkxx-Dvdp8vUrJ0yIaWB2VgYTl0t7k0hPT8OQWhiMk9YTtEEeFNVAkTVRqi3oFgbjiaLXRzc-dE6e_2SlDspUh2aXefRWYYmLMN79FprtVXkF7wk-gs1dM5qQFF0ujFUUDRuNDdw6FOLGLRs-aYxGk9smDSRIcYwZ6FqFvMsu0_ZNCOFXZvvj2jLkE0XZoCPtlcVYYbhRFP_IjbdBzLRVmI3ewKz0RqqvqupiZnWPKIwM-nZYXO3MvRd9gQjUpGtFsPkLi3dCE6MNWB-ezRbSaHizNx640QeyPy5tZYRTaTUXOHVkzMVHIw7ztGin0O_RuOTZZusNlzryKVinuBGJZY5MJQce7Aq3zz5-f__xI8Fo_i9lcvzMXPvDU4tRvczWpHl2DmF1hseDZPpnlzqV7kp0aFTe4UmFpLzt2srLUs3iS3WHyAXopVZxdGsATOTmVSIS-v3mcCGD41WgrsfVAsQ_8yKOXRy-MvXB5676fTRb5wNzYe6LZ4vVtJfk2CxkccvPCLqWTumC_15Y1Sa3JaNL19ClbezLnL915q3n0CDyxSqpGYaDcV41RR13IPqV1ADcZX2lL84FBJcAgnSehnaqvc6FLR3oPKtCU5sJH4bh5p3Vpoi5vce75T8syAPX7-yMb2ICJLW8dYWmMYumjNr3uBtLwreCe81FNa5N5GJF3nMBFeKxVLbxyMmKCtwgeLwDHWEjoXvhX87X2DdTjX8sFeX1BMsc-zTn5OE7xyWO09w8VDN1cfHbY_GJvrSRmNBZxDm0rct6kRhQw8ilN07wf7L3yG2ArFhs9NEf3u31Z3cSkV6hcZ0spviLQ3yyYvfE19i8XdIb_pHpvb8CVlpGH3NHjqzqnHkMjLB9DpgBF_8RnyqsYfxpJ-03JvFOMR-e0zaRHdoVZuMQKOBzDBJoEEZyDHB_Tl251X1jdXZPZU-igwKMyQdYutCNfyqDXYodB0OegiIdxnQqnsmNxdxp4AttClDtte_COZoOAQnKoA3N3VjA-HJJ9iCfaxu2Np0naTCpTr00TSH3NejKWVy_CwmXlqyKiPcfRcj7Rqu5vIX2Yr9kaFIqMbH3spZyt7lUQQ2_DYdD4Svbm5f-X8ff_AKQMqL7aBQAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNzMzNDE4NDExLCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=",
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
